import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const VerifyPage = () => {
    const [message, setMessage] = useState('')
    const {token} = useParams()
    useEffect(() => {
        axios.get(`http://localhost:8080/api/auth/verify/${token}`).then(res => setMessage(res.data.message))
    }, [ token ])
  return (
    <main>
        <h1>{message}</h1>
    </main>
  )
}

export default VerifyPage