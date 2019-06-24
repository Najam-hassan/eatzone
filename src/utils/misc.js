export function guid () {
    function s4 () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return `${s4() +
        s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}_${Date.now()}`;
}

export function conversion (value) {
    return Number.parseFloat(value / 1000).toFixed(2)
}