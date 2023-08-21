import React, { useState, useEffect } from "react";
import { Box, Heading, Spinner, VStack, SimpleGrid} from "@chakra-ui/react";
import Post from "../posts/post";
import axios from "axios";
import NewPost from "../posts/NewPost";

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
            width={{ base: "90%", md: "70%", lg: "60%" }}
            m="0 auto"
            mt={5}
            p="5"
            bg="white"
            boxShadow="xl"
            borderRadius="lg"
            overflowY="auto"  // Ensure that this is scrollable
            maxHeight="90vh"  // Set a max height to ensure it doesn't go beyond viewport
        >
            <Heading as="h1" size="xl" mb="5" color="gray.800">Latest posts</Heading>
            <VStack spacing={4} align="center" pt="5">
                <NewPost fetchWaves={fetchWaves} />

                {isLoading ? (
                    <Spinner size="xl" />
                ) : (
                    <SimpleGrid columns={{ base: 1 }} spacing={4}>
                        {Array.isArray(waves) && waves.map((wave, index) => (
                            <Post
                                key={index}
                                userId={wave.user_id}
                                first_name={wave.first_name}
                                content={wave.content}
                                contentPhoto={wave.content_photo}
                                waveId={wave.id}
                            />
                        ))}
                    </SimpleGrid>
                )}
            </VStack>
        </Box>
    );

}


export default Feed;