import React from 'react';
import '../Sign-in-and-sign-up/Sign-in-and-sign-up.styles.scss';
import SignIn from '../../component/sign-in/sign-in';
import SignUp from '../../component/sign-up/sign-up';

const SignInUp = (props) => {
    return(
        <div className='sign-in-and-sign-up'>
            <SignIn />
            <SignUp />
        </div>
    )
}

export default SignInUp;