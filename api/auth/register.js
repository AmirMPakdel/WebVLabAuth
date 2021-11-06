import { Component } from "react";
import env from "../../env";
import controller from "../../utils/controller";
import myServer from "../../utils/myServer";
import { checkCodeMeli, email_validation, mobile_validation } from "../../utils/validation";

let regularExpression = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,64}$/;

/**@param {Component} c*/
export function continueRed(c){

    let s = c.state;

    let new_sate = {
        mobile_red:false,
        first_name_red:false,
        last_name_red:false,
        national_code_red:false,
        email_red:false,
        password_red:false,
        password_conf_red:false,
    };
    let can = true;
    if(!mobile_validation(s.mobile)){
        can = false;
        new_sate.mobile_red=true;
    }
    if(!s.first_name || s.first_name.length<3){
        can = false;
        new_sate.first_name_red=true;
    }
    if(!s.last_name || s.last_name.length<3){
        can = false;
        new_sate.last_name_red=true;
    }
    if(!checkCodeMeli(s.national_code)){
        can = false;
        new_sate.national_code_red=true;
    }
    if(!email_validation(s.email)){
        can = false;
        new_sate.email_red=true;
    }
    if(!regularExpression.test(s.password)){
        controller.openNotification("رمز عبور باید حداقل 8 کاراکتر و دارای حداقل یک حرف کوچک و بزرگ انگلیسی، عدد و کاراکترهای خاص باشد", null, "error");
        can = false;
        new_sate.password_red=true;
    }
    if(!s.password.length<8 && s.password!==s.password_conf){
        can = false;
        new_sate.password_conf_red=true;
    }
    
    if(can){
        s.g_recaptcha = grecaptcha.getResponse();
    }

    if(can && !s.rules_accepted){
        can = false;
        controller.openNotification("برای ثبت نام باید قوانین و مقررات  سایت را بپذیرید", null, "error");
    }

    if(can && (!s.g_recaptcha || !s.g_recaptcha.length || s.g_recaptcha.length<10)){
        can = false;
        controller.openNotification("کپچا تایید نشده", null, "error");
    }

    c.setState(new_sate);
    return can;
}

/**@param {Component} c*/
export function register(c){

    c.setState({
        register_btn_loading:true
    });

    let s = c.state;
    let p = {
        phone:s.mobile,
        firstName:s.first_name,
        lastName:s.last_name,
        nationalId: s.national_code,
        "g-recaptcha-response":s.g_recaptcha,
        authenticationRequest: window.location.href,
        email:s.email,
        password:s.password,
        confirmPassword:s.password_conf,
    }

    myServer.Post(myServer.urls.REGISTER_USER, p, {}, (err, data)=>{

        if(!err){

            if(data.response.successful && data.response.trackingId){

                c.state.trackingId = data.response.trackingId;
                c.state.page="opt";
                c.state.same_mobile=false;
                c.state.same_mobile_message="";
                c.state.recreate_confirm_message="";
                c.wcard.style.height="32rem";
                c.right_sec.style.padding="2rem";
                window.scrollTo(null, 0);
    
            }

        }else{

            console.log(data);
            if(data.error.errorCode == window.env.SERVER_CODES.ACCOUNT_EXISTS){

                c.state.trackingId = data.response.trackingId;
                c.state.page="opt";
                c.state.same_mobile=true;
                c.state.same_mobile_message=data.message;
                c.wcard.style.height="32rem";
                c.right_sec.style.padding="2rem";
                window.scrollTo(null, 0);
            }
        }

        c.setState({
            register_btn_loading:false
        })
    });

    // setTimeout(()=>{
    //     let err = false;
    //     let data={
    //         message:t1,
    //         response:{
    //             //successful:true, 
    //             successful:false,
    //             trackingId:"223231232",
    //         }, 
    //         error:{errorCode:12800}
    //     }
    //     ///////////
    //     if(!err){

    //         if(data.response.successful && data.response.trackingId){

    //             c.state.trackingId = data.response.trackingId;
    //             c.state.page="opt";
    //             c.state.same_mobile=false;
    //             c.state.same_mobile_message="";
    //             c.state.recreate_confirm_message="";
    //             c.wcard.style.height="32rem";
    //             c.right_sec.style.padding="2rem";
    //             window.scrollTo(null, 0);

    //         }else if(data.error && data.error.errorCode==12800){

    //             c.state.trackingId = data.response.trackingId;
    //             c.state.page="opt";
    //             c.state.same_mobile=true;
    //             c.state.same_mobile_message=data.message;
    //             c.wcard.style.height="32rem";
    //             c.right_sec.style.padding="2rem";
    //             window.scrollTo(null, 0);
    //         }
    //     }

    //     c.setState({
    //         register_btn_loading:false
    //     })
    //     ///////////

    // },2000);
}

