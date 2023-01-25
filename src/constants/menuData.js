import { MdOutlinePoll } from 'react-icons/md';
import { BsHouseDoor } from 'react-icons/bs';
export const sidebarData = [
  {
    title: 'feeds',

    menuItems: [
      {
        text: 'acasă',
        link: '',
        icon: <BsHouseDoor />,
      },
      {
        text: 'populare',
        link: 'populare',
        icon: <BsHouseDoor />,
      },
    ],
  },
  {
    title: 'Altele',
    menuItems: [
      {
        text: 'sondaje',
        link: 'sondaj',
        icon: <MdOutlinePoll />,
      },
    ],
  },
];
