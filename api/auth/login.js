import { Component } from "react";
import controller, { getParamByName } from "../../utils/controller";
import myServer from "../../utils/myServer";

/**@param {Component} c*/
export function login(c){

    c.setState({mobile_red:false, login_loading:true});

    let params={
        response_type:getParamByName("response_type"),
        client_id:getParamByName("client_id"),
        state:getParamByName("state"),
        scope:"profile-read,profile-write",
        acr:getParamByName("acr_values"),
        user_phone:c.state.mobile,
    }

    myServer.Get(myServer.urls.LOGIN_USER, {params}, (err,data)=>{

        if(!err){

            if(data.response.userUniqueKey){

                c.state.unique_key=data.response.userUniqueKey;
                c.state.page="waiting";
                window.scrollTo(null,0);
            }
        }

        c.setState({login_loading:false});
    });

    // setTimeout(()=>{
    //     let err=false;
    //     let data={response:{userUniqueKey:"123123"}}
    //     /////////
    //     if(!err){

    //         if(data.response.userUniqueKey){

    //             c.state.unique_key=data.response.userUniqueKey;
    //             c.state.page="waiting";
    //             window.scrollTo(null,0);
    //         }
    //     }

    //     c.setState({login_loading:false});
    //     /////////

    // }, 2000);
}

/**@param {Component} c*/
export function loginSendAgain(c){

    if(c.send_again_lock)return;
    c.send_again_lock=true;

    let params={
        response_type:getParamByName("response_type"),
        client_id:getParamByName("client_id"),
        state:getParamByName("state"),
        scope:"profile-read,profile-write",
        acr:getParamByName("acr_values"),
        user_phone:c.state.mobile,
    }

    myServer.Get(myServer.urls.LOGIN_USER, {params}, (err,data)=>{

        if(!err){

            if(data.response.userUniqueKey){

                c.state.unique_key=data.response.userUniqueKey;
                c.LoginWaiting.startCountdown();
            }
        }

        c.send_again_lock=false;
    });

    // setTimeout(()=>{
    //     let err=false;
    //     let data={response:{userUniqueKey:"123123"}}
    //     /////////
    //     if(!err){

    //         if(data.response.userUniqueKey){

    //             c.state.unique_key=data.response.userUniqueKey;
    //             c.LoginWaiting.startCountdown();
    //         }
    //     }

    //     c.send_again_lock=false;
    //     /////////

    // }, 2000);
}

/**@param {Component} c*/
export function watingRequest(c){
    
    let params={
        unique_key:c.state.unique_key
    }

    myServer.Get(myServer.urls.LOGIN_WAITING, {params}, (err, data)=>{

        if(!err){
            let d = data.response;
            
            if(d.status==="SUCCESS_AUTHNTICATED"){
    
                clearInterval(c.waiting_interval);
    
                controller.openNotification("احراز هویت موفقیت آمیز بود", null, "success");
    
                loginEndpoint(c);
            }
        }
    });

    // setTimeout(()=>{
    //     let err = false;
    //     let data={response:{status:"SUCCESS_AUTHNTICATED"}};
    //     /////////
    //     if(!err){
    //         let d = data.response;
            
    //         if(d.status==="SUCCESS_AUTHNTICATED"){
    
    //             clearInterval(c.waiting_interval);
    
    //             controller.openNotification("احراز هویت موفقیت آمیز بود", null, "success");
    
    //             loginEndpoint(c);
    //         }
    //     }
    //     /////////
    // }, 5000);
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