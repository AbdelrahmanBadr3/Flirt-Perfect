import {SET_QUESTIONS,SET_ANSWER,ADD_TO_SEQUENCE,Add_Matching_List} from '../actions/types'

const initialState ={
    questions: [],
    sequence:[],
    tempSequence:[],
    matchingUsers:[]
};

export default function (state = initialState, action ){
    switch(action.type){
        case SET_QUESTIONS:
            return {
            ...state,
            questions:action.payload
        }
        case SET_ANSWER:
            return {
            ...state,
            sequence:action.payload
        }
        case ADD_TO_SEQUENCE:
            return {
            ...state,
            tempSequence:action.payload
        }
        case Add_Matching_List:
                return {
                ...state,
                matchingUsers:action.payload
            }
        
        default:
        return state;
    }
}