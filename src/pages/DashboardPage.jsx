import { Box, Heading } from '@chakra-ui/react';
import React from 'react';

const DashboardPage = () => {
  return (
    <Box
      w={'full'}
      maxWidth={'100rem'}
      minH={'200vh'}
      py={['2rem', null, '4rem']}
    >
      <Heading as={'h1'} color={'titleDark'}>
        DashboardPage
      </Heading>
      <Box>DashboardPage</Box>
    </Box>
  );
};

export default DashboardPage;
