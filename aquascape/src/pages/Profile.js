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
    SimpleGrid
  } from "@chakra-ui/react";
  import React from "react";

  const Post = ({ content }) => (
    <Box boxShadow="md" p="6" rounded="md" bg="white">
      <Text>{content}</Text>
    </Box>
  );

  const ProfilePage = () => {
    return (
      <Flex direction="column" maxW="1100px" m="0 auto" p="20px">
        {/* Cover Photo */}
        <Box width="100%" height="300px" borderRadius="lg" overflow="hidden" mb="4">
          <Image src="https://stockimages.org/wp-content/uploads/2020/10/bigstock-Photography-Concept-African-A-381364544.jpg" alt="Cover photo" width="100%" />
        </Box>

        <Flex direction={["column", "row"]}>
          {/* Profile Info */}
          <VStack spacing={4} alignItems="center" w={["100%", "30%"]}>
            {/* Profile Photo */}
            <Box position="relative" top="-70px" mb="-60px">
              <Image
                borderRadius="full"
                boxSize="150px"
                src="https://i1.wp.com/blogedify.com/wp-content/uploads/2015/01/royalty-free-images.jpg?resize=1024%2C768"
                alt="Profile picture"
                border="4px solid white"
              />
            </Box>

            <Text fontSize="2xl" fontWeight="bold">
              John Doe
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
                  <Text>Information about John will be displayed here.</Text>
                </TabPanel>
                <TabPanel>
                  <Text>John's friends will be listed here.</Text>
                </TabPanel>
              </TabPanels>
            </Tabs>

            {/* Posts/Feed */}
            <Box mt="4">
              <Text fontSize="xl" mb="4">Posts</Text>
              <VStack >
              <Box margin='2' spacing='20' mt='2' mb='2' pb='2'>
                  {/* Sample Posts */}
                <Post content="This is a sample post by John." />
                <Post content="Had a great day at the beach!" />
                <Post content="Exploring the mountains this weekend. Nature is so refreshing." />
              </Box>
              </VStack>
            </Box>
          </Box>
        </Flex>
      </Flex>
    );
  };

  export default ProfilePage;
