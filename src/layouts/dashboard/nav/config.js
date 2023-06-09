import SvgColor from '../../../components/svg-color';
import {AiOutlineHome} from 'react-icons/ai'
 import {AiOutlineInbox} from 'react-icons/ai'
 import {AiOutlineBulb} from 'react-icons/ai'
 import {CgToolbox} from 'react-icons/cg'
 import {FiSettings} from 'react-icons/fi' 
 import {AiOutlineLock} from 'react-icons/ai'

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Welcome',
    path: '/dashboard/home',
    icon:<AiOutlineHome/>
    // icon: icon('ic_analytics'),
  },
  {
    title: 'Tous',
    path: '/dashboard/other-courses',
    icon:<AiOutlineInbox/>
    // icon: icon('ic_analytics'),
  },
 
  {
    title: `Terminales`,
     path: '/dashboard/popular-courses',
    // icon: icon('ic_msg'),
    //iconLabel: 'msg',
    icon:<CgToolbox/>
  },
  {
    title: `10 eme`,
     path: '/dashboard/popular-courses',
    // icon: icon('ic_msg'),
    //iconLabel: 'msg',
    icon:<CgToolbox/>
  },

  {
    title: `6 eme`,
     path: '/dashboard/popular-courses',
    // icon: icon('ic_msg'),
    //iconLabel: 'msg',
    icon:<CgToolbox/>
  },
  
  
];

export default navConfig;
