const domain = window.env.DOMAIN;
import axios from "axios";
import env from "../env";
import controller from "./controller";
import { getCookie } from "./cookie";

const myServer = {

    urls:{
        DOMAIN:domain,

        //register
        REGISTER_USER:domain+"/user/register",
        REGISTER_OPT_RESEND:domain+"/opt/resend",
        REGISTER_OPT_CONFIRM:domain+"/opt/confirm",
        RECREATE_OPT_CONFIRM:domain+"/recreate/opt/confirm",
        RECREATE_CONFIRM:domain+"/recreate/confirm",

        //login
        LOGIN_USER:domain+"/oauth/authenticate",
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

    if(!config.noAuthorization){
        config.headers={
            'Authorization': "Bearer "+getCookie(env.TOKEN_KEY),
            'Accept-Language': "fa",
        }
    }

    axios.post(url, data, config).then((res)=>{
                
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

    }).catch((e)=>{

        cb(e, null)
        controller.openNotification(window.env.NETWORK_ERROR, null, "error")

        //TODO: ?
    });
}

export default myServer;