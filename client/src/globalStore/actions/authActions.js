import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import {GET_ERRORS, SET_CURRENT_USER} from './types'
import jwt_decode from 'jwt-decode/lib';
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
  //register user 
const URL ='http://localhost:3333'
const fbConfig = require('../../config/firebase');


//const SITE ='http://localhost:3000'
   export const registerUser = (userData)=> dispatch =>{
      axios
        .post(`${URL}/routes/api/users/register`,userData)
        .then(res=>{
            alert('Done')
            console.log(res.data)
          //     window.location.href=`${SITE}/verificationpage`
        })
        .catch(err=>{
            alert(err.response.data.msg)
            dispatch({type:GET_ERRORS, payload:err.response.data})}
    );
};
export const verifyUser = (userData)=> dispatch =>{
    axios.post(`${URL}/routes/api/users/verify`,{secretToken:userData})
    .then(res => {
        dispatch(setCurrentUser(res.data.user.user));
         //window.location.href=`${SITE}/startAs`
    
        }).catch(e=>{
          alert(e.response.data)

        })
};

//LOG IN GET THE TOKEN  
export const loginUser = userData => dispatch =>{
    console.log(userData)

    axios.post(`http://localhost:3333/routes/api/users/login`,userData)
    .then(res => {
        console.log("user")

     const {token ,data} = res.data ;  
     console.log(res.data)
 
     localStorage.setItem('jwtToken',token);
     setAuthToken(token);
     const decoded =jwt_decode(token);
     localStorage.setItem('payload',decoded.id);
     dispatch(setCurrentUser(data));     
    })
    .catch(err=>{
        console.log(err)
        alert(err)
        dispatch({
            type:GET_ERRORS,
            payload:err
    })}
    );
};


//sign in with goole 

export const loginWithGoogle = userData => dispatch =>{
    console.log(userData)

    axios.post(`http://localhost:3333/routes/api/users/googleSignIN`,userData)
    .then(res => {
        console.log("user")

     const {token ,data} = res.data ;  
     console.log(res.data)
 
     localStorage.setItem('jwtToken',token);
     setAuthToken(token);
     const decoded =jwt_decode(token);
     localStorage.setItem('payload',decoded.id);
     dispatch(setCurrentUser(data));     
    })
    .catch(err=>{
        console.log(err)
        alert(err)
        dispatch({
            type:GET_ERRORS,
            payload:err
    })}
    );
};

//SET LOGGED IN USER 
export const setCurrentUser = ( decoded )=>{
    return {
        type:SET_CURRENT_USER,
        payload:decoded
    }
}

// LOG USER OUT 
export const logoutUser = ()=>
    dispatch=>{
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('state');
        localStorage.removeItem('questions');
        localStorage.removeItem('firebaseui::rememberedAccounts');

        setAuthToken(false)
        firebase.auth().signOut()
        dispatch(setCurrentUser({}))
        window.location.href="http://localhost:3000"
    }