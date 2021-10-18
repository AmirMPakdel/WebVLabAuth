
export const listeners = {

    onUrlPushState:[],
}

export function addListener(name, func){

    listeners[name].push(func);
}

export function removeListenr(name, func){

    listeners[name].forEach((e,i) => {
        
        if(e === func){
            listeners[name].splice(i, 1);
        }
    });
}

export function execute(name, params){

    listeners[name].forEach(func => {
        
        if(typeof func === "function"){
            func(params);
        }
    });
}

