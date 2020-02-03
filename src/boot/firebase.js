// import something here
import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import VueFirestore from 'vue-firestore'

Vue.use(VueFirestore)
// "async" is optional
export default async ({
  Vue
}) => {
  // something to do
  const firebaseConfig = {
    apiKey: 'AIzaSyAFPv12ow19Pqurj_7-62cagXMvZP_nkV0',
    authDomain: 'dispo-dispo.firebaseapp.com',
    databaseURL: 'https://dispo-dispo.firebaseio.com',
    projectId: 'dispo-dispo',
    storageBucket: 'dispo-dispo.appspot.com',
    messagingSenderId: '1011742695911',
    appId: '1:1011742695911:web:dce094448878f0123f5d42',
    measurementId: 'G-D9WF74W3N7'
  }

  firebase.initializeApp(firebaseConfig)
  // firebase.analytics()
  // var db = firebase.firestore()
  Vue.prototype.$firebase = firebase
}
