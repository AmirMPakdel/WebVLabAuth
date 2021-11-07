import { Component } from "react";

/**
 * @typedef {Object} User
 * @property {String} firstName
 * @property {String} lastName
 * @property {String} realEstate
 * @property {String} gender
 * @property {String} mobile
 * @property {String} pic
 * @property {Number} points
 * @property {Boolean} is_owner
 * @property {Boolean} is_agent
 * @property {Boolean} is_vip
 * 
 * @exports User
*/

let controller={

    /**@type {User} */
    user:{mobile:null},

    /**@type {()=>{}} */
    onMobileBack:null,

    //Map
    /**@type {L.Map} */
    map:null,
    onMapClick:(lat, lon)=>{},

    /**
     * @param {String} title 
     * @param {String} description 
     * @param {"error"|"success"|"alert"} icon
     */
    openNotification:(title, description, icon)=>{},

    /**
     * @param {(logedin:Boolean)=>{}} cb 
     */
    check_login:(cb)=>{},
    
    //indexPage
    RightLinkColumn_GetSmaller:(boolean)=>{},
    RightLinkColumn_Hide:(boolean)=>{},

    setDashboardSelectedLink:(selected_link)=>{},

    setHeaderOnBack:()=>{},

    //profileEdit
    onProfileEditPic:()=>{},

    //global
    disableBodyVerticalScroll:()=>{},
    enableBodyVerticalScroll:()=>{},
    disableAllAntDTooltips:()=>{},
    enableAllAntDTooltips:()=>{},
}

export class ControllerComponent extends Component{
    
    componentDidMount(){

        controller.disableBodyVerticalScroll = this.disableBodyVerticalScroll;
        controller.enableBodyVerticalScroll = this.enableBodyVerticalScroll;
        controller.disableAllAntDTooltips = this.disableAllAntDTooltips;
        controller.enableAllAntDTooltips = this.enableAllAntDTooltips;

        this.onResize();
        window.addEventListener("resize", this.onResize);

        this.enableAllAntDTooltips();
    }

    componentWillUnmount(){
        controller.disableBodyVerticalScroll = ()=>{};
        controller.enableBodyVerticalScroll = ()=>{};
        controller.disableAllAntDTooltips = ()=>{};
        controller.enableAllAntDTooltips = ()=>{};
    }

    onResize=()=>{
        // rem
        if (window.innerWidth > 1500) {
            let rem = (window.innerWidth * 16) / 1500;
            document.getElementsByTagName("html")[0].style.fontSize = `${rem}px`;
        } else if (window.innerWidth < 360) {
            let rem = (window.innerWidth * 16) / 362;
            document.getElementsByTagName("html")[0].style.fontSize = `${rem}px`;
        } else {
            document.getElementsByTagName("html")[0].style.fontSize = `${16}px`;
        }
    }

    disableBodyVerticalScroll = ()=>{
        document.getElementsByTagName("body")[0].style.overflowY="hidden";
        document.getElementsByTagName("body")[0].style.overflowX="hidden";
    }

    enableBodyVerticalScroll = ()=>{
        document.getElementsByTagName("body")[0].style.overflowY="visible";
        document.getElementsByTagName("body")[0].style.overflowX="unset";
    }

    disableAllAntDTooltips = ()=>{
        let tooltip = document.getElementsByClassName('ant-tooltip');
        for(let i = 0; i < tooltip.length; i++) {
            tooltip[i].style.display = 'none';
        }
    }

    enableAllAntDTooltips = ()=>{
        let tooltip = document.getElementsByClassName('ant-tooltip');
        for(let i = 0; i < tooltip.length; i++) {
            tooltip[i].style.display = 'block';
        }
    }

    render(){
        return null;
    }
}

export default controller;

export function getUrlPart(order){

    let array = window.location.href.split("/");

    return(array[order+2]);
}

export function getParamByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}