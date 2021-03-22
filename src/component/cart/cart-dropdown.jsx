import React from 'react';
import {connect} from 'react-redux';

import CustomButton from '../custom-button/custom-button';
import CartItem from '../cart-item/cart-item';

//Reselect to reduce render from mapStateToProps with cart&user selector
import { selectCartItems } from '../../redux/cart/cart-selectors';
//Create this selector to replace state with createStructuredSelector
import { createStructuredSelector } from 'reselect';
import {withRouter} from 'react-router-dom';

import '../cart/cart-dropdown.styles.scss';
import { toggleCartHidden } from '../../redux/cart/cart.action';

const CartDropdown = ({ cartItems, history, dispatch}) => (
    
        <div className='cart-dropdown'>
             <div className='cart-items'>
                 {
                     cartItems.length ? (
                     cartItems.map(cartItem => (
                         <CartItem
                           key={cartItem.id}
                           item={cartItem}
                         />
                      ))
                    ) : (<span className='empty-message'>Your cart is empty</span>
                    )}
             </div>
             <CustomButton onClick={()=> {
                  history.push('/checkout');
                  dispatch(toggleCartHidden());
               }}>GO TO CHECKOUT</CustomButton>
        </div>
);

const mapStateToProps = /*({cart: {cartItems}})*//*state =>*/ createStructuredSelector({
    //cartItems
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
