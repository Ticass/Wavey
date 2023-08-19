import React, { useState, useContext, useCallback, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../../contexts/user/UserContext';
import {
    Box,
    Textarea,
    Button,
    Flex,
    Avatar,
    Text,
    Input
} from '@chakra-ui/react';

const NewPost = () => {
    const { user, getCurrentUser } = useContext(UserContext);
    const [content, setContent] = useState('');
    const [contentPhoto, setContentPhoto] = useState('');
    const maxCharacters = 280;

    useEffect(() => {
        if (!user) {
            getCurrentUser();
        }
    }, [getCurrentUser, user]);

    const onPost = useCallback(async () => {
        const user = await getCurrentUser();
        const data = {
            id: user.id,
            content: content,
            content_photo: contentPhoto,
        };

        axios.post(`http://localhost:8080/wave`, undefined, { withCredentials: true, params: data })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error("Error posting wave:", error);
            });
    }, [content, contentPhoto, getCurrentUser]);

    const handleSubmit = useCallback(() => {
        if (content.trim() === '' || content.length > maxCharacters) return;

        onPost();
        setContent('');
    }, [content, onPost]);

    return (
        <Box
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            p={4}
            mb={5}
            bg="white"
        >
            <Flex mb={3}>
            <Avatar name={user?.name} size="md" mr={4} />
                <Box flex="1">
                    <Textarea
                        placeholder="What's on your mind?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        size="md"
                        color={'black'}
                        mb={2}
                    />
                    <Input
                        placeholder="Input image URL here"
                        value={contentPhoto}
                        onChange={(e) => setContentPhoto(e.target.value)}
                        size="md"
                        mb={2}
                    />
                    <Flex justify="space-between" align="center">
                        <Text fontSize="sm" color="gray.600">
                            {maxCharacters - content.length}
                        </Text>
                        <Button colorScheme="blue" onClick={handleSubmit}>
                            Wave
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};

export default React.memo(NewPost);
