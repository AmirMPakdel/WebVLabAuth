import React, { Component } from "react";
import dynamic from 'next/dynamic';
import Header from "next/head";

const Register = dynamic(() => import("../dynamic/index/Register"), { ssr: false });

export default class register extends Component {


  render(){
    return(
      <>
      <Header>
        <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script> 
      </Header>
      <Register/>
      </>
    )
  }
}