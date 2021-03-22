import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.action';

//Reselect to reduce render from mapStateToProps with cart&user selector
import { selectCartItemsCount } from '../../redux/cart/cart-selectors';
//Create this sleector to replace state with createStructuredSelector
import { createStructuredSelector } from 'reselect';

import {ReactComponent as ShoppingIcon} from '../../assets/ShoppingIcon.svg';

import '../cart-icon/cart.styles.scss';

const CartIcon = ({toggleCartHidden, itemCount}) => {
    return(
        <div className='cart-icon' onClick={toggleCartHidden}>
            <ShoppingIcon className='shoping-icon' />
            <span className='item-count'>{ itemCount }</span>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = /*({cart: {cartItems}})*//*state =>*/ createStructuredSelector ({
    //itemCount: cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
    itemCount: selectCartItemsCount
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);