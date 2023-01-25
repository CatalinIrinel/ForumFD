import { Box, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';
import { MdLogin } from 'react-icons/md';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../contexts/Store';
import { getError } from '../Utils';
import { Helmet } from 'react-helmet-async';
import { Buttons } from '../components/Button';

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'https://forumbola.babyfie.ro/api/forumusers/signin',
        {
          email,
          password,
        }
      );

      // const { data } = await axios.post(
      //   'https://api.peakngo.com/api/forumUsers/signup',
      //   {
      //     email,
      //     password,
      //   }
      // );

      // const { data } = await axios.post('/api/forumusers/signin', {
      //   email,
      //   password,
      // });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);
  return (
    <Box
      w={'full'}
      maxWidth={'100rem'}
      minH={'calc(100vh - 60px)'}
      py={['2rem', null, '4rem']}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDir={'column'}
      gap={'2rem'}
    >
      <Helmet>
        <title>Logare - Forumul Constantenilor</title>
      </Helmet>
      <Heading
        as={'h1'}
        fontSize={['1.5rem', null, '3rem']}
        color={'titleDark'}
      >
        Logare
      </Heading>
      <form onSubmit={submitHandler}>
        <FormControl isRequired mb="2rem" color={'#000'}>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Input
            borderColor={'primary'}
            w="300px"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired mb="2rem" color={'#000'}>
          <FormLabel htmlFor="password">Parola:</FormLabel>
          <Input
            borderColor={'primary'}
            w="300px"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl display="flex" justifyContent="center" w="100%">
          <Buttons
            btnType={'submit'}
            color={'textLight'}
            bgColor={'primary'}
            text={'logare'}
            bgHover={'subtitleLight'}
            icon={MdLogin}
            size={'1.5rem'}
          />
        </FormControl>
      </form>
    </Box>
  );
};

export default LoginPage;
