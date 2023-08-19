import React from 'react';

// Styles for the Tweet component
const styles = {
    container: {
        border: '1px solid #e1e8ed',
        borderRadius: '15px',
        padding: '10px 15px',
        maxWidth: '500px',
        fontFamily: '"Helvetica Neue", Arial, sans-serif',
        backgroundColor: '#fff',
        margin: '20px'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginRight: '10px',
        backgroundColor: '#D3D3D3', // Just a placeholder, you can put an image instead
    },
    name: {
        fontWeight: 'bold',
        color: '#14171a'
    },
    content: {
        marginTop: '10px',
        color: '#14171a',
        lineHeight: '1.4'
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '15px',
        color: '#657786',
    },
    action: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    icon: {
        marginRight: '5px'
    }
};

// Tweet Component
const Post = ({ first_name, content }) => {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.avatar}></div>
                <div style={styles.name}>@{first_name}</div>
            </div>
            <div style={styles.content}>{content}</div>
            <div style={styles.actions}>
                <div style={styles.action}>
                    <span style={styles.icon}>💬</span>
                    <span>123</span>
                </div>
                <div style={styles.action}>
                    <span style={styles.icon}>🔁</span>
                    <span>456</span>
                </div>
                <div style={styles.action}>
                    <span style={styles.icon}>❤️</span>
                    <span>789</span>
                </div>
            </div>
        </div>
    );
}

export default Post;
