import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../../contexts/user/UserContext';


const styles = {
    container: {
        display: 'flex',
        border: '1px solid #e1e8ed',
        borderRadius: '15px',
        padding: '10px 15px',
        margin: '20px 0',
        backgroundColor: '#fff',
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#D3D3D3',
        marginRight: '10px',
    },
    textarea: {
        width: '100%',
        border: 'none',
        outline: 'none',
        resize: 'none',
        fontFamily: '"Helvetica Neue", Arial, sans-serif',
        color: '#14171a'  // This will ensure the text is black
    },
    button: {
        marginTop: '10px',
        padding: '5px 15px',
        backgroundColor: '#1DA1F2',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '15px',
        cursor: 'pointer',
    },
    counter: {
        textAlign: 'right',
        fontSize: '12px',
        color: '#657786',
        marginTop: '5px',
    },
};

const NewPost = ({fetchWaves}) => {
    const { getCurrentUser } = useContext(UserContext);

    const [content, setContent] = useState('');
    const maxCharacters = 280;


    const onPost = async (content) => {
        console.log(getCurrentUser())
        const user = await getCurrentUser()
        const data = {
            id: user.id,
            content: content
        };

        axios.post(`http://localhost:8080/wave?id=${data.id}&content=${content}`, undefined, { withCredentials: true } )
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error("Error posting wave:", error);
            });
    }

    const handleSubmit = () => {
        if (content.trim() === '' || content.length > maxCharacters) return;

        onPost(content);
        setContent(''); // Clear the textarea after posting
    };


    return (
        <div style={styles.container}>
            <div style={styles.avatar}></div>
            <div style={{ width: '100%' }}>
                <textarea
                    style={styles.textarea}
                    rows="3"
                    placeholder="What's Poppin Jimbo ?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    color="black"
                />
                <div style={styles.counter}>
                    {maxCharacters - content.length}
                </div>
                <button style={styles.button} onClick={handleSubmit}>Wave</button>
            </div>
        </div>
    );
};

export default NewPost;
