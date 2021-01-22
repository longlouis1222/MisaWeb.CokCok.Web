$(document).ready(function () {
    dialog = $(".dialog__content").dialog({
        autoOpen: false,
        width: 680,
        // height: 590,
        modal: true,
    });
    warning = $(".warning__content").dialog({
        autoOpen: false,
        width: 500,
        modal: true
    });
    warning_success = $(".warning__content--success").dialog({
        autoOpen: false,
        width: 500,
        modal: true
    });
    loadData();
    initEvens();
    showImagePreview();
})

/**
 * Thực hiện load dữ liệu
 * Author: NHLONG (07/12/2020)
 * */
function loadData() {
    // alert(1);
    // load dữ liệu:
    // 1. Bước 1: gọi service lấy dữ liệu: (api.manhnv.net/api/employees)
    //debugger;
    $.ajax({
        // url: 'http://api.manhnv.net/api/employees',
        url: 'https://localhost:44376/api/Employees',
        method: 'GET',
    }).done(function (res) {
        console.log(res);
        //    debugger;
        // 2. Bước 2: xử lý dữ liệu

        // 3. Bước 3: Build html và append lên UI:
        $('#tbListData tbody').empty();
        for (var i = 0; i < res.length; i++) {
            // console.log(res[i]);
            var DOB = formatDate(res[i].DateOfBirth);
            var Salary = formatMoney(res[i].Salary);
            var GenderName = formatGender(res[i].Gender);
            var DepartmentName = formatDepartment(res[i].DepartmentId);
            var PositionName = formatPosition(res[i].PositionId);
            var WorkStatusName = formatWorkStatus(res[i].WorkStatus);
            var trHtml = $(`<tr class="el-table__row first" idtr="${res[i].EmployeeId}">
                            <td rowspan="1" colspan="1"><div class="cell" style="padding-top: 3px"><input value="${res[i].EmployeeId}" type="checkbox" style="width: 13px;height: 13px;"></div></td>
                            <td rowspan="1" colspan="1" style="width: 100px;"><div class="cell">${res[i].EmployeeCode}</div></td>
                            <td rowspan="1" colspan="1" style="width: 143px;"><div class="cell">${res[i].FullName}</div></td>
                            <td rowspan="1" colspan="1" style="width: 58px;"><div class="cell">${/* res[i]. */GenderName || ""}</div></td>
                            <td rowspan="1" colspan="1" style="width: 100px;"><div class="cell text-align-center">${DOB}</div></td>
                            <td rowspan="1" colspan="1" style="width: 119px;"><div class="cell">${res[i].PhoneNumber}</div></td>
                            <td rowspan="1" colspan="1" style="width: 192px;"><div class="cell" title="${res[i].Email}">${res[i].Email}</div></td>
                            <td rowspan="1" colspan="1" style="width: 72px;"><div class="cell">${/* res[i]. */PositionName || ""}</div></td>
                            <td rowspan="1" colspan="1" style="width: 232px;"><div class="cell">${/* res[i]. */DepartmentName || ""}</div></td>
                            <td rowspan="1" colspan="1" style="width: 55px;"><div class="cell text-align-right">${/* res[i]. */Salary || ""}</div></td>
                            <td rowspan="1" colspan="1" style="width: 98px;"><div class="cell">${/* res[i]. */WorkStatusName || ""}</div></td>
                            <td rowspan="1" colspan="1" style="width: 32px;"><div class="cell"></div></td>
                        </tr>`);
            $('#tbListData >tbody:last-child').append(trHtml);
        }
    }).fail(function (res) {

    })
}

/**
 * Hiệu ứng đổi màu cho Element vừa Select
 * Author: NHLONG (07/12/2020)
 * */
function theRowSelected() {
    $(this).addClass('row-selected');
    $(this).siblings().removeClass('row-selected');
}
/**
 * Hàm khởi tạo các sự kiện
 * Author: NHLONG (07/12/2020)
 */
