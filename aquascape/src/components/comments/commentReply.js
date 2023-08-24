import React from "react";
import { Box, Flex, Avatar, Text } from "@chakra-ui/react";
import UserProfilePopOver from '../userProfilePopup/userProfilePopOver';

const styleMentions = (text) => {
    return text.split(' ').map((word, index) => {
        if (word.startsWith('@')) {
            return <Text as="span" color="lightblue" key={index}>{word} </Text>;
        }
        return word + ' ';
    });
};

const CommentReply = ({ userId, first_name, profile_picture, content, timestamp }) => {
    return (
        <Flex align="start" mt={2} ml={8}>
            <Avatar size="sm" name={first_name} src={profile_picture} mr={2} />
            <Box bg="gray.100" rounded="md" p={1.5}>
                <Flex justify="space-between" align="baseline">
                    <UserProfilePopOver userId={userId} name={first_name} profile_picture={profile_picture} fontSize="sm"/>
                    <Text ml={1} fontSize="xs" color="gray.500">
                        {timestamp}
                    </Text>
                </Flex>
                <Text mt={1} fontSize="sm">{styleMentions(content)}</Text>
            </Box>
        </Flex>
    );
};

export default CommentReply;
