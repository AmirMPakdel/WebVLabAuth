import env from "../env";

export const SMS_TIMER = env.SMS_TIMER;

export function numberToTime(num){

    let sec = num % 60;
    let min = Math.floor((num % 3600) / 60);
    let sec_t = sec>9?sec:`0${sec}`;
    let min_t = min>9?min:`0${min}`;
    if(num < 3600){
        return min_t+":"+sec_t;
    }else{
        let hour = Math.floor(num / 3600);
        let hour_t = hour>9?hour:`0${hour}`;
        return hour_t+":"+min_t+":"+sec_t;
    }
}