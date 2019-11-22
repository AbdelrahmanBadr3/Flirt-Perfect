import axios from 'axios';
import {GET_ERRORS,SET_QUESTIONS} from './types'
const URL='http://localhost:3333'

export const setQuestions = () => dispatch =>{
    axios.get(`${URL}/api/questions`)
    .then(res => {
     const questions = res.data.data ;   
     localStorage.setItem('questions',questions);
     dispatch(storeQuestions(questions));  
    })
    .catch(err=>
        dispatch({
            type:GET_ERRORS,
            payload:err
    })
    );
};
export const storeQuestions = ( questions )=>{
    return {
        type:SET_QUESTIONS,
        payload:questions
    }
}
