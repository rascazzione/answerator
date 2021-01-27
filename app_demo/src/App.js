import * as React from 'react'
import SplitPane from 'react-split-pane';
import Main from './components/Main';
import RightPanel from './components/RightPanel'
import {
  BrowserRouter as Router,
} from "react-router-dom";

import './style.css';
import Header from './components/layout/header';
import { AuthProvider } from './store/auth';
import { FetchProvider } from './store/fetch';

const styles = {
  background: '#000',
  width: '2px',
  cursor: 'col-resize',
  margin: '0 5px',
  height: '100%',
};

function App() {

  return (
    <Router>
      <AuthProvider>
        <FetchProvider>
          <Header />
          <div>
            <SplitPane
              split="vertical"
              minSize={500}
              defaultSize={1000}
              resizerStyle={styles}>
              <div><Main /></div>
              <div><RightPanel /></div>
            </SplitPane>
          </div>
        </FetchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;