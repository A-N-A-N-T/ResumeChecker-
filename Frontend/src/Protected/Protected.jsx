import React from 'react'
import { Navigate } from "react-router";
import {useAuth} from '../hooks/hook'
const Protected = ({children}) => {
    const {loading , user} = useAuth()
    console.log(user)
    if(loading){
        return (<main><h1>Loading......</h1></main>)
    }

    if(!user){
        return <Navigate to="/login"/>
    }

    return children
}

export default Protected
