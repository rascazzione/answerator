import React, { useState, useContext } from 'react';

import { FetchContext } from '../../../store/fetch'
import { useHistory } from "react-router-dom";

function AskQuestion() {
    const [value, setValue] = useState("")
    const { authAxios } = useContext(FetchContext)
    const history = useHistory();

    const onSubmit = async() => {
        const data = {
            "title": value,
            "text":"n/a/n/a/n/a/n/a/n/a/n/a",
            "tags":["n/a"]
        }
        try {
            await authAxios.post('questions', data)
            setValue("")
            window.location.reload()
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    const onChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <div>
            <h2 style={{marginLeft:'20px', marginTop:'20px'}}>Question</h2>
            <input style={{marginLeft:'20px',width:'400px', height:'30px',border:'1px solid black'}} value={value} type="text" onChange={onChange}></input>
            <br /> <br />
            <button style ={{marginLeft:'20px',height:'40px', width:'150px', fontStyle:'-moz-initial'}}onClick={onSubmit}>Send Question</button>
        </div>
    )
}

export default AskQuestion;