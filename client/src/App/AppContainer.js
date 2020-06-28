import { connect } from 'react-redux';
import App from './App';
import { fetchAllCapsules } from '../redux/actions/capsuleActions';
import { changeLandingPadInput } from '../redux/actions/landingPadInputActions';
import { fetchLandingPad } from '../redux/actions/landingPadFetchActions'

const mapStateToProps = (state) => ({

    fetchAllCapsulesStart: state.appReducer.fetchAllCapsulesStart,
    fetchAllCapsulesSuccess: state.appReducer.fetchAllCapsulesSuccess,
    fetchAllCapsulesFailed: state.appReducer.fetchAllCapsulesFailed,
    capsules: state.appReducer.capsules,
    fetchAllCapsulesError: state.appReducer.fetchAllCapsulesError,

    inputText: state.appReducer.text,
    inputValid: state.appReducer.valid,

    fetchLandingPadStart: state.appReducer.fetchLandingPadStart,
    fetchLandingPadSuccess: state.appReducer.fetchLandingPadSuccess,
    fetchLandingPadFailed: state.appReducer.fetchLandingPadFailed,
    landingPad: state.appReducer.landingPad,
    fetchLandingPadError: state.appReducer.fetchLandingPadError
    
})

const mapDispatchToProps = (dispatch) => ({

    fetchAllCapsules: () => dispatch(fetchAllCapsules()),
    changeLandingPadInput: (text) => dispatch(changeLandingPadInput(text)),
    fetchLandingPad: (id) => dispatch(fetchLandingPad(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);