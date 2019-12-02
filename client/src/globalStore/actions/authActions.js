import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import {GET_ERRORS, SET_CURRENT_USER,IS_SIGNEDUP} from './types'
import jwt_decode from 'jwt-decode/lib';
import firebase from "firebase"
const backEndIP= require('../../config/URLS').backEndIP;
const frontEndIP= require('../../config/URLS').frontEndIP;

  //register user 

//const SITE ='http://206.189.73.177:3000'
   export const registerUser = (userData)=> dispatch =>{
      // console.log(userData)
      // console.log(`${backEndIP}/routes/api/users/register`)
      let state =false;
      axios
        .post(`${backEndIP}/routes/api/users/register`,userData)
        .then(res=>{
            alert('Done')
            //window.location.href=frontEndIP
            dispatch({type:IS_SIGNEDUP, payload:true})
            state=true
            return state;
        })
        .catch(err=>{   
            //console.log(err)
            alert(err.response.data.msg)
            dispatch({type:GET_ERRORS, payload:err.response.data})
        }
    );
   
};
//LOG IN GET THE TOKEN  
export const loginUser = userData => dispatch =>{
    //console.log(userData)

    axios.post(`${backEndIP}/routes/api/users/login`,userData)
    .then(res => {
        //console.log("user")

     const {token ,data} = res.data ;  
    // console.log(res.data)
 
     localStorage.setItem('jwtToken',token);
     setAuthToken(token);
     const decoded =jwt_decode(token);
     localStorage.setItem('payload',decoded.id);
     dispatch(setCurrentUser(data));     
    })
    .catch(err=>{
       // console.log(err)
       alert(err.response.data.msg)
        dispatch({
            type:GET_ERRORS,
            payload:err
    })}
    );
};


//sign in with goole 

export const loginWithGoogle = userData => dispatch =>{
    //console.log(userData)

    axios.post(`${backEndIP}/routes/api/users/googleSignIN`,userData)
    .then(res => {
        //console.log("user")

     const {token ,data} = res.data ;  
    // console.log(res.data)
 
     localStorage.setItem('jwtToken',token);
     setAuthToken(token);
     const decoded =jwt_decode(token);
     localStorage.setItem('payload',decoded.id);
     dispatch(setCurrentUser(data));     
    })
    .catch(err=>{
        //console.log(err)
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
        window.location.href=frontEndIP
    }