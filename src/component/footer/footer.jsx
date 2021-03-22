import React from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import {Link} from 'react-router-dom';
import '../footer/footer.styles.scss';

const Footer = () => (
   <div className='footer'>
       <Link className='logo-container' to='/'>
               <Logo className='logo' />
       </Link>
       <span className='copyRight'>&copy; 2021</span>
   </div>
);

export default Footer;