import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';
import { MdOutlineAccountCircle } from 'react-icons/md';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Buttons } from '../components/Button';
import { Store } from '../contexts/Store';
import { getError } from '../Utils';

const Register = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [lastname, setLastname] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Parolele nu se potrivesc');
      return;
    }
    try {
      const { data } = await axios.post(
        'https://forumbola.babyfie.ro/api/forumUsers/signup',
        {
          lastname,
          surname,
          email,
          password,
        }
      );
      // const { data } = await axios.post(
      //   'https://api.peakngo.com/api/forumUsers/signup',
      //   {
      //   lastname,
      //   surname,
      //     email,
      //     password,
      //   }
      // );
      // const { data } = await axios.post('/api/forumUsers/signup', {
      //   lastname,
      //   surname,
      //   email,
      //   password,
      // });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const location = useLocation();
  const currentUrl = 'http://forumbola.babyfie.ro/' + location.pathname;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <Box
      w={'full'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDir={'column'}
    >
      <Helmet>
        <title>Inregistrare - Forumul Constantenilor</title>
        <link rel="canonical" href={`${currentUrl}`} />
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="csrf_token" content="" />
        <meta property="type" content="website" />
        <meta property="url" content={currentUrl} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="keywords"
          content={
            'forumul constantenilor, bogdan bola, constanta, sondaj, sondaje, sondaj constanta, sondaje constanta, forum'
          }
        />
        <meta name="theme-color" content="#ffffff" />
        <meta name="robots" content="noodp" />
        <meta
          property="title"
          content={'inregistrare forumul constantenilor'}
        />
        <meta property="quote" content={''} />
        <meta name="description" content={'Bogdan Bola'} />
        <meta property="og:locale" content="ro_RO" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={'inregistrare forumul constantenilor'}
        />
        <meta property="og:quote" content={''} />
        <meta property="og:hashtag" content={'#BogdanBola'} />
        <meta content="image/*" property="og:image:type" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="Forumul constantenilor" />
        <meta
          property="og:description"
          content={
            'Vrei să vezi ce se întâmplă în orașul Constanța? Vrei să dezbați anumite subiecte ce țin de Constața? Intră pe forumul constănțenilor și hai să discutăm!'
          }
        />
      </Helmet>

      <Flex
        minH={'calc(100vh - 60px)'}
        flexDirection="column"
        alignItems="center"
        justifyContent={'center'}
      >
        <Box
          mb="3rem"
          display="flex"
          justifyContent="center"
          w="100%"
          fontSize="2.5rem"
        >
          <Heading as="h1"> Crează contul tău pentru forum</Heading>
        </Box>
        <form onSubmit={submitHandler}>
          <FormControl isRequired mb="2rem">
            <FormLabel htmlFor="name">Nume:</FormLabel>
            <Input
              borderColor={'#000'}
              w="300px"
              type="text"
              onChange={(e) => setLastname(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb="2rem">
            <FormLabel htmlFor="name">Prenume:</FormLabel>
            <Input
              borderColor={'#000'}
              w="300px"
              type="text"
              onChange={(e) => setSurname(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb="2rem">
            <FormLabel htmlFor="email">Email:</FormLabel>
            <Input
              borderColor={'#000'}
              w="300px"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb="2rem">
            <FormLabel htmlFor="password">Parolă:</FormLabel>
            <Input
              borderColor={'#000'}
              w="300px"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb="2rem">
            <FormLabel htmlFor="password">Confirmă Parola:</FormLabel>
            <Input
              borderColor={'#000'}
              w="300px"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb="2rem">
            <CheckboxGroup colorScheme={'green'}>
              <Stack spacing={[1, 5]} direction={'column'}>
                <Checkbox value={'tnc'} borderColor={'#000'}>
                  Sunt de acord cu{' '}
                  <Link to="/tnc" className="policyLink">
                    Termenii și Condițiile
                  </Link>
                </Checkbox>
                <Checkbox value={'gdpr'} borderColor={'#000'}>
                  Sunt de acord cu{' '}
                  <Link to="/gdpr" className="policyLink">
                    Politica GDPR
                  </Link>
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          </FormControl>

          <Box display={'flex'} justifyContent={'center'} w={'full'}>
            <Buttons
              btnType={'submit'}
              bgColor={'primary'}
              color={'textLight'}
              bgHover={'subtitleLight'}
              icon={MdOutlineAccountCircle}
              size={'1.5rem'}
              text={'Crează Contul'}
            />
          </Box>

          <Box display={'flex'} justifyContent={'center'}>
            Ai deja cont pe forum?&nbsp;
            <Link className="links" to={`/logare?redirect=${redirect}`}>
              Loghează-te aici
            </Link>
          </Box>
        </form>
      </Flex>
    </Box>
  );
};

export default Register;
