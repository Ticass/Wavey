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
    const {getUserById, getCurrentUser, getProfilePicture} = useContext(UserContext)
    const [user, setUser] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)
    const [friends, setFriends] = useState(null)
    const [status, setStatus] = useState('')
    const [friendPictures, setFriendPictures] = useState([])

    const fetchFriendStatus = (friend_id, user_id) => {
      axios.get(`${urls.apiNgrok}/friends/${user_id}/${friend_id}/status`, {withCredentials: true})
      .then((response) => {
        setStatus(response.data.status)
      })
    }
    const fetchUser = (id) => {
      getUserById(id).then((response) => {
          setUser(response)
      })

  }

    useEffect(() => {
      getCurrentUser().then((response) => {
        setCurrentUser(response)
      })
    }, [getCurrentUser])

    useEffect(() => {
      fetchUser(id)
      if (!currentUser) return;
      const fetchFriends = (id) => {
        axios.get(`${urls.apiNgrok}/user/${id}/friends`, {withCredentials: true}).then((response) => {
          setFriends(response.data.friends)
        })
      }
      fetchFriendStatus(id, currentUser.id)
      fetchFriends(id)

    }, [currentUser, id])



    useEffect(() => {
      const fetchFriendPictures = () => {
        Array.isArray(friends) && friends.map((friend) => {
            getProfilePicture(friend.friend_id).then((response) => {
                setFriendPictures(curr => [...curr, {url: response, userId: friend.friend_id}]);
            });
        });
    }

      fetchFriendPictures()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [friends, getProfilePicture])

    const onFriendAdd = () => {
      if (!currentUser) return;
      axios.post(`${urls.apiNgrok}/user/${currentUser?.id}/friend/${id}/add`, false, {withCredentials: true}).then((response) => {
        console.log(response)
      })

      fetchFriendStatus(id, currentUser.id)
    }

    console.log(friendPictures)

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
            <Button onClick={onFriendAdd} colorScheme="blue" mr="4">
              {status}
            </Button>
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
                  Array.isArray(friendPictures) &&
                  friendPictures.map((friend, index) => {
                    return (<Link  mr="-4"  // Adjust this for the desired overlap amount. '-4' is equivalent to '-16px'
                    style={{
                      position: 'relative',       // Required for z-index to work
                      zIndex: friendPictures.length - index,  // Higher z-index for earlier avatars
                    }} key={friend.id} to={`/profile/${friend.userId}`}>
                    <Avatar
                      src={friend.url}
                    />
                  </Link>)
                  })
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
