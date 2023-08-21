import React from "react";
import { Box, Flex, Avatar, Text, Link } from "@chakra-ui/react";
import UserProfilePopOver from '../userProfilePopup/userProfilePopOver';


const Comment = ({ userId, first_name, profile_picture, content, timestamp }) => {

  return (
    <Flex align="start" mt={3}>
      <Avatar size="md" name={first_name} src={profile_picture} mr={3} />
      <Box bg="gray.100" rounded="md" p={2}>
        <Flex justify="space-between" align="baseline">

          <UserProfilePopOver userId={userId} name={first_name} profile_picture={profile_picture}/>

          <Text ml={2} fontSize="xs" color="gray.500">
            {timestamp}
          </Text>
        </Flex>
        <Text mt={1}>{content}</Text>
      </Box>
    </Flex>
  );
};

export default Comment;

