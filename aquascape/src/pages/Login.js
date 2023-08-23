'use client'
import React, {useState} from 'react'
import urls from '../constants/urls'


import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';



const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = (e) => {
    e.preventDefault();

    fetch(`${urls.apiNgrok}/login?&email=${email}&password=${password}`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData, "Data")
        if (responseData.text.includes('User stored in session')) {
          navigate('/waves');
        } else {
          toast({
            title: 'Login Error',
            description: 'Wrong password or email.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        toast({
          title: 'Login Error',
          description: 'An error occurred. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const categoryHandlers = {
      email: setEmail,
      password: setPassword,
  }

  const onChange = ({target}) => {
      categoryHandlers[target.name](target.value)
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" color={'black'} name="email" onChange={onChange} value={email} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" color={'black'} value={password} onChange={onChange} name="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
                onClick={(e) => onSubmit(e)}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Login;
