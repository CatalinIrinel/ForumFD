import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  IconButton,
  ListItem,
  Tooltip,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { sidebarData } from '../constants/menuData';
import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => {
  const { isOpen, setIsOpen } = useStateContext();

  return (
    <Box
      w={['full', null, '280px']}
      height={'100vh'}
      position={'fixed'}
      zIndex={'100'}
      top={0}
      left={isOpen ? 0 : '-400px'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      bgColor={'primary'}
      transition={'all .5s ease-in-out'}
    >
      <Box
        p={'2.5rem'}
        w={'full'}
        h={'full'}
        display={'flex'}
        justifyContent={'start'}
        alignItems={'start'}
        flexDir={'column'}
        gap={'2rem'}
      >
        <Box
          w={'full'}
          display={'flex'}
          justifyContent={'flex-end'}
          alignItems={'center'}
        >
          <Tooltip hasArrow label={'Inchide'} placement={'bottom'}>
            <IconButton
              isRound
              border={'1px solid #d1d1d1'}
              bg={'transparent'}
              color={'textLight'}
              _hover={'none'}
              _active={'none'}
              icon={<CloseIcon />}
              onClick={() => setIsOpen(false)}
            />
          </Tooltip>
        </Box>
        {sidebarData.map((item) => (
          <UnorderedList
            key={item.title}
            color={'textLight'}
            m={0}
            listStyleType={'none'}
          >
            <Heading
              as={'h2'}
              fontSize={'.625rem'}
              textTransform={'uppercase'}
              mb={'1rem'}
            >
              {item.title}
            </Heading>
            {item.menuItems.map((menuItem) => (
              <ListItem
                key={menuItem.text}
                textTransform={'uppercase'}
                fontWeight={'bold'}
                fontSize={'1rem'}
                mb={'.5rem'}
                letterSpacing={'1.5px'}
              >
                <Link to={`/${menuItem.link}`}>{menuItem.text}</Link>
              </ListItem>
            ))}
          </UnorderedList>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
