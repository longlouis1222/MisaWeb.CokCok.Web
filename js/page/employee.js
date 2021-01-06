$(document).ready(function() {
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
    })
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
    }).done(function(res) {
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
            var trHtml = $(`<tr class="el-table__row first">
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
    }).fail(function(res) {

    })
}

/**
 * Thực hiện gán các sự kiện
 * Author: NHLONG (07/12/2020)
 * */
function theRowSelected() {
    $(this).addClass('row-selected');
    $(this).siblings().removeClass('row-selected');
    Id = $(this).data('Id');
    console.log(Id);
}


function initEvens() {
    me = this;

    // Gán các sự kiện:
    $('#btnAdd').click(function() {
        dialog.dialog('open');
    })

    $('.icon-exit').click(function() {
        dialog.dialog('close');
    })

    $('#btnCancel').click(function() {
        dialog.dialog('close');
    })

    $('#btnCancel2').click(function() {
        warning.dialog('close');
    })

    $('#btnSave').click(function() {
        // Validate dữ liệu
        var inputValidates = $('input[required], input[email]');
        $.each(inputValidates, function(index, input) {
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
        $.ajax({
            // url: 'http://api.manhnv.net/api/employees',
            url: 'https://localhost:44376/api/Employees',
            method: 'POST',
            data: JSON.stringify(employee),
            contentType: 'application/json'
        }).done(function(res) {
            // Sau khi lưu thành công thì: 
            // + Đưa ra thông báo thành công
            // + ẩn form chi tiết
            // + Load lại dữ liệu
            alert('Thêm mới thành công !');
            dialog.dialog('close');
            me.loadData();
        }).fail(function(res) {
            alert('Thông tin đã tồn tại trên hệ thống Tình yêu nhé. Vui lòng nhập lại !');
        }.bind(this))
    })

    $('#btnRefresh').click(function() {
        // dialog.dialog('close');
        me.loadData();
    })
    $("#tbListData tbody").on('click', 'tr', me.theRowSelected);

    $('#btnDelete').click(function() {
        warning.dialog('open');

        $('#btnOk').click(function() {
            $.ajax({
                // url: 'http://api.manhnv.net/api/employees',
                url: 'https://localhost:44376/api/Employees/' + 'Id',
                method: 'DELETE',
                // data: JSON.stringify(employee),
                dataType: 'json',
                contentType: 'application/json'
            }).done(function(res) {
                // Sau khi lưu thành công thì: 
                // + Đưa ra thông báo thành công
                alert('Xóa thành công !');
                // + Load lại dữ liệu
                me.loadData();
            }).fail(function(res) {
                warning.dialog('close');
                alert('Xóa thất bại !');
            })
        })
    })

    // $('#btnUpdate').click(function() {
    //     warning.dialog('open');
    //     $.ajax({
    //         // url: 'http://api.manhnv.net/api/employees',
    //         url: 'https://localhost:44376/api/Employees/' + recordId,
    //         method: 'DELETE',
    //         data: JSON.stringify(employee),
    //         dataType: 'json',
    //         contentType: 'application/json'
    //     }).done(function(res) {
    //         // Sau khi lưu thành công thì: 
    //         // + Đưa ra thông báo thành công
    //         alert('Xóa thành công !');
    //         // + Load lại dữ liệu
    //         me.loadData();
    //     }).fail(function(res) {
    //         // debugger
    //     }.bind(this))
    // })
    // Hiển thị thông tin khi dbl một bản ghi trên danh sách thông tin
    $('#tbListData').on('dblclick', 'tr', function() {
        // load dữ liệu chi tiết:

        // Hiển thị dialog thông tin chi tiết:
        dialog.dialog('open');
    })

    $('#btnSearch').on('click', function() {
        me.btnSearchOnclick();
    })
}

function searchDerpartment() {
    $.ajax({
        url: 'https://localhost:44376/api/EmployeeDepartments',
        method: 'GET',
        async: false,
        dataType: 'json',
        connectType: 'application/json'
    }).done(function(res) {
        console.log(res);
        $.each(res, function(index, item) {
            var option = $(`<option value=` + item['DepartmentId'] + `>` + item['DepartmentName'] + `</option>`);
            $('#cbxDepartment').append(option);
        })
    }).fail(function(res) {
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
    }).done(function(res) {
        console.log(res);
        $.each(res, function(index, item) {
            var option = $(`<option value=` + item['PositionId'] + `>` + item['PositionName'] + `</option>`);
            $('#cbxPosition').append(option);
        })
    }).fail(function(res) {
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
    }).done(function(res) {
        generateTable(res);
        var count = $('#tbListData tbody tr');
        if (count.length == 0) {
            alert("Không tìm thấy thông tin nhân viên này trong hệ thống !");
        }
    }).fail(function(res) {
        alert('Tìm kiến thất bại !');
    })
}

function generateTable(res) {
    //Lấy thông tin các cột dữ liệu
    var threads = $('#tbListData thead th');
    $.each(res, function(index, obj) {
        var tr = $(`<tr> </tr>`);
        $.each(threads, function(index, th) {
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
            td.append(value);
            $(tr).append(td);
        })
        $('#tbListData tbody').append(tr);
    })
}

function showImagePreview() {
    $('.default-avt').click(function() {
        $('#avtUpdate').click();
    });

    $('#avtUpdate').change(function() {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('.default-avt').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0])
        }
    });
}