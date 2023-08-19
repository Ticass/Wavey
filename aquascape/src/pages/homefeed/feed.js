import React, { useState, useEffect, useContext } from "react";
import { Box, Heading, Spinner, VStack, SimpleGrid } from "@chakra-ui/react";
import Post from "../../components/posts/post";
import axios from "axios";
import NewPost from "../../components/posts/NewPost";
import UserContext from "../../contexts/user/UserContext";

const Feed = () => {
    const [waves, setWaves] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { getProfilePicture } = useContext(UserContext);
    const [profilePictures, setProfilePictures] = useState([
        {
            user_id: null,
            url: null,
        }
    ]);

    const fetchWaves = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/waves`, {
                headers: { 'Content-Type': 'application/json' }
            });
            setWaves(response.data.waves);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getPictureById = (id) => {
        return profilePictures.find(picture => picture.user_id === id);
    }

    useEffect(() => {
        fetchWaves();
    }, []);

    useEffect(() => {
        const setPictures = async () => {
            const newProfilePictures = await Promise.all(
                waves.map(async (wave) => {
                    const userId = wave.user_id;
                    const url = await getProfilePicture(userId);
                    return { user_id: userId, url: url };
                })
            );
            setProfilePictures(newProfilePictures);
        }
        setPictures();
    }, [getProfilePicture, waves]);

    return (
        <Box
            maxWidth="600px"
            m="0 auto"
            p="5"
            bg="gray.50"
            minHeight="100vh"
            overflowY="auto" // This will make the entire container scrollable
            height="100vh" // This ensures the container takes the full viewport height
        >
            <Heading as="h1" size="xl" mb="5" color="gray.800">Latest Posts</Heading>
            <NewPost fetchWaves={fetchWaves} />
            <VStack spacing={4} align="stretch" pt="5">
                {isLoading ? (
                    <Spinner size="xl" />
                ) : (
                    waves.map((wave) => (
                        <Post
                            key={wave.id}
                            first_name={wave.first_name}
                            profilePicture={getPictureById(wave.user_id)}
                            content={wave.content}
                            contentPhoto={wave.content_photo}
                        />
                    ))
                )}
            </VStack>
        </Box>
    );
}

export default Feed;
