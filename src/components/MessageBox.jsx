import React from 'react';
import { Alert, AlertIcon, Box } from '@chakra-ui/react';
const MessageBox = (props) => {
  return (
    <Box w="full" h={'50px'}>
      <Alert status={props.status || 'info'}>
        <AlertIcon />
        {props.children}
      </Alert>
    </Box>
  );
};

export default MessageBox;
