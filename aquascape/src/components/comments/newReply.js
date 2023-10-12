import React, {  useContext } from "react";
import { Flex, Avatar, Input } from "@chakra-ui/react";
import UserContext from "../../contexts/user/UserContext";

const NewReply = ({ commentId, handleReply, reply, setReply}) => {
    const { currentUser } = useContext(UserContext);

    return (
        <Flex align="center" mt={2} p={2} border="1px solid #E9EBED" borderRadius="12px" bg="#F2F3F5" maxW='100%'>
            <Avatar size="md" name={currentUser?.first_name} src={currentUser?.profile_picture} mr={3} />
            <Input
                w="100%"
                bg="transparent"
                border="none"
                color="black"
                placeholder="Write a reply..."
                value={reply}
                onChange={e => setReply(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleReply(commentId)}
                _focus={{
                    boxShadow: 'none',
                    bg: 'white',
                }}
                _placeholder={{
                    color: 'gray.500',
                }}
                fontSize="sm"
                borderRadius="10px"
                pl={2}
            />
        </Flex>
    );
}

export default NewReply;
