/**
 * Hàm thực hiện định dạng ngày tháng (ngày/tháng/năm)
 * @param {Number} date ngày truyền vào
 * Author: NHLONG (07/12/2020)
 */
function formatDate(date) {
    var date = new Date(date);
    if (Number.isNaN(date.getTime())) {
        return "";
    } else {
        // lấy ngày:
        var day = date.getDate();
        // lấy tháng:
        var month = date.getMonth() + 1;
        // lấy năm:
        var year = date.getFullYear();
        // Toán tử 3 ngôi
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;

        return day + '/' + month + '/' + year;
    }
}
/**
 * Hàm định dạng tiền tệ    
 * @param {Number} money Số tiền
 * Author: NHLONG (07/12/2020)
 */
// function formatMoney(money){
//     var num = money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
//     return num;
// }