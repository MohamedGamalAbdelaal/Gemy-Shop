import React, { useEffect, useState } from 'react'
import {jwtDecode} from 'jwt-decode'

export default function Profile() {
    const [name, setname] = useState(null)
    useEffect(function(){
     const x=jwtDecode(localStorage.getItem('userToken'))
     setname(x.name)
    },[])
  return <>
  <h1>hello {name}</h1>
  </>
}
