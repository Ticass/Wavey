// NewComment.js
import React, { useState, useContext, useEffect } from "react";
import { Flex, Avatar, Input } from "@chakra-ui/react";
import UserContext from "../../contexts/user/UserContext";
import axios from "axios";
import urls from "../../constants/urls";

const NewComment = ({ waveId, onCommentAdded }) => {
    const [comment, setComment] = useState('');
    const { currentUser } = useContext(UserContext);  // Assuming UserContext provides the current user

    const onChange = (content) => {
        axios.post(`${urls.apiNgrok}/wave/comment`, false, {withCredentials: true, params: {wave_id: waveId, user_id: currentUser.user_id, content: content }}).then((response) => {
            if (response.data){
                onCommentAdded(waveId)
            }
        })
    }

    const handleSubmit = () => {
        if (comment.trim() === '') return;  // Don't submit empty comments

        onChange(comment)
        setComment('');  // Clear the comment input after submitting
    };

    console.log(currentUser, "CURRENT USER NEW COMMENT")

    return (
        currentUser &&
        <Flex
            align="center"
            mt={4}
            p={2}
            border="1px solid #E9EBED"
            borderRadius="12px"
            bg="#F2F3F5"
            w="70%"
            maxW='100%'
        >
            <Avatar size="md" name={currentUser.first_name} src={currentUser.profile_picture} mr={3} />
            <Input
                w="100%"   // Ensure input takes the full width available
                bg="transparent"
                border="none"
                color="black"   // Set the input text color to black
                placeholder="Write a comment..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSubmit()}
                _focus={{
                    boxShadow: 'none',
                    bg: 'white',   // Set the background to white when focused for contrast
                }}
                _placeholder={{
                    color: 'black.500',
                }}
                fontSize="sm"
                borderRadius="10px"   // Subtle rounded corners for the input
                pl={2}   // Padding to the left for better alignment
            />
        </Flex>
    );
    }

export default NewComment;
