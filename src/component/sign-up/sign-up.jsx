import React, {useState} from 'react';
import FormInput from '../../component/form-input/form-input';
import CustomButton from '../../component/custom-button/custom-button';

import {auth, createUserProfileDocument} from '../../firebase/firebase.util';

import '../../component/sign-up/sign-up.styles.scss';

const SignUp =  () => {
  /*
    constructor(){
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }
    */

    const [userInput, setUserInput] = useState({
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    const {displayName, email, password, confirmPassword } = userInput;

    const handleSubmit = async (event) => {
        event.preventDefault();
 
        if(password !== confirmPassword ){
            alert("password dont match");
            return;
        }

        try {
          const { user } = await auth.createUserWithEmailAndPassword(
              email,
              password
            );
           await createUserProfileDocument(user, {displayName});

           setUserInput({
              displayName: '',
              email: '',
              password: '',
              confirmPassword: ''
           })
        } catch(error){
             console.error(error);
        }
    }

    const handleChange = (event) => {
       const {name, value} = event.target;
       //setUserInput({...userInput, [name]: value});
       setUserInput((prevState)=> {
         return {...prevState, [name]: value}
       })
    }
    return(
            <div className='sign-up'>
                <h2 className='title'>I do not have a account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <FormInput
                       type='text'
                       name='displayName'
                       value={displayName}
                       onChange={handleChange}
                       label='Display Name'
                       required
                    />
                    <FormInput
                      type='email'
                      name='email'
                      value={email}
                      onChange={handleChange}
                      label='Email'
                      required
                    />
                    <FormInput
                      type='password'
                      name='password'
                      value={password}
                      onChange={handleChange}
                      label='Password'
                      required
                    />
                    <FormInput
                      type='password'
                      name='confirmPassword'
                      value={confirmPassword}
                      onChange={handleChange}
                      label='Confirm Password'
                      required
                    />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
               </form>
            </div>  
    )
}

export default SignUp;