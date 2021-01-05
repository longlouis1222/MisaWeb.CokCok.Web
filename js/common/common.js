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
    // var num = money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
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
    /**
     * Hàm định dạng Giới tính
     * @param {Number} gender 
     */
function formatGender(gender) {
    if (gender == 1) {
        return "Nam";
    } else if (gender == 0) {
        return "Nữ";
    } else {
        return "Khác"
    }
}
/**
 * Hàm định dạng Phòng ban
 * @param {String} departmentId Mã Phòng ban
 */
function formatDepartment(departmentId) {
    if (departmentId == "34bd2cef-5026-567c-3b71-153b37881afe") {
        return "Phòng Đào tạo";
    } else if (departmentId == "43a6bdf5-1b6b-451b-3695-2c566fa88632") {
        return "Phòng Công nghệ";
    } else if (departmentId == "64a59a25-2488-54b0-f6b4-c8af08a50cbf") {
        return "Phòng Nhân sự";
    } else {
        return "Phòng Marketting";
    }
}
/**
 * Hàm định dạng Vị trí chức vụ
 * @param {String} positionId Mã Vị trí chức vụ
 */
function formatPosition(positionId) {
    if (positionId == "19165ed7-212e-21c4-0428-030d4265475f") {
        return "Giám đốc";
    } else if (positionId == "3631011e-4559-4ad8-b0ad-cb989f2177da") {
        return "Trưởng phòng";
    } else {
        return "Nhân viên";
    }
}
/**
 * Hàm định dạng Tình trang công việc
 * @param {Number} workStatus Mã Tình trạng công việc
 */
function formatWorkStatus(workStatus) {
    if (workStatus == 1) {
        return "Đang làm việc";
    } else if (workStatus == 2) {
        return "Đang thử việc";
    } else {
        return "Đã nghỉ việc";
    }
}