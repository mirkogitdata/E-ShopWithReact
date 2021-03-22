import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

firestore.collection('users').doc('mMwbmLT6T91NGe9dSlYl').
collection('carItems').doc('YsFT2P78pJPXAekeD1mT'); //first way of slection
firestore.doc('/users/mMwbmLT6T91NGe9dSlYl/carItems/YsFT2P78pJPXAekeD1mT'); //Second way of selection
firestore.collection('/users/mMwbmLT6T91NGe9dSlYl/carItems/YsFT2P78pJPXAekeD1mT'); //Third way of selection
