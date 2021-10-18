const moment = require("jalali-moment");

/** for multiselect fields
 * @param {string} value 
 * @param {Array} array
 * @returns {Boolean}
 */
export function existsInArray(value, array){

    if(isNaN(Number(value))){

        if(array.indexOf(value) !== -1){
            return true;
        }else{
            return false;
        }

    }else{

        if(value && (array.indexOf(value.toString()) !== -1 || array.indexOf(Number(value)) !== -1)){
            return true;
        }else{
            return false;
        }
    }
}

/** for multiselect fields
 * @param {string} value 
 * @param {Array} array
 * @returns {Array}
 */
export function toggleMultiSelect(value, array){
    let i = array.indexOf(value);
    if(i !== -1){
        array.splice(i, 1);
        return array;
    }else{
        array.push(value);
        return array;
    }
}

//national code validation
export function checkCodeMeli(code)
{
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

export function getMiladiYear(){

    let m_date = new Date();
    let mm = m_date.getMonth() + 1; // getMonth() is zero-based
    let dd = m_date.getDate();
    let date_in_miladi = [m_date.getFullYear(),(mm>9 ? '' : '0') + mm,(dd>9 ? '' : '0') + dd].join('/');
    let fa_date = moment(date_in_miladi,'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
    return fa_date.substr(0, 4);
}

export function getCurrentMiladiDate(params) {
    
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy+"/"+mm+"/"+dd;
    return moment.from(today,"YYYY/MM/DD").locale('fa').format('YYYY/MM/DD')
}