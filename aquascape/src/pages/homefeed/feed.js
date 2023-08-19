import React, { useState, useEffect } from "react";
import Post from "../../components/posts/post";
import axios from "axios";
import './feed.css'
import NewPost from "../../components/posts/NewPost";

const styles = {
    feedContainer: {
        maxWidth: '600px', // typical Twitter feed width
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f5f8fa', // light blue background typical of Twitter
        minHeight: '100vh',
    },
    header: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#14171a'
    },
    loader: {
        textAlign: 'center',
        marginTop: '20px'
    },
    wavesContainer: {
        maxHeight: 'calc(100vh - 200px)', // Adjust this value based on the height of NewPost and other components.
        overflowY: 'auto',
        paddingTop: '20px'
    }
};

const Feed = () => {
    const [waves, setWaves] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchWaves = () => {
        setIsLoading(true);
        axios.get(`http://localhost:8080/waves`, {headers: {'Content-Type': 'application/json'}})
        .then(response => {
            setWaves(response.data.waves);
            setIsLoading(false);
        })
        .catch(error => {
            console.log(error);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        fetchWaves();
    }, []);

    return (
        <div style={styles.feedContainer}>
            <div style={styles.header}>Twitter Feed</div>
            <NewPost fetchWaves={fetchWaves}></NewPost>
            <div style={styles.wavesContainer}>
                {isLoading ? (
                    <div style={styles.loader}>Loading tweets...</div>
                ) : (
                    waves.map((wave) => (
                        <div key={wave.id}>
                            <Post first_name={wave.first_name} content={wave.content} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Feed;

