import React, { useContext } from 'react'
import AskQuestion from './AskQuestion';
import UserQuestion from './UserQuestion';
import OthersQuestion from './OthersQuestion';
import { AuthContext } from '../../store/auth'
import {
    Link
} from "react-router-dom";

function RightPanel() {
    const { authState } = useContext(AuthContext)

    return (
        <div>
            <AskQuestion />
            <br />
            {
                (() => {
                    if (Object.keys(authState).length !== 0) {
                        if (Object.keys(authState.userInfo).length !== 0) {
                            return <div>
                                <h3>Your Question History</h3>
                                <UserQuestion username={authState.userInfo.username} />
                            </div>
                        }
                    }
                })()
            }
            <br />
            <h3>Want to help others?</h3>
            <OthersQuestion visible={false}/>
            <Link style={{ margin:'20px'}} to="/global-questions">Go to list global questions</Link>
        </div>
    );
}

export default RightPanel;