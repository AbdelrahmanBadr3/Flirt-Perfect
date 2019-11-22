import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import {GET_ERRORS, SET_CURRENT_USER} from './types'
import jwt_decode from 'jwt-decode/lib';
  //register user 
const URL ='http://localhost:3333'
const SITE ='http://localhost:3000'
   export const registerUser = (userData)=> dispatch =>{
      axios
        .post(`${URL}/routes/api/users`,userData)
        .then(res=>{
            alert('Done')
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
    axios.post(`${URL}/routes/api/users/login`,userData)
    .then(res => {
     const {token ,data} = res.data ;   
     localStorage.setItem('jwtToken',token);
     setAuthToken(token);
     const decoded =jwt_decode(token);
     localStorage.setItem('payload',decoded.id);
     dispatch(setCurrentUser(data));     
    })
    .catch(err=>{
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
        setAuthToken(false)
        dispatch(setCurrentUser({}))
    }