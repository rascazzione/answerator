import React from 'react';
import './styles.css'

function HomePage() {
    return (
        <div>
            <div style={{marginTop:'20%'}} className="centered">
                <h1> Welcome to Answerator </h1>
            </div>
            <br />
            <div className="centered">
                <input type="text" style={{width:'400px', border:'1px solid black'}}></input>
            </div>
            <br />
            <div className="centered">
                <button>Send Question</button>
            </div>
            <br />
            <div className="centered">
                <h3>The collaborative internal FAQs</h3>
            </div>
        </div>
    )
}

export default HomePage;