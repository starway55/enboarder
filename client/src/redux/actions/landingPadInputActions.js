import {CHANGE_LANDING_PAD_INPUT} from '../action-types/actionTypes'

export const changeLandingPadInput = (text) => ({

    type: CHANGE_LANDING_PAD_INPUT,
    payload: text
})