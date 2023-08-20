import React, { useState, useEffect } from "react";
import { Box, Heading, Spinner, VStack} from "@chakra-ui/react";
import Post from "../../components/posts/post";
import axios from "axios";
import NewPost from "../../components/posts/NewPost";

const Feed = () => {
    const [waves, setWaves] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


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


    useEffect(() => {
        fetchWaves();
    }, []);



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
            <Heading as="h1" size="xl" mb="5" color="gray.800">Latest posts</Heading>
            <NewPost fetchWaves={fetchWaves} />
            <VStack spacing={4} align="stretch" pt="5">
                {isLoading ? (
                    <Spinner size="xl" />
                ) : (
                    waves.map((wave, index) => (
                        <Post
                            key={index}
                            userId={wave.user_id}
                            first_name={wave.first_name}
                            content={wave.content}
                            contentPhoto={wave.content_photo}
                            waveId={wave.id}
                        />
                    ))
                )}
            </VStack>
        </Box>
    );
}

export default Feed;
