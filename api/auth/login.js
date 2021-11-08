import axios from "axios";
import { Component } from "react";
import controller, { getParamByName } from "../../utils/controller";
import myServer from "../../utils/myServer";

/**@param {Component} c*/
export function login(c){

    c.setState({mobile_red:false, login_loading:true});

    // let params={
    //     response_type:getParamByName("response_type"),
    //     client_id:getParamByName("client_id"),
    //     state:getParamByName("state"),
    //     scope:"profile-read,profile-write",
    //     acr:getParamByName("acr_values"),
    //     user_phone:c.state.mobile,
    // }

    let params={
        response_type: "code",
        client_id: "appclient",
        state: "1234",
        scope:"profile-read,address-read",
        acr: 2,
        user_phone:c.state.mobile,
    }

    //?response_type=code&client_id=appclient&state=1234&scope=profile-read,address-read&acr_values=2
    //09981547091

    axios.get(myServer.urls.LOGIN_USER, {params}).then(res=>{

        if(env.ENVIRONMENT_MODE==="dev"){
            console.log(res);
        }

        let data = res.data;

        if(res.status == 200){
            
            if(data.response.userUniqueKey){

                c.state.unique_key=data.response.userUniqueKey;
                c.state.page="waiting";
                window.scrollTo(null,0);
            }
        }
        c.setState({login_loading:false});

    }).catch(e=>{

        if(e.response.data.error.errorCode === window.env.SERVER_CODES.AUTH_REQ_ALREADY_EXIST){

            c.state.page="waiting";
            window.scrollTo(null,0);
            c.setState({login_loading:false});

        }else if(e.response.data.error){

            controller.openNotification(e.response.data.error.description, null, "error")
        }

    });
}

/**@param {Component} c*/
export function loginSendAgain(c){

    if(c.send_again_lock)return;
    c.send_again_lock=true;

    // let params={
    //     response_type:getParamByName("response_type"),
    //     client_id:getParamByName("client_id"),
    //     state:getParamByName("state"),
    //     scope:"profile-read,profile-write",
    //     acr:getParamByName("acr_values"),
    //     user_phone:c.state.mobile,
    // }
    let params={
        response_type: "code",
        client_id: "appclient",
        state: "1234",
        scope:"profile-read,address-read",
        acr: 2,
        user_phone:c.state.mobile,
    }


    axios.get(myServer.urls.LOGIN_USER, {params}).then(res=>{


        let d = res.data.response;

        if(d.userUniqueKey){

            c.state.unique_key=d.userUniqueKey;
            c.LoginWaiting.startCountdown();
        }

        c.send_again_lock=false;

    }).catch(e=>{

        if(e.response.data.error){

            controller.openNotification(e.response.data.error.description, null, "error")
        }

    });
}

/**@param {Component} c*/
export function watingRequest(c){
    
    let params={
        unique_key:c.state.unique_key
    }

    axios.get(myServer.urls.LOGIN_WAITING, {params}).then(res=>{

        let d = res.data.response;

        if(d.status==="SUCCESS_AUTHNTICATED"){
    
            clearInterval(c.waiting_interval);

            controller.openNotification("احراز هویت موفقیت آمیز بود", null, "success");

            loginEndpoint(c);
        }


    }).catch(e=>{
        
        if(e.response.data.error){

            controller.openNotification(e.response.data.error.description, null, "error")
        }

    });
}

/**@param {Component} c*/
export function loginWaiting(c){

    c.waiting_interval=setInterval(()=>{

        watingRequest(c);

    },3000);
}

/**@param {Component} c*/
export function loginEndpoint(c){

    let unique_key = c.state.unique_key;

    window.location.href=myServer.urls.LOGIN_REDIRECT+"?unique_key="+unique_key;
}