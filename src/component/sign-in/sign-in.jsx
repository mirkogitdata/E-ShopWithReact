import React, {useState} from 'react';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import './sign-in.styles.scss';

import { auth, signInWithGoogle } from '../../firebase/firebase.util';

const SignIn = () => {
    /*
    constructor(props){
        super(props);
        this.state = {
              email: '',
              password: ''
        }
    }
    */

    const [userInput, setUserInput] = useState({
        email: '',
        password: ''
    });

    const { email, password } = userInput;

    const handleChange = (event) => {
        const { value, name } = event.target;
        //setUserInput({...userInput, [name]: value} );
        setUserInput((prevState) => {
            return {...prevState, [name]: value}
        })
    }
  

    const handleSubmit = async (event) => {
        event.preventDefault();
 
        try {
            await auth.signInWithEmailAndPassword(email, password);
            //setUserInput(...userInput, {email: '', password: ''});
            setUserInput((prevState) => {
                return {...prevState, email: '', password: ''}
            })
        } catch (error) {
            console.log(error);
        }

        setUserInput((prevState) => {
            return {...prevState, email: '', password: ''}
        })
       
    }
   
    return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={handleSubmit}>
                    <FormInput
                      name="email"
                      type="email"
                      value={email}
                      handleChange={handleChange}
                      label='email'
                      required
                    />
                    <FormInput
                      name="password"
                      type="password"
                      value={password}
                      handleChange={handleChange}
                      label='password'
                      required
                    />
                    <div className='buttons'>
                        <CustomButton type="submit">
                              Sign in
                        </CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                             Sign in with Google
                        </CustomButton>
                    </div>
                </form>
            </div>
    )
}

export default SignIn;