import React, { useState, useEffect, useContext } from 'react'

import { publicFetch } from '../../../util/fetcher'
import RichTextEditor from 'react-rte';
import { FetchContext } from '../../../store/fetch'
import { AuthContext } from '../../../store/auth'
import { useHistory } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const UserQuestion = (props) => {
  const [questions, setQuestions] = useState(null)
  const [show, setShow] = useState("none");
  const [value, setValue] = useState("")
  const { authAxios } = useContext(FetchContext)
  const { authState } = useContext(AuthContext)
  const [questionId, setQuestionId] = useState("")
  const [dateSorted, setDateSorted] = useState(false)
  const [quesSorted, setQuesSorted] = useState(false)

  useEffect(() => {
    const fetchQuestion = async () => {
      const { data } = await publicFetch.get('/question')
      setQuestions(data)
    }
    if (questions === null) {
      fetchQuestion()
    }
  })

  const sendAnswer = async (e) => {
    const textValue = {
      "text": value
    }
    console.log(textValue.text)
    try {
      await authAxios.post(`/answer/${e.target.id}`, textValue)
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }

  const changeDisplay = (e) => {
    if (show === "none") {
      setShow("inline")
      setQuestionId(e.target.id)
    }
    else setShow("none")
  }

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const sortDate = () => {
    var clone = questions.slice(0);
    if (dateSorted) {
      setQuestions(questions.sort((a, b) => a.created.localeCompare(b.created)))
      setDateSorted(false)
    }
    else {
      setQuestions(clone.sort((a, b) => b.created.localeCompare(a.created)))
      setDateSorted(true)
    }
  }
  const sortQues = () => {
    var clone = questions.slice(0);
    if (quesSorted) {
      setQuestions(questions.sort((a, b) => a.title.localeCompare(b.title)))
      setQuesSorted(false)
    }
    else {
      setQuestions(clone.sort((a, b) => b.title.localeCompare(a.title)))
      setQuesSorted(true)
    }
  }

  return (
    <div>
     <Table striped bordered hover  style={{ marginLeft: '20px', width: "90%", overflow: "auto",  fontFamily: 'Arial, Helvetica, sans-serif',striped:'true' }}>
        <thead scope="col">
          <tr style={{ border:'1px solid black' }}>
            <th onClick={sortDate} style={{  width: "20%", cursor: "pointer" }}>
              Date
              {dateSorted ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
              </th>
            <th onClick={sortQues} style={{cursor: "pointer"}}>
              Question
              {quesSorted ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
              </th>
          </tr>
        </thead>
        <tbody style ={{marginTop:'100px'}}>
          {
            (() => {
              if (props.visible) {
               return questions
                  ?.sort()
                  .map(
                    ({
                      id,
                      title,
                      created,
                      author
                    }) => (
                      author.id !== authState.userInfo.id ?
                        <tr key={id} style={{ }}>
                          <td style={{  minWidth: "10px" }}>{created.slice(0, 10)}</td>
                          <td style={{}}>
                            <div style={{ padding: "15px" }}>
                              <div style={{cursor: "pointer"}} id={id} onClick={changeDisplay}>{title}</div>
                              {id === questionId ? <div style={{ display: show }}>
                                <br />
                                <input style={{ width: "400px", height: "100px" }} value={value}
                                  onChange={onChange} />
                                <br />
                                <button id={id} onClick={sendAnswer}>Send Answer</button>
                              </div> : null}
                            </div>
                          </td>
                        </tr> : null
                    )
                  )
              }
              else {
                return questions
                  ?.sort().slice(0, 5)
                  .map(
                    ({
                      id,
                      title,
                      created,
                      author
                    }) => (
                      author.id !== authState.userInfo.id ?
                        <tr key={id} style={{ border :'1px solid black'}}>
                          <td style={{ textAlign:'center',height:'40px', fontSize:'17px' }}>{created.slice(0, 10)}</td>
                          <td style={{  height:'40px', fontSize:'18px'  }}>
                            <a href={`/question/${id}`}>{title}</a>
                          </td>
                        </tr> : null
                    )
                  )
              }

            })()
          }


          {/* {questions
            ?.sort()
            .map(
              ({
                id,
                title,
                created,
                author
              }) => (
                author.id !== authState.userInfo.id ?
                  <tr key={id} style={{ border: "1px solid black" }}>
                    <td style={{ border: "1px solid black" }}>{created.slice(0, 10)}</td>
                    <td style={{ border: "1px solid black" }}>
                      {props.visible ? <div style={{ padding: "15px" }}>
                        <div id={id} onClick={changeDisplay}>{title}</div>
                        {id === questionId ? <div style={{ display: show }}>
                          <br />
                          <input style={{ width: "400px", height: "100px" }} value={value}
                            onChange={onChange} />
                          <br />
                          <button id={id} onClick={sendAnswer}>Send Answer</button>
                        </div> : null}
                      </div> :
                        <a href={`/question/${id}`}>{title}</a>}
                    </td>
                  </tr> : null
              )
            )} */}
        </tbody>
      </Table>
    </div>
  );
};

export default UserQuestion

