'use client'
import React, {useState} from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import axios from 'axios'
const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    profile_picture: null,
  });

  console.log(formData)

  const onChange = ({target}) => {
    setFormData({ ...formData, [target.name]: target.value });
  };


  const onSubmit = (e) => {
    console.log("submitting")
    const { first_name, last_name, email, password, profile_picture } = formData;
    e.preventDefault();


    axios.post(`http://localhost:8080/register?first_name=${first_name}&last_name=${last_name}&email=${email}&password=${password}&profile_picture=${profile_picture}`,)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input onChange={onChange} color={'black'} type="text" value={formData.first_name} name="first_name" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" color={'black'} value={formData.last_name} name="last_name" onChange={onChange} />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" color={'black'} value={formData.email} name="email" onChange={onChange} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input name="password" color={'black'} value={formData.password} onChange={onChange} type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="photo">
                  <FormLabel>Profile Picture URL</FormLabel>
                  <Input color={'black'} type="text" value={formData.profile_picture} name="profile_picture" onChange={onChange} />
                </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
              onClick={(e) => onSubmit(e)}
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} href="/login">Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default RegisterPage;
