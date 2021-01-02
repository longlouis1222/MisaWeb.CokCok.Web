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
function formatMoney(money) {
    var num = money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    return num;
}

/**
 * Hàm Validate dữ liệu bắt buộc nhập
 * Author: NHLONG (30/12/2020)
 */
$('input[required]').blur(function() {
        // Kiểm tra dữ liệu đã nhập, nếu bỏ trống thì cảnh báo
        var value = $(this).val();
        if (!value) {
            $(this).addClass('border-red');
            $(this).attr('title', 'Trường này không được phép để trống!');
            $(this).attr('validate', false);
        } else {
            $(this).removeClass('border-red');
            $(this).attr('validate', true);
        }
    })
    /**
     * Hàm Validate email đúng định dạng
     * Author: NHLONG (30/12/2020)
     */
$('input[type="email"]').blur(function() {
    // Kiểm tra dữ liệu đã nhập, nếu bỏ trống thì cảnh báo
    var value = $(this).val();
    var testEmail = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!testEmail.test(value)) {
        $(this).addClass('border-red');
        $(this).attr('title', 'Email không hợp lệ !');
        $(this).attr('validate', false);
    } else {
        $(this).removeClass('border-red');
        $(this).attr('validate', true);
    }
})