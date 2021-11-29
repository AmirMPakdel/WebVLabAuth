env={

    // app's envirnment type -> "dev" | "prd"
    ENVIRONMENT_MODE: "dev",

    //doamin of your sever
    PATHS:{

        DOMAIN: "http://api.mob-id.com",

        LOGIN_PAGE: "/login",

        REGISTER_PAGE: "/register",

        TERMS_PAGE: "/terms", // قوانین و مقررات

        ABOUT_PAGE: "/about", // درباره ما

        GUIDES_PAGE: "/guides", // راهنمای استفاده
    },
    
    NETWORK_ERROR:"خطا در برقراری ارتباط با سرور",

    // waiting time for sending the applet again in seconds
    SMS_TIMER:120, 

    // scope param sending for login request
    LOGIN_SCOPE: "profile-read,address-read",

    // google recaptcha api key
    G_RECAPTCHA_KEY: "6Lc4X5YcAAAAAPBIe2PeidBpB2aMLv_vaskdQIIK",

    // cookie key for register
    REGISTER_TOKEN_KEY: "__vlb_rgt",

    // cookie key for login
    LOGIN_TOKEN_KEY: "__vlb_lgt",

    // slider objects for register slider
    REGISTER_SLIDERS:[
        {
            image:"/statics/fake_img/register_slide1.jpg",
            title:"عنوان اسلاید اول",
            text:"متن زیر عنوان اسلاید اول"
        },
        {
            image:"/statics/fake_img/register_slide2.jpg",
            title:"عنوان اسلاید دوم",
            text:"متن زیر عنوان اسلاید دوم"
        },
        {
            image:"/statics/fake_img/register_slide3.jpg",
            title:"عنوان اسلاید سوم",
            text:"متن زیر عنوان اسلاید سوم"
        },
    ],

    // important server codes
    SERVER_CODES:{

        //register
        "ACCOUNT_EXISTS": 12800,
        "REGISTER_TIME_EXPIRED": 13400,
        
        //login
        "AUTH_REQ_ALREADY_EXIST": 409,
        
    }
};