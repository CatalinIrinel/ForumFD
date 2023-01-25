import { ChevronDownIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Heading,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Tooltip,
} from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import { Buttons, NavButton } from './Button';
import { BsBell } from 'react-icons/bs';
import { Store } from '../contexts/Store';

const Navbar = () => {
  const { handleClick, setScreenSize, setIsOpen } = useStateContext();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
  };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return window.removeEventListener('resize', handleResize);
  }, [setScreenSize]);
  return (
    <Box
      w={'full'}
      height={'60px'}
      zIndex={'100'}
      position={'fixed'}
      top={0}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      bgColor={'primary'}
      borderBottom={'1px solid #fff'}
    >
      <Box
        maxW={'100rem'}
        w={'full'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap={'3rem'}
      >
        <Tooltip hasArrow label={'Meniu'} placement={'bottom'}>
          <IconButton
            bgColor={'textLight'}
            isRound
            fontSize={'1.5rem'}
            color={'textDark'}
            _hover={'none'}
            _active={'none'}
            icon={<HamburgerIcon />}
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </Tooltip>
        <Link to="/">
          <Heading as={'h1'} color={'titleLight'} fontSize={'1.5rem'}>
            Forumul Constănțenilor
          </Heading>
        </Link>
        <FormControl
          w={'750px'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={'1rem'}
        >
          <Input
            borderRadius={'2rem'}
            type="search"
            placeholder="Cauta postare..."
            _placeholder={{ color: '#d1d1d1c8' }}
          />{' '}
          <Tooltip hasArrow label={'Caută'} placement={'bottom'}>
            <IconButton
              isRound
              color={'textLight'}
              bg={'transparent'}
              _hover={{ background: '#f1f1f1', color: 'textDark' }}
              _active={'none'}
              icon={<SearchIcon />}
            />
          </Tooltip>
        </FormControl>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={'1rem'}
        >
          {userInfo ? (
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              gap={'1rem'}
            >
              <NavButton
                title={'Notification'}
                color={'textLight'}
                bgColor={'#f1f1f1'}
                icon={<BsBell />}
                onClick={() => handleClick('notification')}
              />
              <Tooltip hasArrow label={'Profile'} placement={'bottom'}>
                <Avatar
                  onClick={() => handleClick('userProfile')}
                  size={'sm'}
                  name={'user_name'}
                  src={'/images/userprofile.jpg'}
                />
              </Tooltip>
              <Menu>
                <Tooltip hasArrow label={'User Menu'} placement={'bottom'}>
                  <MenuButton
                    as={Button}
                    bg={'transparent'}
                    borderTop={'1px solid #f1f1f1'}
                    borderBottom={'1px solid #f1f1f1'}
                    color={'textLight'}
                    rightIcon={<ChevronDownIcon />}
                    _hover={'none'}
                    _active={'none'}
                  >
                    Buna, {userInfo.surname}
                  </MenuButton>
                </Tooltip>
                <MenuList bgColor={'subtitleLight'}>
                  <MenuItem
                    color={'textLight'}
                    bg={'subtitleLight'}
                    _hover={{ bgColor: 'subtitleDark', color: 'textDark' }}
                  >
                    test1
                  </MenuItem>
                  <MenuItem
                    color={'textLight'}
                    bg={'subtitleLight'}
                    _hover={{ bgColor: 'subtitleDark', color: 'textDark' }}
                  >
                    test2
                  </MenuItem>
                  <MenuItem
                    color={'textLight'}
                    bg={'subtitleLight'}
                    _hover={{ bgColor: 'subtitleDark', color: 'textDark' }}
                  >
                    test3
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem
                    color={'textLight'}
                    bg={'subtitleLight'}
                    _hover={{ bgColor: 'subtitleDark', color: 'textDark' }}
                    onClick={signoutHandler}
                  >
                    Delogare
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          ) : (
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              gap={'1rem'}
            >
              <Link to={'/inregistrare'}>
                <Buttons
                  w={'fit-content'}
                  type={'button'}
                  bgColor={'transparent'}
                  color={'#f1f1f1'}
                  text={'Inregistrare'}
                  border={'1px solid #f1f1f1'}
                />
              </Link>
              <Link to={'/logare'}>
                <Buttons
                  w={'fit-content'}
                  type={'button'}
                  bgColor={'transparent'}
                  color={'#f1f1f1'}
                  text={'Logare'}
                  border={'1px solid #f1f1f1'}
                />
              </Link>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
