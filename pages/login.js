import React, { Component } from "react";
import dynamic from 'next/dynamic'

const Login = dynamic(() => import("../dynamic/index/Login"), { ssr: false });

export default class login extends Component {
    
  render(){
    return(
      <Login/>
    )
  }
}