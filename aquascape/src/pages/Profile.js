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
    const [friends, setFriends] = useState([])
    const [status, setStatus] = useState('')
    const [friendPictures, setFriendPictures] = useState([])

    const fetchFriends = (id) => {
      axios.get(`${urls.apiNgrok}/user/${id}/friends`, {withCredentials: true}).then((response) => {
        setFriends(response.data.friends)
      })
    }

    const sendFriendRequest = (friend_id) => {
      axios.post(`${urls.apiNgrok}/user/${friend_id}/request`, false, {withCredentials: true}).then((response) => {
        console.log(response)
      })
    }

    const fetchFriendPictures = async () => {
      try {
        // Check if friends is an array and has items before processing
        if (Array.isArray(friends) && friends.length > 0) {
          const newPictures = await Promise.all(
            friends.map(async friend => {
              // Safely fetch each friend's profile picture
              try {
                const response = await getProfilePicture(friend.friend_id);
                return { url: response, userId: friend.friend_id };
              } catch (error) {
                console.error(`Error fetching profile picture for user ${friend.friend_id}:`, error);
                // Return null or a default picture if there's an error fetching a particular profile picture
                return null;
              }
            })
          );

          // Filter out any null or invalid entries before setting to state
          const validPictures = newPictures.filter(pic => pic !== null);
          setFriendPictures(validPictures);
        }
      } catch (error) {
        console.error('Error fetching friend pictures:', error);
      }
    };

    useEffect(() => {
      getCurrentUser().then((response) => {
        setCurrentUser(response)
      })
      fetchFriends(id)
    }, [getCurrentUser, id])

    useEffect(() => {
      const fetchUser = (id) => {
        getUserById(id).then((response) => {
            setUser(response)
        })
      }
      fetchUser(id)
      if (!currentUser) return;
      const fetchFriendStatus = (friend_id, user_id) => {
        axios.get(`${urls.apiNgrok}/friends/${user_id}/${friend_id}/status`, {withCredentials: true})
        .then((response) => {
          setStatus(response.data.status)
        })
      }
      fetchFriendStatus(id, currentUser.id)

    }, [currentUser, id, getUserById, friends])

    const userCheck = () => {
      if (!currentUser) return;
      if (parseInt(currentUser.id) === parseInt(id)) return false;
      return true
    }

    const unfriend = () => {
      axios.post(`${urls.apiNgrok}/user/${currentUser.id}/friend/${id}/remove`, false, {withCredentials: true})
      .then((response) => {
        console.log(response, 'Friend add')
      })
    }

    const onFriendAdd = () => {
      userCheck()
      if (status === "Add Friend"){
        sendFriendRequest(id)
      } else {
        unfriend()
      }
        fetchFriends(id)
        fetchFriendPictures();
    }

    useEffect(() => {
      if (!friends) return;

      fetchFriendPictures()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [friends])




    console.log(friendPictures, "Friend Pictures")

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
                  Array.isArray(friendPictures) &&
                  friendPictures.map((friend, index) => (
                    <Link
                      value={friend.userId}
                      key={friend.userId} // Using friend.userId for uniqueness
                      mr="-4"
                      style={{
                        position: 'relative',
                        zIndex: friendPictures.length - index,
                      }}
                      to={`/profile/${friend.userId}`}
                    >
                      <Avatar value={friend.userId} src={friend.url} />
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
