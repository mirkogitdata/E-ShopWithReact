import React from 'react';
//Switch, Route, Redirect
import {Switch, Route, Redirect} from 'react-router-dom';
//Redux
import {connect} from 'react-redux';
//Import pages
import './App.css';
import Homepage from './pages/homepage/Homepage';
import ShopPage from './pages/shop/ShopPage';
import SignInUp from './pages/Sign-in-and-sign-up/Sign-in-and-sign-up';
import Header from './component/header/header.jsx';
import Footer from './component/footer/footer.jsx';
import CheckoutPage from './pages/checkout/CheckoutPage';
//Firebase setup, auth, google auth, selectors, redux actions
import {auth, createUserProfileDocument, addCollectionDocuments} from  '../src/firebase/firebase.util';
import {setCurrentUser} from './redux/user/user-action';
//Reselect to reduce render from mapStateToProps with cart&user selector
import { selectCurrentUser } from './redux/user/user-selectors';
//Create this selector to replace state with createStructuredSelector
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPreview } from './redux/shop/shop-selectors';

class App extends React.Component {
  
  unsubscribeFromAuth = null;

  componentDidMount(){
       /*
       this.setState({currentUser: user});
       createUserProfileDocument(user);
       console.log(user);
       */
    const { setCurrentUser, collectionsArray } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      setCurrentUser(userAuth);
      addCollectionDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})));
    });
  }

 componentWillUnmount(){
   this.unsubscribeFromAuth();
 }

  render(){
    return (
      <div className="App">
        <Header />
        <Switch>
            <Route exact path='/' component={Homepage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route path='/signin' render={()=> this.props.currentUser ? 
              (<Redirect to='/' />) : (<SignInUp />)}//Redirect to HomePage if currentUser is Sign in
            />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = /*({user})*//*state =>*/ createStructuredSelector({
  //currentUser: user.currentUser
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
