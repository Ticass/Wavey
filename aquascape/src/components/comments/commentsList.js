import React, { useState, useEffect } from "react";
import { VStack, Text, Box } from "@chakra-ui/react";
import Comment from "./comment";
import axios from "axios";
import NewComment from "./newComment";
import urls from "../../constants/urls";
import CommentReply from "./commentReply";
import NewReply from "./newReply";
import { socket } from "../../socket";
const CommentsList = ({ waveId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reply, setReply] = useState('');

    const fetchComments = () => {
        return axios.get(`${urls.apiNgrok}/waves/comments`, { params: { wave_id: parseInt(waveId) } })
            .then((response) => {
                setComments(response.data.comments);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching comments:", err);
                setError(err);
                setLoading(false);
            });
    };

    //Todo: Fix this to use the new react way
    useEffect(() => {
        fetchComments();
        socket.on("New Reply Received", fetchComments)
    }, []);

    if (loading) {
        return <Text>Loading comments...</Text>;
    }

    if (error) {
        return <Text>Error loading comments. Please try again later.</Text>;
    }

    if (comments.length === 0) {
        return <Text>No comments available for this wave.</Text>;
    }

    const filteredReplies = () => {
        if (!comments.length) return;

        return comments?.filter(comment => comment.parent_id)
    }

    const handleSubmit = (commentId) => {
        if (reply.trim() === '') return;

        axios.post(`${urls.apiNgrok}/comment/${commentId}/reply`, false, { withCredentials: true, params: { parent_id: commentId, content: reply, wave_id: waveId} })
            .then((response) => {
                if (response.data) {
                    fetchComments()
                }
            });

        setReply('');
    };


    return (
        <VStack align="start" w="100%" spacing={4} mt={4}>
            <NewComment onCommentAdded={fetchComments} waveId={waveId}></NewComment>
            {Array.isArray(comments) && comments.map((comment) => {
                if (!comment.parent_id) {
                    return (
                        <Box
                            key={comment.id}
                            p={3}
                            border="1px solid #E9EBED"
                            borderRadius="8px"
                            bg="white"
                            boxShadow="sm"
                            w="100%"
                        >
                            <Comment
                                first_name={comment.first_name}
                                profile_picture={comment.profile_picture}
                                content={comment.content}
                                userId={comment.user_id}
                            />
                            {Array.isArray(filteredReplies()) && filteredReplies().filter(reply => reply.parent_id === comment.id).map(reply => (
                                <CommentReply
                                    commentId={reply.id}
                                    key={reply.id}
                                    first_name={reply.first_name}
                                    profile_picture={reply.profile_picture}
                                    content={reply.content}
                                    userId={reply.user_id}
                                />
                            ))}
                            <NewReply commentId={comment.id} waveId={comment.wave_id} fetchComments={fetchComments} setReply={setReply} handleReply={handleSubmit} reply={reply} />
                        </Box>
                    );
                }
                return null;  // Return null for comments with a parent_id
            })}
        </VStack>
    );
                    }
export default CommentsList;
