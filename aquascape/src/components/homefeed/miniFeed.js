import React, { useState, useEffect } from "react";
import { Box, Spinner, SimpleGrid} from "@chakra-ui/react";
import Post from "../posts/post";
import axios from "axios";
import urls from "../../constants/urls";

const MiniFeed = ({userId}) => {
    const [waves, setWaves] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWaves = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${urls.apiNgrok}/waves`, {
                    params: {user_id: userId}
                });
                setWaves(response.data.waves);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchWaves();
    }, [userId]);


    return (
        <Box overflowY="auto"  maxHeight="70vh">
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
        </Box>
    );

}


export default MiniFeed;
