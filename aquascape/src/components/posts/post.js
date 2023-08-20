import React, {useState, useEffect, useContext} from 'react';
import { Card, CardHeader, CardBody, CardFooter, Image, Text, Box, Flex, Avatar, Heading, IconButton, Button} from '@chakra-ui/react'
import {BiLike, BiShare, BiChat } from 'react-icons/bi'
import {BsThreeDotsVertical} from 'react-icons/bs'
import UserContext from '../../contexts/user/UserContext';
import axios from 'axios';
import CommentsList from '../comments/commentsList';
// Tweet Component
const Post = ({ first_name, content, contentPhoto, userId, waveId}) => {

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
      axios.get('http://localhost:8080/waves/likes', {params: {wave_id: waveId}}).then((response) => {
        setLikes(response.data.count)
      })
    }

    fetchProfilePicture()
    fetchLikes()
  }, [getProfilePicture, userId, waveId])


  const onLike = () => {
    axios.post('http://localhost:8080/wave/like', false, {withCredentials: true, params: {wave_id: waveId}}).then((response) => {
      setLikes(response.data.count)
    })
  }


    return (
        <Card maxW='md'>
        <CardHeader>
          <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Avatar name='Segun Adebayo' src={profilePicture} />
              <Box>
                <Heading size='sm'>{first_name}</Heading>
                {/* <Text>Creator, Chakra UI</Text> */}
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
            Like {likes}
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
    );
}

export default Post;
