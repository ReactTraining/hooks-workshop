import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const config = {
  apiKey: "AIzaSyDG_4z8OONJeQKxKszL4ZbJ0X4-gkwP2ZI",
  authDomain: "eight-k.firebaseapp.com",
  databaseURL: "https://eight-k.firebaseio.com",
  projectId: "eight-k",
  storageBucket: "eight-k.appspot.com",
  messagingSenderId: "372900974293"
}

firebase.initializeApp(config)

export const db = firebase.firestore()

export const auth = () => firebase.auth()

export const mode = "real"
