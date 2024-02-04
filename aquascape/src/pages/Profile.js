/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Avatar,
} from "@chakra-ui/react";
import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import UserContext from "../contexts/user/UserContext";
import MiniFeed from "../components/homefeed/miniFeed";
import axios from "axios";
import urls from "../constants/urls";
import { socket } from "../socket";

const ProfilePage = () => {
  const { id } = useParams();
  const { getUserById, currentUser } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [status, setStatus] = useState("");

  const fetchFriends = async (id) => {
    return await axios.get(`${urls.apiNgrok}/user/${id}/friends`, {
      withCredentials: true,
    });
  };

  const fetchStatus = async (user_id, friend_id) => {
    return await axios.get(`${urls.apiNgrok}/friends/${user_id}/${friend_id}/status`, {withCredentials: true}, {
      withCredentials: true,
    });
  };

  const sendFriendRequest = async (friend_id) => {
    return await axios.post(`${urls.apiNgrok}/user/${friend_id}/request`, false, {
      withCredentials: true,
    });
  };

  const fetchData = async () => {
    if (!currentUser) return;
    const userData = await getUserById(id);
    const friendResponse = await fetchFriends(id);
    const fetchedFriends = friendResponse.data.friends;
    const friendStatus = await fetchStatus(currentUser?.id, id)
    const fetchedStatus = friendStatus.data.status;
    console.log(fetchedStatus)
    console.log(fetchedFriends, "Fetched Friends")
    console.log()

    setUser(userData);
    setFriends(fetchedFriends)
    setStatus(fetchedStatus)
  };

  useEffect(() => {
    fetchData(); // Initial fetch
  }, [id, getUserById]); // Only re-run if 'id' changes

  useEffect(() => {
    socket.connect();
    socket.on("Friend Request Sent", fetchData);
  });


  const userCheck = () => {
    if (!currentUser) return;
    if (parseInt(currentUser.id) === parseInt(id)) return false;
    return true;
  };

  const unfriend = () => {
    axios
      .post(
        `${urls.apiNgrok}/user/${currentUser.id}/friend/${id}/remove`,
        false,
        { withCredentials: true }
      )
      .then( () => fetchData());
  };

  const onFriendAdd = async () => {
    userCheck();
    if (status === "Add Friend") {
      await sendFriendRequest(id);
    }

    if (status === "Unfriend") {
      await unfriend();
    }
    fetchData()
  };



  return (
    <Flex direction="column" overflowY="auto" maxW="1100px" m="0 auto" p="20px">
      {/* Cover Photo */}
      <Box
        width="100%"
        height="300px"
        borderRadius="lg"
        overflow="hidden"
        mb="4"
      >
        <Image src={user?.profile_picture} alt="Cover photo" width="100%" />
      </Box>

      <Flex direction={["column", "row"]}>
        {/* Profile Info */}
        <VStack spacing={4} alignItems="center" w={["100%", "30%"]}>
          {/* Profile Photo */}
          <Box position="relative" top="-70px" mb="-60px">
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user?.profile_picture}
              alt="Profile picture"
              border="4px solid white"
            />
          </Box>

          <Text fontSize="2xl" fontWeight="bold">
            {user?.first_name} {user?.last_name}
          </Text>
          <Text color="gray.500">Lives in City, Country</Text>
          {userCheck() && (
            <Button onClick={onFriendAdd} colorScheme="blue" mr="4">
              {status}
            </Button>
          )}

          <Button colorScheme="blue" variant="outline">
            Message
          </Button>
        </VStack>

        {/* Main Content */}
        <Box flex="1" ml={[0, "6"]}>
          <Tabs variant="soft-rounded" colorScheme="blue" isFitted>
            <TabList mb="1em">
              <Tab>About</Tab>
              <Tab>Friends</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Text>
                  Information about {user?.first_name} will be displayed here.
                </Text>
              </TabPanel>
              <TabPanel>
                <Flex ml='5' mr='5'>
                {Array.isArray(friends) &&
                  friends.map((friend, index) => (
                    <Link
                      value={friend.user_id}
                      key={friend.id} // Using friend.userId for uniqueness
                      mr="-4"
                      style={{
                        position: "relative",
                        zIndex: friends.length - index,
                      }}
                      to={`/profile/${friend.friend_id}`}
                    >
                      <Avatar
                        key={friend.id}
                        value={friend.friend_id}
                        src={friend.profile_picture}
                      />
                      <Text size="xs">{friend.name}</Text>
                    </Link>
                  ))}
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>

          {/* Separation Line */}
          <Box mt="8" borderBottom="2px solid" borderColor="gray.200" />

          <Box mt="6">
            <Text fontSize="xl" fontWeight="bold" mb="4">
              Posts
            </Text>
            <VStack>
              <Box overflowY="auto">
                <MiniFeed userId={user?.id}></MiniFeed>
              </Box>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ProfilePage;