/**@param {Component} c*/
export function registerOptResend(c){

    if(c.request_lock){return};
    c.request_lock = true;

    let p = {
        trackingId:c.state.trackingId
    };
    
    myServer.Post(myServer.urls.REGISTER_OPT_RESEND, p, {}, (err, data)=>{

        if(!err){

            let d = data.response;

            if(d.successful){
                controller.openNotification("کد تایید مجددا ارسال گردید", null, "success");
                c.RegisterVerifyCode.startCountdown();
            }
        }

        c.request_lock = false;
    });

    // setTimeout(()=>{
    //     let err=false;
    //     let data={response:{successful:true}}
    //     /////////
    //     if(!err){

    //         let d = data.response;

    //         if(d.successful){
    //             controller.openNotification("کد تایید مجددا ارسال گردید", null, "success");
    //             c.RegisterVerifyCode.startCountdown();
    //         }
    //     }

    //     c.request_lock = false;
    //     /////////
    // },2000);
    
}

/**@param {Component} c*/
export function registerOptConfirm(c){

    c.setState({opt_confirm_btn_loading:true});

    let p={
        trackingId:c.state.trackingId,
        otp:c.state.opt_code,
    }

    myServer.Post(myServer.urls.REGISTER_OPT_CONFIRM, p, {}, (err,data)=>{

        if(!err){

            let d = data.response;

            if(d.successful){

                if(d.status==="DONE"){

                    //controller.openNotification(data.message, null, "success");

                    setTimeout(()=>{
                        window.location.href=d.url;
                    },500);

                }else{

                    controller.openNotification(data.message, null, "alert");
                }
            }
        }

        c.setState({opt_confirm_btn_loading:false});
    });

    // setTimeout(()=>{
    //     let err = false;
    //     let data = {message:"پیغامی برای کاربر", response:{successful:true, status:"DONE"}}
    //     /////////
    //     if(!err){

    //         let d = data.response;

    //         if(d.successful){

    //             if(d.status==="DONE"){

    //                 controller.openNotification(data.message, null, "success");

    //                 setTimeout(()=>{
    //                     window.location.href=d.urls;
    //                 },500);

    //             }else{

    //                 controller.openNotification(data.message, null, "alert");
    //             }
    //         }
    //     }

    //     c.setState({opt_confirm_btn_loading:false});
    //     /////////

    // },2000)
}

/**@param {Component} c*/
export function recreateOptConfirm(c){

    c.setState({opt_confirm_btn_loading:true});

    let p={
        trackingId:c.state.trackingId,
        otp:c.state.opt_code,
    }

    myServer.Post(myServer.urls.RECREATE_OPT_CONFIRM, p, {}, (err,data)=>{

        if(!err){

            let d = data.response;
            if(d.successful){
                c.state.old_user = {
                    phone: d.phone,
                    nationalId: d.nationalId,
                    firstname: d.firstname,
                    lastname: d.lastname,
                }
                c.state.recreate_confirm_message = data.message;
                c.state.page = "recreate";
            }
        }

        c.setState({opt_confirm_btn_loading:false});
    });

    // setTimeout(()=>{
    //     let err = false;
    //     let data = {
    //         message:t1, 
    //         response:{
    //             successful:true, 
    //             status:"DONE",
    //             phone:"09118015081",
    //             nationalId:"2581095598",
    //             firstname:"علی",
    //             lastname:"گل محمدی",
    //         }
    //     }
    //     /////////
    //     if(!err){

    //         let d = data.response;
    //         if(d.successful){
    //             c.state.old_user = {
    //                 phone: d.phone,
    //                 nationalId: d.nationalId,
    //                 firstname: d.firstname,
    //                 lastname: d.lastname,
    //             }
    //             c.state.recreate_confirm_message = data.message;
    //             c.state.page = "recreate";
    //         }
    //     }

    //     c.setState({opt_confirm_btn_loading:false});
    //     /////////
    // },2000)
}

/**@param {Component} c*/
export function recreateConfirm(c){

    c.setState({recreate_btn_loading:true});

    let p = {
        trackingId:c.state.trackingId
    };

    myServer.Post(myServer.urls.RECREATE_CONFIRM, p, {}, (err, data)=>{

        if(!err){

            let d = data.response;

            if(d.successful){

                if(d.status==="DONE"){

                    //controller.openNotification(data.message, null, "success");

                    setTimeout(()=>{
                        window.location.href=d.url;
                    },500);

                }else{

                    controller.openNotification(data.message, null, "alert");
                }
            }
        }
    });

    // setTimeout(()=>{
    //     let err= false;
    //     let data = {message:"پیغامی برای کاربر", response:{successful:true, status:"DONE"}}
    //     /////////
    //     if(!err){

    //         let d = data.response;

    //         if(d.successful){

    //             if(d.status==="DONE"){

    //                 controller.openNotification(data.message, null, "success");

    //                 setTimeout(()=>{
    //                     window.location.href=d.urls;
    //                 },500);

    //             }else{

    //                 controller.openNotification(data.message, null, "alert");
    //             }
    //         }
    //     }

    // },2000)
}

const t1 = `توسط اسلج‌همر گیمز توسعه داده می‌شود، دارای حالت‌های داستانی، چند نفره و زامبی خواهد بود که در اطراف اروپا و اقیانوس آرام هنگام جنگ جهانی دوم اتفاق می‌افتد و داستان آن حول محور تولد نیروهای ویژه‌ی ایالات متحده است.`