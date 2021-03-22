import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC2PI_CfVI6c72v55XYlPakCXs0encVv_o",
    authDomain: "e-shop-cloth.firebaseapp.com",
    projectId: "e-shop-cloth",
    storageBucket: "e-shop-cloth.appspot.com",
    messagingSenderId: "394472458799",
    appId: "1:394472458799:web:821607cf1c0f12a6b914da",
    measurementId: "G-9CPDDVH9K7"
};
// async => API request from data
export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get(); //SnapShotReference
    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
              await userRef.set({
                  displayName,
                  email,
                  createdAt,
                  ...additionalData
              })
        } catch(error) {
            console.log('error creating user', error.message);
        }
       //DocumentReferenceCRUD methods(create => set(), retrieve => get(), update => update(), delete => delete())
    }
    return userRef;
}
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;