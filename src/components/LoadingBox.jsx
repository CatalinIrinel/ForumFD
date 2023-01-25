import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';

const LoadingBox = () => {
  return (
    <Box>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="green.500"
        size="xl"
      />
      Loading...
    </Box>
  );
};

export default LoadingBox;
