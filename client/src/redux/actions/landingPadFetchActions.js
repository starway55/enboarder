import axios from 'axios';
import {FETCH_LANDING_PAD_START, FETCH_LANDING_PAD_SUCCESS, FETCH_LANDING_PAD_FAILED} from '../action-types/actionTypes'

export const fetchLandingPad = (id) => async dispatch => {

    dispatch(fetchLandingPadStart());

    try{

        const headers = {
            "Content-Type": "application/json"
        }

        const body = {
            "id": id
        }

        const response = await axios.post(`http://localhost:4000/landingPad`, body, {
            headers: headers
        });

        dispatch( fetchLandingPadSuccess(response.data.result) );
    }
    catch(error){

        dispatch( fetchLandingPadFailed(error) );
    }
}

export const fetchLandingPadStart = () => ({

    type: FETCH_LANDING_PAD_START
})

export const fetchLandingPadSuccess = (response) => ({

    type: FETCH_LANDING_PAD_SUCCESS,
    payload: response
})

export const fetchLandingPadFailed = (error) => ({

    type: FETCH_LANDING_PAD_FAILED,
    payload: error
})