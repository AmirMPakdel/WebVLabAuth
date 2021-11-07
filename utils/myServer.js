const domain = window.env.DOMAIN;
import axios from "axios";
import env from "../env";
import controller from "./controller";
import { getCookie } from "./cookie";

const myServer = {

    urls:{
        DOMAIN:domain,

        //register
        REGISTER_USER:domain+"/registration/user/register",
        REGISTER_OPT_RESEND:domain+"/registration/user/otp/resend",
        REGISTER_OPT_CONFIRM:domain+"/registration/user/otp/confirm",
        RECREATE_OPT_CONFIRM:domain+"/registration/user/recreate/otp/confirm",
        RECREATE_CONFIRM:domain+"/registration/user/recreate/confirm",

        //login
        LOGIN_USER:domain+"/authorization/oauth/authenticate",
        LOGIN_WAITING:domain+"/authorization/oauth/waitting-page",
        LOGIN_REDIRECT:domain+"/authorization/oauth/rediret/client-page",
    },

    Get,
    Post,
}

/**
 * 
 * @param {string} url 
 * @param {import("axios").AxiosRequestConfig} config 
 * @param {(err, data)=>{}} cb
 */
function Get(url, config, cb){

    if(!config.noAuthorization){
        config.headers={
            'Authorization': "Bearer "+getCookie(env.TOKEN_KEY),
            'Accept-Language': "fa",
        }
    }

    axios.get(url, config).then(res=>{

        if(env.ENVIRONMENT_MODE==="dev"){
            console.log(res);
        }

        if(res.status == 200){
            if(res.data.successful){
                cb(null, res.data);
            }else{
                controller.openNotification(res.data.message, null, "error")
            }
        }

    }).catch(e=>{
        
        cb(e, null)
        controller.openNotification(window.env.NETWORK_ERROR, null, "error")
        //TODO: ?
    });
}

/**
 * 
 * @param {string} url 
 * @param {object} data
 * @param {import("axios").AxiosRequestConfig} config
 * @param {(err, data)=>{}} cb
 */
function Post(url, data, config={}, cb){

    data = JSON.stringify(data);

    let headers = {
        'Accept-Language': 'fa',
        'Content-Type': 'application/json'
    }

    let token = getCookie(env.TOKEN_KEY);
    if(token){
        headers['Authorization']='Bearer '+getCookie(env.TOKEN_KEY);
    }

    config = {
        method: 'post',
        url,
        headers,
        data
    };

    axios(config)
    .then(function (res) {

        if(env.ENVIRONMENT_MODE==="dev"){
            console.log(res);
        }

        if(res.status == 200){

            if(res.data.response.successful){
                cb(null, res.data);
            }else{
                controller.openNotification(res.data.message, null, "error");
            }

        }
    })
    .catch(function (e) {

        if(e.response && e.response.data){

            let exobj = expetions(e.response.data);

            if(e.response.data.error){

                if(e.response.data.error.subErrors){

                    e.response.data.error.subErrors.forEach(ele=>{

                        if(exobj.showErrorNotif){
                            controller.openNotification(ele.description, null, "error");
                        }
                        
                    });

                }else{

                    if(exobj.showErrorNotif){
                        controller.openNotification(e.response.data.error.message, null, "error");
                    }
                }
            }

            cb(e, e.response.data);

        }else{

            controller.openNotification(window.env.NETWORK_ERROR, null, "error");

            cb(e, null);
        }
    });
}

function expetions(error_data){

    let exobj = {

        showErrorNotif:true
    };

    if(error_data.error.errorCode === window.env.REGISTER_TIME_EXPIRED){

        setTimeout(()=>{

            window.location.href = "/register";

        }, 1500);
        

    }else if(error_data.error.errorCode === window.env.ACCOUNT_EXISTS){

        exobj.showErrorNotif = false;
    }

    return exobj;
}

export default myServer;