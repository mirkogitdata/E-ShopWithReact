import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
//import {HeaderContainer, LogoContainer, OptionContainer, OptionLink, OptionDiv } from '../header/header.styles';

//Create this sleector to replace state with createStructuredSelector   
import { createStructuredSelector } from  'reselect';

import { auth } from '../../firebase/firebase.util';
import CartIcon from '../cart-icon/cart';
import CartDropdown from '../cart/cart-dropdown';

//Reselect to reduce render from mapStateToProps with cart&user selector
import {selectCartHidden} from '../../redux/cart/cart-selectors';
import { selectCurrentUser } from '../../redux/user/user-selectors';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import '../header/header.styles.scss';

const Header = ({currentUser, hidden}) => {
    return(
        <div className='header'>
            <Link className='logo-container' to='/'>
               <Logo className='logo' />
            </Link>
            <div className='options'>
                <Link className='option' to='/shop'>
                    SHOP
                </Link>
                <Link className='option' to='/contact'>
                    CONTACT
                 </Link>
                 {
                     currentUser ? <div className='option' onClick={()=> auth.signOut()}>SIGN OUT</div> :
                      <Link className='option' to='/signin'>SIGN IN</Link>
                 }
                 <CartIcon />
            </div>
            {
                hidden ? null :
              <CartDropdown />
            }
            
        </div> //End Header
    )
};

const mapStateToProps = /*({user: {currentUser}, cart: {hidden}})*/createStructuredSelector ({
   //currentUser,
  // hidden
    currentUser: selectCurrentUser,
   hidden: selectCartHidden
});

     
export default connect(mapStateToProps)(Header);