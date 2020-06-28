import { createStore, combineReducers, applyMiddleware } from 'redux';
import {FETCH_ALL_CAPSULES_START, FETCH_ALL_CAPSULES_SUCCESS, FETCH_ALL_CAPSULES_FAILED,
    CHANGE_LANDING_PAD_INPUT, FETCH_LANDING_PAD_START, FETCH_LANDING_PAD_SUCCESS,
    FETCH_LANDING_PAD_FAILED} from './action-types/actionTypes'
import thunk from 'redux-thunk';

// const { NODE_ENV } = process.env;
// const isDevelopment = NODE_ENV === 'development';

const reducers = {
    appReducer: (oldState = {
        fetchAllCapsulesStart: false,
        fetchAllCapsulesSuccess: false,
        fetchAllCapsulesFailed: false,
        capsules: '',
        fetchAllCapsulesError: '',

        text: '',
        valid: undefined,

        fetchLandingPadStart: false,
        fetchLandingPadSuccess: false,
        fetchLandingPadFailed: false,
        landingPad: '',
        fetchLandingPadError: ''
    }, action) => {
        const { type } = action;
        switch (type) {

            case FETCH_ALL_CAPSULES_START: 
                return {
                    ...oldState,
                    fetchAllCapsulesStart: true,
                    fetchAllCapsulesSuccess: false,
                    fetchAllCapsulesFailed: false,
                    capsules: {},
                    fetchAllCapsulesError: {},

                    fetchLandingPadStart: false,
                    fetchLandingPadSuccess: false,
                    fetchLandingPadFailed: false,
                    landingPad: {},
                    fetchLandingPadError: {}
                }

            case FETCH_ALL_CAPSULES_SUCCESS:

                return {
                    ...oldState,
                    fetchAllCapsulesStart: false,
                    fetchAllCapsulesSuccess: true,
                    fetchAllCapsulesFailed: false,
                    capsules: action.payload,
                    fetchAllCapsulesError: {},

                    fetchLandingPadStart: false,
                    fetchLandingPadSuccess: false,
                    fetchLandingPadFailed: false,
                    landingPad: {},
                    fetchLandingPadError: {}
                }

            case FETCH_ALL_CAPSULES_FAILED:
                return {
                    ...oldState,
                    fetchAllCapsulesStart: false,
                    fetchAllCapsulesSuccess: false,
                    fetchAllCapsulesFailed: true,
                    capsules: {},
                    fetchAllCapsulesError: action.payload.response.data.error,

                    fetchLandingPadStart: false,
                    fetchLandingPadSuccess: false,
                    fetchLandingPadFailed: false,
                    landingPad: {},
                    fetchLandingPadError: {}
                }

            case FETCH_LANDING_PAD_START: 
                return {
                    ...oldState,
                    fetchLandingPadStart: true,
                    fetchLandingPadSuccess: false,
                    fetchLandingPadFailed: false,
                    landingPad: {},
                    fetchLandingPadError: {},

                    fetchAllCapsulesStart: true,
                    fetchAllCapsulesSuccess: false,
                    fetchAllCapsulesFailed: false,
                    capsules: {},
                    fetchAllCapsulesError: {},
                }

            case FETCH_LANDING_PAD_SUCCESS:

                return {
                    ...oldState,
                    fetchLandingPadStart: false,
                    fetchLandingPadSuccess: true,
                    fetchLandingPadFailed: false,
                    landingPad: action.payload,
                    fetchLandingPadError: {},

                    fetchAllCapsulesStart: true,
                    fetchAllCapsulesSuccess: false,
                    fetchAllCapsulesFailed: false,
                    capsules: {},
                    fetchAllCapsulesError: {},
                }

            case FETCH_LANDING_PAD_FAILED:
                return {
                    ...oldState,
                    fetchLandingPadStart: false,
                    fetchLandingPadSuccess: false,
                    fetchLandingPadFailed: true,
                    landingPad: {},
                    fetchLandingPadError: action.payload.response.data.error,

                    fetchAllCapsulesStart: true,
                    fetchAllCapsulesSuccess: false,
                    fetchAllCapsulesFailed: false,
                    capsules: {},
                    fetchAllCapsulesError: {},
                }

            case CHANGE_LANDING_PAD_INPUT: {

                const regex = new RegExp(".*[#$%&].*");

                return {
                    ...oldState,
                    text: action.payload,
                    valid: !regex.test(action.payload) && action.payload.length > 0
                }
            }

            default:
                return oldState;
        }
    }
};

const slices = combineReducers({ ...reducers });

// const  composeEnhancers = isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })
//     : compose;


const store = createStore(
    slices,
    // composeEnhancers(),
    applyMiddleware(thunk)
);

export default store;
