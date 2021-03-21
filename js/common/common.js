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

        return year + '-' + month + '-' + day;
    }
}
/**
 * Hàm định dạng tiền tệ    
 * @param {Number} money Số tiền
 * Author: NHLONG (07/12/2020)
 */
function formatMoney(money) {
    if (money == null) {
        return '';
    } else {
        var num = money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
        // var num = money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        return num;
    }
}

/**
 * Hàm Validate dữ liệu bắt buộc nhập
 * Author: NHLONG (30/12/2020)
 */
$('input[required]').blur(function () {
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
$('input[type="email"]').blur(function () {
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

function generateTable(res) {
    //Lấy thông tin các cột dữ liệu
    var threads = $('#tbListData thead th');
    $.each(res, function (index, obj) {
        var tr = $(`<tr> </tr>`);
        //Thêm cho thẻ tr 1 cái id = id của employee
        $(tr).attr('idtr', obj["EmployeeId"]);
        $.each(threads, function (index, th) {
            //Lấy thông tin dữ liệu sẽ Map tương ứng với các cột 
            var fieldName = $(th).attr('fieldName')
            var value = obj[fieldName];
            var formatType = $(th).attr('formatType')
            var td = $(`<td>` + `<div title="` + value + `"></div>` + `</td>`);
            switch (formatType) {
                case "Gender":
                    value = formatGender(value);
                    break;
                case "ddmmyyyy":
                    value = formatDate(value);
                    break;
                case "PositionName":
                    value = formatPosition(value);
                    break;
                case "DepartmentName":
                    value = formatDepartment(value);
                    break;
                case "Money":
                    value = formatMoney(value);
                    td.addClass('text-align-right');
                    break;
                case "WorkStatusName":
                    value = formatWorkStatus(value);
                    break;
                default:
                    break;
            }
            if (fieldName == 'SelectedEmployee') {
                var tagcheckbox = $(`<input type="checkbox" style="width:13px;height:13px">`);
                $(tagcheckbox).attr('value', obj["EmployeeId"]);
                $(td).append(tagcheckbox);
            } else {
                $(td).append(value);
            }
            $(tr).append(td);
        })
        $('#tbListData tbody').append(tr);
    })
}

//làm khung chọn trang dữ liệu
function pagination(current, last) {
    var delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeDots = [],
        l;
    for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || i >= left && i < right) {
            range.push(i);
        }
    }
    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeDots.push('...');
            }
        }
        rangeDots.push(i);
        l = i;
    }
    return rangeDots;
}

function loadNumberOfPage() {
    $('.m-btn-list-page').empty();
    var rangeDots = pagination(currentPage, numberOfPage);
    var pageNumber;
    for (var i = 0; i < rangeDots.length; i++) {
        if (rangeDots[i].toString() !== '...') {
            if (currentPage == rangeDots[i]) {
                pageNumber = `<button onclick="selectedPage(${rangeDots[i]})" class="btn-pagenumber btn-pagenumber-selected">${rangeDots[i]}</button>`;
                $('.m-btn-list-page').append(pageNumber);
            } else {
                pageNumber = `<button onclick="selectedPage(${rangeDots[i]})" class="btn-pagenumber">${rangeDots[i]}</button>`;
                $('.m-btn-list-page').append(pageNumber);
            }
        } else {
            pageNumber = `<button class="btn-pagenumber">${rangeDots[i]}</button>`;
            $('.m-btn-list-page').append(pageNumber);
        }
    }
}