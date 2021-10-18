export const mobile_input_filter = function(t){

    if(typeof t !== "string") return "";

    let new_t = t.match(/^[0-9]+$/);
    
    if(new_t && new_t.join){
        return new_t.join("");
    }

    return false;
}

export const persian_input_valid = function(t){

    let p = /^[\u0600-\u06FF\s]+$/;
    if (!p.test(str)) {
        return false;
    }else{
        return true;
    }
}

export const mobile_validation = function(t){

    if(typeof t !== "string") return false;

    if(t.length >= 100) return false;

    if(t.length>=11 && t.length<=13) return true;
}

export const password_validation = function(t){

    if(typeof t !== "string") return false;

    if(t.length >= 100) return false;

    if(t.length >= 8) return true;
}

export function checkCodeMeli(code){
   var L=code.length;
   if(L<8 || parseInt(code,10)==0) return false;
   code=('0000'+code).substr(L+4-10);
   if(parseInt(code.substr(3,6),10)==0) return false;
   var c=parseInt(code.substr(9,1),10);
   var s=0;
   for(var i=0;i<9;i++)
      s+=parseInt(code.substr(i,1),10)*(10-i);
   s=s%11;
   return (s<2 && c==s) || (s>=2 && c==(11-s));
   return true;
}

export function email_validation(t) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(t))
  {
    return (true)
  }
    return (false)
}