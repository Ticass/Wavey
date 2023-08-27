/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import services from "../../constants/services";
import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text,
  Button,
  ButtonGroup,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { FiBell, FiUserPlus, FiX } from "react-icons/fi";
import axios from "axios";
import urls from "../../constants/urls";

const FriendRequestNotification = ({ currentUser }) => {
  const [requests, setRequests] = useState([]);

  const fetchFriendRequests = async (id) => {
    return await axios.get(`${urls.apiNgrok}/user/${id}/friend_requests`, {
      withCredentials: true,
    });
  };

  const fetchData = async () => {
    if (!currentUser) return;
    console.log("I am fetching the Data");
    const friendRequests = await fetchFriendRequests(currentUser.id);
    setRequests(friendRequests.data.requests);
  };

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  useEffect(() => {
    services.onWebSocketMessage("Friend Request Sent", () =>
      fetchData()
    );
  });

  const acceptRequest = async (id) => {
    if (!currentUser) return;
    await axios
      .post(`${urls.apiNgrok}/request/${id}/accept`, false, {
        withCredentials: true,
      })
      .then(() => fetchData());
  };

  const denyRequest = async (id) => {
    if (!currentUser) return;
    await axios
      .post(`${urls.apiNgrok}/request/${id}/deny`, false, {
        withCredentials: true,
      })
      .then(() => fetchData());
  };

  const color = useColorModeValue("gray.600", "gray.300");

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Notifications"
        icon={<FiBell />}
        variant="ghost"
      />
      <MenuList
        bg={useColorModeValue("white", "gray.900")}
        borderColor={useColorModeValue("gray.200", "gray.700")}
        p={2}
      >
        {requests && requests.length < 1 ? (
          <MenuItem px={4} py={3}>
            No new friend requests
          </MenuItem>
        ) : (
          Array.isArray(requests) &&
          requests.map((request) => (
            <MenuItem key={request.id} value={request.id} p={4}>
              <HStack width="full" justifyContent="space-between">
                <HStack>
                  <Avatar size={"sm"} src={request.profile_picture} />
                  <Box ml={3}>
                    <Text fontSize="md" fontWeight="medium">
                      {request.user_name}
                    </Text>
                    <Text fontSize="xs" color={color}>
                      Friend Request
                    </Text>
                  </Box>
                </HStack>
                <ButtonGroup size="sm" isAttached>
                  <Button
                    onClick={() => acceptRequest(request.id, request.friend_id)}
                    leftIcon={<FiUserPlus />}
                    colorScheme="blue"
                  >
                    Accept
                  </Button>
                  <Button
                    leftIcon={<FiX />}
                    onClick={() => denyRequest(request.id)}
                    value={request.id}
                    colorScheme="red"
                  >
                    Decline
                  </Button>
                </ButtonGroup>
              </HStack>
            </MenuItem>
          ))
        )}
      </MenuList>
    </Menu>
  );
};

export default FriendRequestNotification;
