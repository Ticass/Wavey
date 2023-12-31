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
import urls from '../../constants/urls';

const NewPost = ({fetchWaves}) => {
  const { currentUser } = useContext(UserContext);
  const [content, setContent] = useState('');
  const [contentPhoto, setContentPhoto] = useState('');
  const maxCharacters = 280;



  const bg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("black", "white");

  const onPost = async (content, contentPhoto) => {
    const data = {
      id: currentUser.id,
      content: content,
      content_photo: contentPhoto,
    };

    axios.post(`${urls.apiNgrok}/wave`, undefined, { withCredentials: true, params: data })
      .then(() => {
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

  const isContentValid = content.trim() !== '' && content.length <= maxCharacters;

  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="md"
      p={4}
      borderRadius="md"
      maxW="600px"
      width="100%"
      m="0 auto"
      mt={5}
    >
      <Box
        p={3}
        borderWidth="1px"
        borderRadius="md"
        bg={bg}
        borderColor={borderColor}
      >
        <HStack spacing={4}>
          <Avatar size="md" bg="gray.500" src={currentUser?.profile_picture} />
          <VStack align="start" spacing={3} w="full" flexGrow={1}>
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              size="sm"
              resize="none"
              color={textColor}
              flexGrow={1}
              h="100px"
            />
            <Textarea
              placeholder="Input image URL here"
              value={contentPhoto}
              onChange={(e) => setContentPhoto(e.target.value)}
              size="sm"
              resize="none"
              color={textColor}
              flexGrow={1}
              h="100px"
            />
            {contentPhoto && (
              <Box mt={2}>
                <img src={contentPhoto} alt="Preview" style={{ maxWidth: '100%', borderRadius: '10px' }} />
              </Box>
            )}
            <HStack justify="space-between" w="full">
              <Text fontSize="xs" color={content.length > maxCharacters - 20 ? "red.500" : "gray.500"}>
                {maxCharacters - content.length}
              </Text>
              <Button colorScheme="blue" onClick={handleSubmit} size="sm" isDisabled={!isContentValid}>
                Wave
              </Button>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
};


export default NewPost;
