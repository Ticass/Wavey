import React, {useState, useEffect, useContext} from 'react';
import { Card, CardHeader, CardBody, CardFooter, Image, Text, Box, Flex, Avatar, Heading, IconButton, Button} from '@chakra-ui/react'
import {BiLike, BiShare, BiChat } from 'react-icons/bi'
import {BsThreeDotsVertical} from 'react-icons/bs'
import UserContext from '../../contexts/user/UserContext';
// Tweet Component
const Post = ({ first_name, content, contentPhoto, userId}) => {

  const [profilePicture, setProfilePicture] = useState(null)
  const {getProfilePicture} = useContext(UserContext)

  useEffect(() => {
    const fetchProfilePicture = () => {
      const deps = [];
      if (deps.includes(userId)) return;
      getProfilePicture(userId).then((response) => {
        deps.push(userId)
        setProfilePicture(response)
      })
    }
    fetchProfilePicture()
  }, [getProfilePicture, userId])

    return (
        <Card maxW='md'>
        <CardHeader>
          <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Avatar name='Segun Adebayo' src={profilePicture} />

              <Box>
                <Heading size='sm'>{first_name}</Heading>
                <Text>Creator, Chakra UI</Text>
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
          <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
            Like
          </Button>
          <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
            Comment
          </Button>
          <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
            Share
          </Button>
        </CardFooter>
      </Card>
    );
}

export default Post;
