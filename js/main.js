//Cookie関連



function setCookie(key, value, days){
    let expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${key}=${value};expires=${expires.toUTCString()};path=/`;
}


function getCookie(key, valueWhenNotFound = null){
    let keyEQ = key + "=";
    return document.cookie.split(';')
            .map(a => a.trim())
                .find(c => c.startsWith(keyEQ))
                ?.substring(keyEQ.length) || valueWhenNotFound;
}


function numToBit(n, mask){
    if (n == 0) return n;

    while ((mask & 0b1) != 0b1){
        n = n << 1;
        mask= mask >> 1;
        if (mask == 0b0) return NaN;
    }    
    return n;
}


function bitToNum(n, mask){
    while ((mask & 0b1) != 0b1){
        n = n >> 1;
        mask = mask >> 1;
        if (mask == 0b0) return NaN;
    }
    return n & mask;
}

    
function bitMatch(n, mask){
    return (n & mask) == mask;
}
