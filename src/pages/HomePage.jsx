import { Box } from '@chakra-ui/react';
import React from 'react';

const HomePage = () => {
  return (
    <Box
      w={'full'}
      maxWidth={'100rem'}
      minH={'200vh'}
      py={['2rem', null, '4rem']}
    >
      <Box minH={'100vh'} color={'textDark'}>
        Home Page
      </Box>
      <Box minH={'100vh'} color={'textDark'}>
        Home Page 2
      </Box>
    </Box>
  );
};

export default HomePage;
