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
  import React, {useEffect, useState, useContext} from "react";
  import {useParams, Link} from 'react-router-dom'
  import UserContext from '../contexts/user/UserContext';
import MiniFeed from "../components/homefeed/miniFeed";
import axios from "axios";
import urls from "../constants/urls";

  const ProfilePage = () => {
    const { id } = useParams();
    const {getUserById, getCurrentUser} = useContext(UserContext)
    const [user, setUser] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)
    const [friends, setFriends] = useState([])
    const [status, setStatus] = useState("Add Friend")

    const fetchFriends = (id) => {
      return axios.get(`${urls.apiNgrok}/user/${id}/friends`, {withCredentials: true})
    }

    const sendFriendRequest = (friend_id) => {
      return axios.post(`${urls.apiNgrok}/user/${friend_id}/request`, false, {withCredentials: true})
    }

    const findStatus = (friends, friend_id) => {
      if (!Array.isArray(friends)) return;
      const friend = friends?.find((friend) => friend.user_id == friend_id);
      if (!friend) return;
      setStatus(friend?.status)
  }

    useEffect(() => {
      getCurrentUser().then((response) => {
        setCurrentUser(response)
      })
      getUserById(id).then((response) => {
        setUser(response)
    })
      fetchFriends(id).then((response) => {
        setFriends(response.data.friends)
      })
    }, [getUserById, getCurrentUser, id])


    useEffect(() => {
      findStatus(friends, id)
    }, [friends, id])


    const userCheck = () => {
      if (!currentUser) return;
      if (parseInt(currentUser.id) === parseInt(id)) return false;
      return true
    }

    const unfriend = () => {
      axios.post(`${urls.apiNgrok}/user/${currentUser.id}/friend/${id}/remove`, false, {withCredentials: true})
      .then((response) => {
        console.log(response, 'Friend removed')
      })
    }

    const onFriendAdd = () => {
      userCheck()
      if (status === "Add Friend"){
        sendFriendRequest(id)
      }

      if (status === "Unfriend") {
        unfriend()
        setStatus("Add Friend")
      }
      fetchFriends(id).then((response) => setFriends(response))
      findStatus()
    }

    return (
      <Flex direction="column" overflowY='auto' maxW="1100px" m="0 auto" p="20px">
        {/* Cover Photo */}
        <Box width="100%" height="300px" borderRadius="lg" overflow="hidden" mb="4">
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
            {
              userCheck() && (
                <Button onClick={onFriendAdd} colorScheme="blue" mr="4">
                    {status}
                </Button>
              )
            }

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
                  <Text>Information about {user?.first_name} will be displayed here.</Text>
                </TabPanel>
                <TabPanel>
                {
                  Array.isArray(friends) &&
                  friends.map((friend, index) => (
                    <Link
                      value={friend.user_id}
                      key={friend.id} // Using friend.userId for uniqueness
                      mr="-4"
                      style={{
                        position: 'relative',
                        zIndex: friends.length - index,
                      }}
                      to={`/profile/${friend.friend_id}`}
                    >
                      <Avatar key={friend.id} value={friend.friend_id} src={friend.profile_picture} />
                      <Text size='xs'>{friend.name}</Text>
                    </Link>
                  ))
                }
                </TabPanel>
              </TabPanels>
            </Tabs>

            {/* Posts/Feed */}
            <Box mt="4">
              <Text fontSize="xl" mb="4">Posts</Text>
              <VStack >
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
