import axios from "axios";
import controller from "./controller";
import { getCookie } from "./cookie";

const myServer = {

    urls:{
        //register
        REGISTER_USER:"/registration/user/register",
        REGISTER_OPT_RESEND:"/registration/user/otp/resend",
        REGISTER_OPT_CONFIRM:"/registration/user/otp/confirm",
        RECREATE_OPT_CONFIRM:"/registration/user/recreate/otp/confirm",
        RECREATE_CONFIRM:"/registration/user/recreate/confirm",

        //login
        LOGIN_USER:"/authorization/oauth/authenticate",
        LOGIN_WAITING:"/authorization/oauth/waitting-page",
        LOGIN_REDIRECT:"/authorization/oauth/rediret/client-page",
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
function Get(url, config={}, cb){

    let headers = {
        'Accept-Language': 'fa',
    }

    if(config.token){

        let token = getCookie(env[config.token.key]);
        headers['Authorization']='Bearer '+ token;
    }

    let domain = env.PATHS.DOMAIN;

    if(config.domain !== undefined){
    
        domain = config.domain;
    }

    config = {
        method: "get",
        url: domain+url,
        headers,
    }

    axios(config)
    .then(res=>{

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
        controller.openNotification(env.NETWORK_ERROR, null, "error")
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

    if(config.token){

        let token = getCookie(env[config.token.key]);
        headers['Authorization']='Bearer '+ token;
    }

    let domain = env.PATHS.DOMAIN;

    if(config.domain !== undefined){
    
        domain = config.domain;
    }

    config = {
        method: 'post',
        url: domain+url,
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

            controller.openNotification(env.NETWORK_ERROR, null, "error");

            cb(e, null);
        }
    });
}

function expetions(error_data){

    let exobj = {

        showErrorNotif:true
    };

    if(error_data.error.errorCode === env.SERVER_CODES.REGISTER_TIME_EXPIRED){

        setTimeout(()=>{

            window.location.href = "/register";

        }, 1500);
        

    }else if(error_data.error.errorCode === env.SERVER_CODES.ACCOUNT_EXISTS){

        exobj.showErrorNotif = false;
    }

    return exobj;
}

export default myServer;