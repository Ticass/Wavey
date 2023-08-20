import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Textarea,
  Button,
  Text,
  VStack,
  HStack,
  Avatar,
  useColorModeValue
} from "@chakra-ui/react";
import axios from 'axios';
import UserContext from '../../contexts/user/UserContext';

const NewPost = ({fetchWaves}) => {
  const { getCurrentUser } = useContext(UserContext);
  const [content, setContent] = useState('');
  const [contentPhoto, setContentPhoto] = useState('');
  const [profilePicture, setProfilePicture] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const maxCharacters = 280;

  useEffect(() => {
    const getUser = async () => {
        const user = await getCurrentUser();
        setProfilePicture(user.profile_picture)
        setCurrentUser(user)
      }
    getUser()
  },[getCurrentUser])

  const bg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("black", "white");

  const onPost = async (content, contentPhoto) => {
    console.log(getCurrentUser());
    const data = {
      id: currentUser.id,
      content: content,
      content_photo: contentPhoto,
    };

    axios.post(`http://localhost:8080/wave`, undefined, { withCredentials: true, params: data })
      .then(response => {
        console.log(response);
        fetchWaves()
      })
      .catch(error => {
        console.error("Error posting wave:", error);
      });
  }


  const handleSubmit = () => {
    if (content.trim() === '' || content.length > maxCharacters) return;

    onPost(content, contentPhoto);
    setContent(''); // Clear the textarea after posting
  };


  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      bg={bg}
      borderColor={borderColor}
      mt={5}
    >
      <HStack spacing={4}>
        <Avatar size="md" bg="gray.500" src={profilePicture} />
        <VStack align="start" spacing={3} w="full">
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            size="sm"
            resize="none"
            color={textColor}
          />
          <Textarea
            placeholder="Input image URL here"
            value={contentPhoto}
            onChange={(e) => setContentPhoto(e.target.value)}
            size="sm"
            resize="none"
            color={textColor}
          />
          <HStack justify="space-between" w="full">
            <Text fontSize="xs" color="gray.500">
              {maxCharacters - content.length}
            </Text>
            <Button colorScheme="blue" onClick={handleSubmit} size="sm">
              Wave
            </Button>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default NewPost;
