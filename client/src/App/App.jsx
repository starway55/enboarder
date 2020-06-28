import { hot } from 'react-hot-loader/root';
import React from 'react';
import GlobalStyle from '../theme';
import { Application } from './styles';
import { ReactComponent as Rocket } from '../assets/rocket.svg';
import './app.css';

const App = (props) => {

  const renderConsoleDisplay = () => {

    if(props.fetchAllCapsulesSuccess){

      return <pre className="white">{JSON.stringify(props.capsules, null, 2) }</pre>
    } else
    if(props.fetchAllCapsulesFailed){

      return <pre className="white">{JSON.stringify(props.fetchAllCapsulesError, null, 2) }</pre>
    } else
    if(props.fetchLandingPadSuccess){

      return <pre className="white">{JSON.stringify(props.landingPad, null, 2) }</pre>
    } else
    if(props.fetchLandingPadFailed){

      return <pre className="white">{JSON.stringify(props.fetchLandingPadError, null, 2) }</pre>
    } else {

      return <pre></pre>
    }
  }

  return (

    <>
      <Application >
        <div className="client-window">
          
          <div className="display-console-border">
            <div className="display-console">
              {renderConsoleDisplay()}
            </div>
          </div>
          <div className="control-console-border">
            <div className="control-console">
              
              <div className="capsules-div">
                <div className="control-console-container">
                  <button type="button" className="btn btn-success" onClick={() => props.fetchAllCapsules()}>Capsules</button>
                </div>
              </div>
              <div className="capsules-div">
                <div className="control-console-container">
                  <Rocket></Rocket>
                </div>
              </div>
              <div className="landing-pad-div">
                <div className="control-console-container">
                  <input className={`form-control landing-pad-input ${props.inputValid === undefined ? "": props.inputValid === false ? "is-invalid" : "is-valid"}`}
                  value={props.inputText} onChange={(event) => props.changeLandingPadInput(event.target.value)}></input>
                  <button type="button" className="btn btn-success" disabled={props.inputValid === false}
                  onClick={() => props.fetchLandingPad(props.inputText)}>Landing Pad</button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </Application>
      <GlobalStyle />
    </>
  );
}

export default hot(App);