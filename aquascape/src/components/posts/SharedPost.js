/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Card,
  CardHeader,
  Editable,
  CardBody,
  CardFooter,
  Image,
  Text,
  Box,
  Flex,
  Avatar,
  Heading,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react";
import { BiLike, BiShare, BiChat } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import UserContext from "../../contexts/user/UserContext";
import axios from "axios";
import CommentsList from "../comments/commentsList";
import urls from "../../constants/urls";
import { Link } from "react-router-dom";
import services from "../../constants/services";
import Post from "./post";
import { socket } from "../../socket";

// Waves Component
const SharedPost = ({
  first_name,
  user_photo,
  content,
  contentPhoto,
  userId,
  waveId,
  sharedContent,
  sharedUser,
  originalPost,
  minified,
}) => {
  const { currentUser } = useContext(UserContext);
  const [likes, setLikes] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const fetchLikes = async (waveId) => {
    return await axios.get(`${urls.apiNgrok}/waves/likes`, {
      withCredentials: true,
      params: { wave_id: waveId },
    });
  };

  const fetchData = async () => {
    if (!waveId) return;
    const _likes = await fetchLikes(waveId);
    setLikes(_likes.data.count);
  };

  useEffect(() => {
    fetchData();
  }, [waveId]);

  useEffect(() => {
    socket.on("New Like Received", fetchData);
  }, []);

  const startEdit = () => {
    if (!currentUser) return;
    if (userId !== currentUser.id) return;
    return setEditMode(true);
  };

  const submitEdit = async (nextValue) => {
    await axios
      .post(`${urls.apiNgrok}/wave/edit`, false, {
        withCredentials: true,
        params: { wave_id: waveId, user_id: userId, content: nextValue },
      })
      .then(() => {
        setEditMode(false);
        setEditedContent(nextValue);
        fetchData();
      });
  };

  const onLike = async () => {
    await axios
      .post(`${urls.apiNgrok}/wave/like`, false, {
        withCredentials: true,
        params: { wave_id: waveId },
      })
      .then((response) => {
        setLikes(response.data.count);
      });
  };

  const deletePost = () => {
    axios
      .post(`${urls.apiNgrok}/wave/delete`, false, {
        withCredentials: true,
        params: { wave_id: waveId, user_id: userId },
      })
      .then(() => fetchData());
  };

  return (
    <Box w="full" p={3} borderWidth="1px" borderRadius="md">
      <Card maxW="600px" m="0 auto">
        <CardHeader>
          <Flex justify="space-between" alignItems="center">
            <Flex alignItems="center" spacing={4}>
              <Avatar
                name={first_name}
                src={user_photo}
              />
              <Box p={3}>
                <Heading size="sm">@{first_name}</Heading>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <Post
            userId={sharedUser.userId}
            first_name={sharedUser.first_name}
            user_photo={sharedUser.user_photo}
            content={originalPost.content}
            contentPhoto={originalPost.content_photo}
            waveId={originalPost.id}
            likes={originalPost.likes}
            minified={minified}
          ></Post>
        </CardBody>
        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button
            flex="1"
            variant="ghost"
            onClick={onLike}
            leftIcon={<BiLike />}
          >
            Like {originalPost.likes}
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
            Comment
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
            Share
          </Button>
          <CommentsList waveId={waveId}></CommentsList>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default SharedPost;
