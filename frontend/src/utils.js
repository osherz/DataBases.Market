export function isNumber(num) {
    return typeof num === 'number';
}

export function objectToGetParams(obj) {
    const params = Object.keys(obj).map(key => `${key}=${obj[key]}`);
    return params.join('&');
}

/**
 * 
 * @param {Array} ls 
 * @param {*} value 
 */
export function removeFromList(ls, value) {
    const index = ls.indexOf(value);
    if (index >= 0) {
        ls.splice(index, 1);
    }
}

/**
 * 
 * @param {*} milisec 
 * @returns Date string
 */
export function dateNumberToString(milisec){
    const date = new Date(milisec);
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}