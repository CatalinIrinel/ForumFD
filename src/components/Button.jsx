import React from 'react';
import { Button, Icon, IconButton, Tooltip } from '@chakra-ui/react';

export const Buttons = (props) => {
  return (
    <Button
      type={props.btnType}
      w={props.w || '200px'}
      h={props.h || '40px'}
      bgColor={props.bgColor}
      borderRadius={'1rem'}
      border={props.border || 'none'}
      color={props.color}
      _hover={{ bgColor: `${props.bgHover}` } || 'none'}
      textTransform={'capitalize'}
      isDisabled={props.disabled}
      onClick={props.onClick}
    >
      {props.icon && (
        <Icon
          boxSize={props.size || '1rem'}
          as={props.icon}
          marginRight={'1rem'}
        />
      )}
      {props.text}
    </Button>
  );
};

export const NavButton = ({ title, onClick, icon, color, bgColor }) => (
  <Tooltip hasArrow label={title} placement={'bottom'}>
    <IconButton
      bg={'transparent'}
      onClick={onClick}
      color={color}
      _hover={{ background: bgColor, color: 'textDark' }}
      _active={'none'}
      fontSize={'1.5rem'}
      icon={icon}
      borderRadius={'50%'}
    />
  </Tooltip>
);
