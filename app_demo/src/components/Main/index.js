import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from "./HomePage";
import OthersQuestion from "../RightPanel/OthersQuestion";
import QuestionDetail from "../QuestionView";

function Main() {
  return (
      <div>
        <Switch>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/about">
          <div>Hi</div>
          </Route>
          <Route path="/global-questions">
             <h1 style={{marginLeft :'20px'}}>Answerator Section</h1>
            <h5 style={{marginLeft :'25px',marginTop:'10px',marginBottom:'30px'}}>Click on question to answer it:</h5>
            <OthersQuestion visible={true}/>
          </Route>
          <Route path="/question/:id">
            <QuestionDetail />
          </Route>
        </Switch>
      </div>
  );
}

export default Main;