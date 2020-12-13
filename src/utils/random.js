export function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomItem(itemList) {
    return itemList[Math.floor(Math.random() * itemList.length)];
}

export default {getRandomFloat, getRandomInt, getRandomItem};