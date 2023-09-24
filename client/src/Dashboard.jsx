import React, { useEffect, useState } from 'react'
import axios from 'axios' 
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [suc, setSuc] = useState()
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3000/dashboard')
        .then(result => {console.log(result)
            if(result.data === "Success"){
                setSuc("Succeeded OK")
            }else{
                navigate('/')
            }

        })
        .catch(err => console.log(err))
    }, [])
    return(
        <h2>Dashboard</h2>
    )
}

export default Dashboard;