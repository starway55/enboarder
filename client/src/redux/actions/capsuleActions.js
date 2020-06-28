import axios from 'axios';
import {FETCH_ALL_CAPSULES_START, FETCH_ALL_CAPSULES_SUCCESS, FETCH_ALL_CAPSULES_FAILED} from '../action-types/actionTypes'

export const fetchAllCapsules = () => async dispatch => {

    dispatch(fetchAllCapsulesStart());

    try{

        const response = await axios.get(`http://localhost:4000/allCapsules`);
        dispatch( fetchAllCapsulesSuccess(response.data.result) );
    }
    catch(error){

        dispatch( fetchAllCapsulesFailed(error) );
    }
}

export const fetchAllCapsulesStart = () => ({

    type: FETCH_ALL_CAPSULES_START
})

export const fetchAllCapsulesSuccess = (response) => ({

    type: FETCH_ALL_CAPSULES_SUCCESS,
    payload: response
})

export const fetchAllCapsulesFailed = (error) => ({

    type: FETCH_ALL_CAPSULES_FAILED,
    payload: error
})