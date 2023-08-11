import React, { useState, useEffect } from "react";
import Post from "../../components/posts/post";
import axios from "axios";

const Feed = () => {
    const [waves, setWaves] = useState([]); // Use useState instead of useEffect
    const [displayedWaves, setDisplayedWaves] = useState([])

    const fetchWaves = () => {
        axios.get(`http://localhost:8080/waves`, {headers: {'Content-Type': 'application/json'}})
        .then(response => {
            console.log(response);
            setWaves(response.data.waves); // Assume waves is located in response.data.waves
        })
        .catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        fetchWaves();
    }, [setWaves]);

    return (
        <div>
            {waves.map((wave) => (
                <div key={wave.id}>
                    <Post first_name={wave.first_name} content={wave.content} />
                </div>
            ))}
        </div>
    );
}

export default Feed;