function initEvens() {
    me = this;
    var notify;
    var isUpdated = false;
    var idEmployeeSelected = 0;
    // Gán các sự kiện:
    $('#btnAdd').click(function () {
        isUpdated = false;
        ResetDialog();
        LoadEmployeeCode();
        dialog.dialog('open');
    })

    $('.icon-exit').click(function () {
        dialog.dialog('close');
    })

    $('#btnCancel').click(function () {
        dialog.dialog('close');
    })

    $('.btnCancel2').click(function () {
        warning.dialog('close');
        warning_success.dialog('close');
    })
    // Save or Update Data
    $('#btnSave').click(function () {
        // Validate dữ liệu
        var inputValidates = $('input[required], input[email]');
        $.each(inputValidates, function (index, input) {
            $(input).trigger('blur');
        })
        var inputInValids = $('input[validate = false]');
        if (inputInValids && inputInValids.length > 0) {
            alert('Dữ liệu không hợp lệ vui lòng kiểm tra lại !');
            inputInValids[0].focus();
            return;
        }
        // Thu thập thông tin dữ liệu đc nhập -> build thành object
        var employee = {
            // "EmployeeId": idEmployeeSelected,
            "EmployeeCode": $('#em-code').val(),
            "FullName": $('#em-name').val(),
            "DateOfBirth": $('#em-birth').val(),
            "Gender": $('#em-gender').find(':selected').val(),
            "IdentityCardNumber": $('#em-identification').val(),
            "IdentityDate": $('#em-identifyDate').val(),
            "IdentityPlace": $('#em-identifyPlace').val(),
            "Email": $('#em-email').val(),
            "PhoneNumber": $('#em-phone').val(),
            "PositionId": $('#em-position').find(':selected').val(),
            "DepartmentId": $('#em-department').find(':selected').val(),
            "TaxCode": $('#em-tax').val(),
            "Salary": $('#em-salary').val(),
            "DateJoin": $('#em-dateJoin').val(),
            "WorkStatus": $('#cbxWorkStatus').find(':selected').val()
        }
        console.log(employee);
        // alert("success");
        // Gọi service tương ứng thực hiện dữ liệu

        if (isUpdated == true) {
            $.ajax({
                url: 'https://localhost:44376/api/Employees',
                method: 'PUT',
                data: JSON.stringify(employee),
                contentType: 'application/json'
            }).done(function (res) {
                // Sau khi lưu thành công thì: 
                // + Đưa ra thông báo thành công
                // + ẩn form chi tiết
                // + Load lại dữ liệu
                notify = 'Bạn đã cập nhật thành công !!!';
                $('#text-notify').text(notify);
                warning_success.dialog('open');
                dialog.dialog('close');
                me.loadData();
            }).fail(function (res) {
                var messenger = res['responseJSON']['Messenger'];
                alert(messenger);
            })
        } else {
            // employee.EmployeeId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
            $.ajax({
                url: 'https://localhost:44376/api/Employees',
                method: 'POST',
                data: JSON.stringify(employee),
                contentType: 'application/json'
            }).done(function (res) {
                // Sau khi lưu thành công thì: 
                // + Đưa ra thông báo thành công
                // + ẩn form chi tiết
                // + Load lại dữ liệu
                notify = 'Bạn đã thêm mới thành công !!!';
                $('#text-notify').text(notify);
                warning_success.dialog('open');
                dialog.dialog('close');
                me.loadData();
            }).fail(function (res) {
                var messenger = res['responseJSON']['Messenger'];
                $('#text-notify').text(messenger);
                warning_success.dialog('open');
            })
        }
    })

    // Hiển thị thông tin khi dbl một bản ghi trên danh sách thông tin
    $('#tbListData tbody').on('dblclick', 'tr', function () {
        // load dữ liệu chi tiết:
        ResetDialog();
        isUpdated = true;
        idEmployeeSelected = $(this).attr("idtr");
        console.log(idEmployeeSelected);
        $.ajax({
            url: 'https://localhost:44376/api/Employees/' + idEmployeeSelected,
            method: 'GET',
            data: null,
            dataType: 'json',
            contentType: 'application/json'
        }).done(function (res) {
            $('#em-code').val(res[0]["EmployeeCode"]);
            $('#em-name').val(res[0]['FullName']);
            // $('#em-birth').val(res[0]['DateOfBirth']);
            // $('#em-identification').val(res[0]['IdentityCardNumber']);
            // $('#em-identifyDate').val(res[0]['IdentityDate']);
            // $('#em-identifyPlace').val(res[0]['IdentityPlace']);
            // $('#em-email').val(res[0]['Email']);
            // $('#em-phone').val(res[0]['PhoneNumber']);
            // $('#em-tax').val(res[0]['TaxCode']);
            // $('#em-salary').val(res[0]['Salary']);
            // $('#em-dateJoin').val(res[0]['DateJoin']);
            // var DepartmentStringSelected = "option[value='" + res[0]['EmployeeDepartmentId'] + "']";
            // $('#em-department').find(DepartmentStringSelected).attr('selected', 'selected');
            // var PositionStringSelected = "option[value='" + res[0]['EmployeePositionId'] + "']";
            // $('#em-position').find(PositionStringSelected).attr('selected', 'selected');
            // var GenderNumberSelected = "option[value='" + res[0]['Gender'] + "']";
            // $('em-gender').find(GenderNumberSelected).attr('selected', 'selected');
            // var WorkstatusNumberSelected = "option[value='" + res[0]['WorkStatus'] + "']";
            // $('#cbxWorkStatus').find(WorkstatusNumberSelected).attr('selected', 'selected');

        }).fail(function (res) {
            alert('nope');
        })
        // Hiển thị dialog thông tin chi tiết:
        dialog.dialog('open');
    })

    // Refresh Data
    $('#btnRefresh').click(function () {
        // dialog.dialog('close');
        me.loadData();
    })
    // Effect Selection and Delete Elements
    $("#tbListData tbody").on('click', 'tr', me.theRowSelected);

    $('#btnDelete').click(function () {
        warning.dialog('open');
        $('#btnOk').click(function () {
            var values = [];
            $('tr input:checked').each(function () {
                values.push($(this).attr('value'));
            });
            if (values.length == 0) {
                notify = 'Bạn chưa chọn bất kỳ nhân viên nào !!!';
                $('#text-notify').text(notify);
                warning_success.dialog('open');
                warning.dialog('close');
            } else {
                $.each(values, function (index, value) {
                    $.ajax({
                        url: 'https://localhost:44376/api/Employees/' + value,
                        method: 'DELETE',
                        data: null,
                        dataType: 'json',
                        contentType: 'application/json'
                    }).done(function (res) {
                        // Sau khi lưu thành công thì: 
                        // + Đưa ra thông báo thành công
                        warning.dialog('close');
                        notify = 'Bạn đã thực hiện Xóa thành công !!!';
                        $('#text-notify').text(notify);
                        warning_success.dialog('open');
                        // + Load lại dữ liệu
                        me.loadData();
                    }).fail(function (res) {
                        warning.dialog('close');
                        alert('Xóa thất bại !');
                    })
                })
            }
        })
    })

    $('#btnSearch').on('click', function () {
        me.btnSearchOnclick();
    })
}
function ResetDialog() {
    $('#em-code').val('');
    $('#em-name').val('');
    $('#em-birth').val('');
    $('#em-identification').val('');
    $('#em-identifyDate').val('');
    $('#em-identifyPlace').val('');
    $('#em-email').val('');
    $('#em-phone').val('');
    $('#em-tax').val('');
    // $('#em-salary').val('');
    $('#em-dateJoin').val('');
    // $('#cbxWorkStatus').val('');
}

