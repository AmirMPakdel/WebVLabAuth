import React from "react";
import App from "next/app";
import "../styles/global.css";
import 'antd/dist/antd.css';
import "../utils/poly";
import controller, { ControllerComponent } from "../utils/controller";
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import Head from "next/head";

class MyApp extends App {
  
  constructor(){
    controller.openNotification=openNotification;
    super();
  }

  render() {
    const { Component, pageProps } = this.props;

    return(<>
    <Head>
      <script src="/statics/env.js"></script>
    </Head>
    <ControllerComponent/>
    <Component {...pageProps} />
    </>);
  }
}


const openNotification = (title, description, icon) => {
  let s = {width:"1.8rem", userSelect:"none"};
  if(icon=="error"){icon=<img style={s} src="/statics/svg/error_red.svg"/>}
  if(icon=="success"){icon=<img style={s} src="/statics/svg/success_green.svg"/>}
  if(icon=="alert"){icon=<img style={s} src="/statics/svg/error_yellow.svg"/>}
  notification.open({
    message: title,
    duration:6,
    description,
    icon,
  });
};

export default MyApp;