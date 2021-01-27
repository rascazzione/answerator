import React, { useEffect, useState } from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import { publicFetch } from '../../../util/fetcher'

import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
const UserQuestion = ({ username }) => {
    const [posts, setPosts] = useState(null)
    const [postType, setPostType] = useState('Questions')

    useEffect(() => {
        const fetchQuestions = async () => {
            const { data } = await publicFetch.get(`/question/user/${username}`)
            setPosts(data)
        }
        fetchQuestions()
    }, [postType, username])

    return (
        <div overflow-auto>
            <Table striped bordered hover   style={{width: "90%",marginLeft:'20px' }}>
                <thead>
                    <tr style={{ }}>
                        <th style={{ width: "20%"  }}>Date</th>
                        <th style={{ width:'70%'}}>Question</th>
                    </tr>
                </thead>
                <tbody>
                    {posts?.map(({ id, title, created, answers }) => (
                        <tr key={id} style={{  }}>
                            <td style={{ height:'40px', fontSize:'17px', textAlign:'center'}}>{created.slice(0, 10)}</td>
                            <td style={{ height:'40px', fontSize:'17px' }}>
                                <a href={`/question/${id}`}>{title}</a>
                                {answers.length ? null : <CancelIcon style={{ marginLeft:'10px',color: "red" }} />}
                                {
                                    (() => {
                                        for (let i = 0; answers.length; i++) {
                                            if (answers[i].score)
                                                return <CheckCircleIcon style={{ marginLeft:'10px',color: "green" }} />
                                            else return <CancelIcon style={{ color: "red" }} />
                                        }
                                    })()
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default UserQuestion