function LoadEmployeeCode() {
    $.ajax({
        url: 'https://localhost:44376/api/Employees',
        method: 'GET',
        data: null,
        dataType: 'json',
        contentType: 'application/json'
    }).done(function (res) {
        var strmax = res[0]["EmployeeCode"];
        var max = strmax.substring(3, strmax.length);
        // console.log(max);
        // var newEmployeeCode = Number(max) + 1;
        var newEmployeeCode;
        if (max > 0 && max <= 9) {
            newEmployeeCode = '0000' + (Number(max) + 1);
        } else if (max >= 10 && max <= 99) {
            newEmployeeCode = '000' + (Number(max) + 1);
        } else if (max >= 100 && max <= 999) {
            newEmployeeCode = '00' + (Number(max) + 1);
        } else if (max >= 1000 && max <= 9999) {
            newEmployeeCode = '0' + (Number(max) + 1);
        } else {
            newEmployeeCode = Number(max) + 1;
        }
        $('#em-code').val("NV-" + newEmployeeCode);
    }).fail(function (res) {
    })
}

function searchDerpartment() {
    $.ajax({
        url: 'https://localhost:44376/api/EmployeeDepartments',
        method: 'GET',
        async: false,
        dataType: 'json',
        connectType: 'application/json'
    }).done(function (res) {
        console.log(res);
        $.each(res, function (index, item) {
            var option = $(`<option value=` + item['DepartmentId'] + `>` + item['DepartmentName'] + `</option>`);
            $('#cbxDepartment').append(option);
        })
    }).fail(function (res) {
        alert('Tìm kiến thất bại !');
    })
}

function searchPosition() {

    $.ajax({
        url: 'https://localhost:44376/api/EmployeePositions',
        method: 'GET',
        async: false,
        dataType: 'json',
        connectType: 'application/json'
    }).done(function (res) {
        console.log(res);
        $.each(res, function (index, item) {
            var option = $(`<option value=` + item['PositionId'] + `>` + item['PositionName'] + `</option>`);
            $('#cbxPosition').append(option);
        })
    }).fail(function (res) {
        alert('Tìm kiến thất bại !');
    })

}

function btnSearchOnclick() {
    var inputSearch = $('#inputTxt').val();
    var DepartmentId = $('.filter-left #cbxDepartment option:selected').val();
    var PositionId = $('.filter-left #cbxPosition option:selected').val();
    console.log(inputSearch);
    console.log(DepartmentId);
    console.log(PositionId);
    $('#tbListData tbody').empty();
    $.ajax({
        url: 'https://localhost:44376/api/Employees/search?ContainInfo=' + inputSearch + '&DepartmentId=' + DepartmentId + '&PositionId=' + PositionId,
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json'
    }).done(function (res) {
        generateTable(res);
        var count = $('#tbListData tbody tr');
        if (count.length == 0) {
            notify = 'Không tìm thấy thông tin nhân viên này trong hệ thống !!!';
            $('#text-notify').text(notify);
            warning_success.dialog('open');
        }
    }).fail(function (res) {
        alert('Tìm kiến thất bại !');
    })
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

function showImagePreview() {
    $('.default-avt').click(function () {
        $('#avtUpdate').click();
    });

    $('#avtUpdate').change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('.default-avt').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0])
        }
    });
}