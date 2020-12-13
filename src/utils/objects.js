export function paramsToObject(entries) {
    let result = {}
    for(let entry of entries) { // each 'entry' is a [key, value] tupple
      const [key, value] = entry;
      result[key] = value;
    }
    return result;
}

export function parseURLParams() {
    var search = location.search.substring(1);
    return JSON.parse(
        '{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', 
        function(key, value) { return key===""?value:decodeURIComponent(value) }
    );
}

export function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

export default { getKeyByValue, paramsToObject, parseURLParams };