import React, {useState, useEffect, useContext} from 'react';
import { Card, CardHeader, CardBody, CardFooter, Image, Text, Box, Flex, Avatar, Heading, IconButton, Button} from '@chakra-ui/react'
import {BiLike, BiShare, BiChat } from 'react-icons/bi'
import {BsThreeDotsVertical} from 'react-icons/bs'
import UserContext from '../../contexts/user/UserContext';
import axios from 'axios';
import CommentsList from '../comments/commentsList';
import urls from '../../constants/urls';
// Tweet Component
const Post = ({ photo, first_name, content, contentPhoto, userId, waveId}) => {

  const [profilePicture, setProfilePicture] = useState(null)
  const {getProfilePicture} = useContext(UserContext)
  const [likes, setLikes] = useState(0)
  const [displayedLikes, setDisplayedLikes] = useState(likes)

  useEffect(() => {
    const fetchProfilePicture = () => {
      getProfilePicture(userId).then((response) => {
        setProfilePicture(response)
      })
    }

    const fetchLikes = () => {
      axios.get(`${urls.apiNgrok}/waves/likes`, {params: {wave_id: waveId}}).then((response) => {
        setLikes(response.data.count)
      })
    }

    fetchProfilePicture()
    fetchLikes()
  }, [getProfilePicture, userId, waveId])


  const onLike = () => {
    axios.post(`${urls.apiNgrok}/wave/like`, false, {withCredentials: true, params: {wave_id: waveId}}).then((response) => {
      setLikes(response.data.count)
    })
  }

  useEffect(() => {
    setDisplayedLikes(likes)
  }, [likes])


    return (
      <Box w="full" p={3} borderWidth="1px" borderRadius="md">
      <Card maxW='600px' m='0 auto'> {/* Ensure card width matches NewPost */}
        <CardHeader>
          <Flex justify="space-between" alignItems="center">
            <Flex alignItems='center' spacing={4}>
              <Avatar name={first_name} src={profilePicture || photo} />
              <Box p={3}>
                <Heading size='sm'>@{first_name}</Heading>
              </Box>
            </Flex>
            <IconButton
              variant='ghost'
              colorScheme='gray'
              aria-label='See menu'
              icon={<BsThreeDotsVertical />}
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>
           {content}
          </Text>
        </CardBody>
        {contentPhoto && (
             <Image
             objectFit='cover'
             src={contentPhoto}
             alt='Chakra UI'
           />
        )}
        <CardFooter
          justify='space-between'
          flexWrap='wrap'
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >
          <Button flex='1' variant='ghost' onClick={onLike} leftIcon={<BiLike />}>
            Like {displayedLikes}
          </Button>
          <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
            Comment
          </Button>
          <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
            Share
          </Button>
          <CommentsList waveId={waveId}></CommentsList>
        </CardFooter>
      </Card>
      </Box>
    );
}

export default Post;
