import React, { useEffect, useState, useContext } from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { useParams } from "react-router-dom";
import { publicFetch } from '../../util/fetcher'
import { FetchContext } from '../../store/fetch'
import IconButton from '@material-ui/core/IconButton';


const QuestionDetail = ({ questionId, title }) => {
    const { id } = useParams()
    const [question, setQuestion] = useState(null)
    const { authAxios } = useContext(FetchContext)
    const [questions, setQuestions] = useState(null)

    useEffect(() => {
        const fetchQuestion = async () => {
            const { data } = await publicFetch.get(`/question/${id}`)
            setQuestion(data)
        }
        if (question === null)
            fetchQuestion()

        const fetchQuestions = async () => {
            const { data } = await publicFetch.get('/question')
            setQuestions(data)
        }
        if (questions === null) {
            fetchQuestions()
        }
    })

    const upVote = async (aid) => {
        await authAxios.get(
            `/votes/upvote/${id}/${aid}`
        )
        window.location.reload()
    }

    function similarity(s1, s2) {
        var longer = s1;
        var shorter = s2;
        if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
        }
        var longerLength = longer.length;
        if (longerLength === 0) {
            return 1.0;
        }
        return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    }

    function editDistance(s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();
        var x =1;
        var costs = [];
        for (var i = 0; i <= s1.length; i++) {
            var lastValue = i;
            for (var j = 0; j <= s2.length; j++) {
                if (i === 0)
                    costs[j] = j;
                else {
                    if (j > 0) {
                        var newValue = costs[j - 1];
                        if (s1.charAt(i - 1) !== s2.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue),
                                costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }



    return (
      
       
        <div>




             {question && (
                <>

    {question.answers.length == 0 &&  (
    
                  
                            
                           
                                  
                            <div >
                               
                                <div style={{marginTop:'20px',marginLeft:'40px',width: "70%", height: "40%"}}>
                              
                                 <h1>Waiting for Answers :
                                    </h1>
                                    <div style={{ marginBottom: "20px" }}></div>
                                </div>

                                <div style={{marginLeft:'40px',border:'1px solid black',width: "70%", height: "200px"}}>
                                <h2 style={{ margin: "10px" ,width: "40%", height: "0%"}}>{question.title}</h2>
                                       <div style={{ marginBottom: "60px" }}>  </div>
                                <img src="https://i.pinimg.com/originals/10/b2/f6/10b2f6d95195994fca386842dae53bb2.png" alt="alternatetext" style ={{height:'90px', marginLeft:'280px'}}></img>
                                </div>
                                <div style={{ marginBottom: "20px" }}>
                               
                                <h5 style={{ marginTop:'20px',marginLeft: "35px" ,width: "100%", height: "0%"}}>Your request has been sended, please be patient. In short time you’ll be answered.</h5>
                                 
                                </div>
                                <hr />
                            </div>
                        )
                    } 
                 
                    {question.answers.length > 0 && (
                        question.answers.sort().map((answer) => ( 
                            
                   
                                   
                            <div >
                                  <h2 style={{marginTop:'20px',marginLeft:'40px', margin: "10px" ,width: "40%", height: "40%"}}>Answer Recieved</h2>
                                <div style={{marginTop:'20px',marginLeft:'40px',border:'1px solid black',width: "70%", height: "40%"}}>
                                <h2 style={{ margin: "10px" ,width: "40%", height: "40%"}}>{question.title}</h2>
                                <div style={{ margin: "10px", padding: "10px", width: "40%", height: "40%" }}>{answer.text}</div>
                                </div>
                                <div style={{ marginBottom: "20px" }}>
                               
                                    <IconButton
                                        id={answer.id}
                                        onClick={() => upVote(answer.id)}
                                        style={{
                                            marginLeft: "40px",
                                            margin: "0px",
                                            padding: "0px",
                                            display: "inline"
                                        }} >
                                        <ThumbUpAltIcon />
                                    </IconButton>
                                    {answer.score}
                                    <div style={{
                                        marginLeft: "450px",
                                        display: "inline"
                                    }}>Answer by {answer.author.username} on {answer.created.slice(0, 10)}</div>
                                   
                                </div>
                                <hr />
                               
                            </div>
                        ))
                    ) } 
                  
                </>
            )
            }
            
            <div>
                <h3 style ={{marginLeft:'30px'}}>Similar Question</h3>
                <div style={{marginLeft:'40px',width: "70%", height: "60px", fontSize :'30px'}}>
                {console.log(questions)}
                {
                    (() => {
                        let high = 0;
                        let tempId = 0;
                        let tempTitle = "";
                        if (questions) {
                            for (let i = 0; i < questions.length; i++) {
                                if (question) {
                                    if (question.id !== questions[i].id) {
                                        let temp = similarity(questions[i].title, question.title)
                                        if (temp > high) {
                                            high = temp
                                            tempId = questions[i].id
                                            tempTitle = questions[i].title
                                        }
                                    }
                                }
                            }
                            return <a href={`/question/${tempId}`}>{tempTitle}</a>
                      
                        }
                    })()
                }
                </div>
            </div>
        </div>
    )
}

export default QuestionDetail
