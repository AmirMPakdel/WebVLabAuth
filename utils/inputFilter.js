import { perisanNum2eng } from "./PersianNum";


export function onlyPersianChar(str){

    if(str==="" || str===null || str===undefined){
        return true;
    }

    let p = /^[\u0600-\u06FF\s]+$/;

    if (!p.test(str)) {
        return false;
    }

    return true;
}

export function onlyNumber(str){

    if(str==="" || str===null || str===undefined){
        return true;
    }

    let num = perisanNum2eng(str); 
    num = Number(num);

    if(isNaN(num)){
        return false;
    }
    
    return true;
}

export function persianWithNum(str){

    if(str==="" || str===null || str===undefined){
        return true;
    }

    let p = /^[\u0600-\u06FF\s 0-9]+$/;

    if (!p.test(str)) {
        return false;
    }

    return true;
}