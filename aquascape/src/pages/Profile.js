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
  } from "@chakra-ui/react";
  import React, {useEffect, useState, useContext} from "react";
  import {useParams} from 'react-router-dom'
  import UserContext from '../contexts/user/UserContext';
  import Post from "../components/posts/post";
import Feed from "../components/homefeed/feed";
import MiniFeed from "../components/homefeed/miniFeed";

  const ProfilePage = () => {
    const { id } = useParams();
    const {getUserById} = useContext(UserContext)
    const [user, setUser] = useState(null)
    const [userPosts, setUserPosts] = useState(null)

    useEffect(() => {
        const fetchUser = (id) => {
            getUserById(id).then((response) => {
                setUser(response)
            })
        }
        fetchUser(id)
    }, [id, getUserById])


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
            <Button colorScheme="blue" mr="4">
              Add Friend
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
                  <Text>{user?.first_name}'s friends will be listed here.</Text>
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
