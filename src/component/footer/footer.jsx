import React from 'react';
import Logo from '../../assets/logoUser.png';
import {Link} from 'react-router-dom';
import '../footer/footer.styles.scss';

const Footer = () => (
   <div className='footer'>
       <Link className='logo-container' to='/'>
               <img src={Logo} className='logo' alt="" />
       </Link>
       <span className='copyRight'>&copy; 2021</span>
   </div>
);

export default Footer;