import React, { Component } from "react";
import dynamic from 'next/dynamic'

const Index = dynamic(() => import("../dynamic/index/Index"), { ssr: false });

export default class index extends Component {
    
  render(){
    return(
      <Index/>
    )
  }
}