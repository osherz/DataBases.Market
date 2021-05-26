export function isNumber(num){
    return typeof num === 'number';
}

export function objectToGetParams(obj){
    const params = Object.keys(obj).map(key=>`${key}=${obj[key]}`);
    return params.join('&');
}