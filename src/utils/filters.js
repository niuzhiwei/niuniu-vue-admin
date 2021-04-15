function currency(money) {
    if (money && money !== null) {
        money = String(money);
        var left = money.split('.')[0],
            right = money.split('.')[1];
        right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00';
        var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
        return (Number(money) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right;
    } else if (money === 0) { // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
        return '0.00';
    } else {
        return '';
    }

}

function formatDate(value) {
    var date = new Date(value);
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = (date.getDate()).toString().padStart(2, '0');
    var hours = date.getHours();
    var minutes = date.getMinutes();
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
}

export default {
    currency,
    formatDate
}