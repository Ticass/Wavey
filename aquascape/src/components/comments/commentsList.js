import React, { useState, useEffect, useContext } from "react";
import { VStack, Text } from "@chakra-ui/react";
import Comment from "./comment";
import axios from "axios";
import UserContext from "../../contexts/user/UserContext";
import NewComment from "./newComment";
import urls from "../../constants/urls";

const CommentsList = ({ waveId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([{
        first_name: null,
        profile_picture: null,
    }])
    const {getUserById} = useContext(UserContext)

    const addComment = (newComment) => {
        setComments(prevComments => Array.isArray(prevComments) ? [...prevComments, newComment] : [newComment]);
    };


    useEffect(() => {
        const fetchComments = (waveId) => {
            axios.get(`${urls.apiNgrok}/waves/comments`, { params: { wave_id: parseInt(waveId) } })
                .then((response) => {
                    setComments(response.data.comments);
                    console.log(response.data.comments)
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching comments:", err);
                    setError(err);
                    setLoading(false);
                });
        };
        fetchComments(waveId);
    }, [waveId]);

    useEffect(() => {
        const fetchCommentUsers = async () => {
            if (!Array.isArray(comments)) return;
            let fetchedUsers = [];
            for (const comment of comments) {
                const user = await getUserById(comment.user_id);
                console.log(user, "User")
                fetchedUsers.push({
                    id: comment.user_id,
                    first_name: user.first_name,
                    profile_picture: user.profile_picture
                });
            }
            setUsers(fetchedUsers);
        };

        fetchCommentUsers();

    }, [comments, getUserById]);

    const findUserInfoByComment = (comment) => {
        const user = users.find(u => u.id === comment.user_id);
        return user || { first_name: 'Unknown', profile_picture: null };
    }

    if (loading) {
        return <Text>Loading comments...</Text>;
    }

    if (error) {
        return <Text>Error loading comments. Please try again later.</Text>;
    }

    if (comments.length === 0) {
        return <Text>No comments available for this wave.</Text>;
    }

    const formatDate = (timestamp) => {
        const [date, time] = timestamp.split(' ');
        const [hour, minute] = time.split(':');
        const formattedDate = `${date} ${hour}:${minute}`;
        return formattedDate
    }


    return (
        <VStack align="start" spacing={4} mt={4}>
            <NewComment onCommentAdded={addComment} waveId={waveId}></NewComment>
            {Array.isArray(comments) && comments.map((comment, index) => (
                <Comment
                    key={comment.id}
                    first_name={findUserInfoByComment(comment).first_name}
                    profile_picture={findUserInfoByComment(comment).profile_picture}
                    content={comment.content}
                    timestamp={formatDate(comment.created_at)}
                    userId={findUserInfoByComment(comment).id}
                />
            ))}
        </VStack>
    );
};

export default CommentsList;
