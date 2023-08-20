import React from "react";
import { Box, Flex, Avatar, Text, Link } from "@chakra-ui/react";


const Comment = ({ first_name, profile_picture, content, timestamp }) => {
  return (
    <Flex align="start" mt={3}>
      <Avatar size="md" name={first_name} src={profile_picture} mr={3} />
      <Box bg="gray.100" rounded="md" p={2}>
        <Flex justify="space-between" align="baseline">
          <Link fontWeight="bold" href={`/waves`} color="blue.500">
            {first_name}
          </Link>
          {/* <Text fontSize="xs" color="gray.500">
            {timestamp}
          </Text> */}
        </Flex>
        <Text mt={1}>{content}</Text>
      </Box>
    </Flex>
  );
};

export default Comment;

