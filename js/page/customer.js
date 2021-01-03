$(document).ready(function() {
    dialog = $(".dialog__content").dialog({
        autoOpen: false,
        width: 680,
        // height: 590,
        modal: true,
    });
    loadData();

    initEvens();
})

/**
 * Thực hiện load dữ liệu
 * Author: NHLONG (07/12/2020)
 * */
function loadData() {
    // alert(1);
    // load dữ liệu:
    // 1. Bước 1: gọi service lấy dữ liệu: (api.manhnv.net/api/customes)
    //debugger;
    $.ajax({
        url: 'http://api.manhnv.net/api/customers',
        // url: 'https://localhost:44376/api/Customers',
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
            // var DebitAmount = formatMoney(res[i].DebitAmount);
            var trHtml = $(`<tr class="el-table__row first">
                            <td rowspan="1" colspan="1" style="width: 100px;"><div class="cell">${res[i].CustomerCode}</div></td>
                            <td rowspan="1" colspan="1" style="width: 143px;"><div class="cell">${res[i].FullName}</div></td>
                            <td rowspan="1" colspan="1" style="width: 58px;"><div class="cell">${res[i].GenderName}</div></td>
                            <td rowspan="1" colspan="1" style="width: 100px;"><div class="cell text-align-center">${DOB}</div></td>
                            <td rowspan="1" colspan="1" style="width: 72px;"><div class="cell">${res[i].CustomerGroupName}</div></td>
                            <td rowspan="1" colspan="1" style="width: 119px;"><div class="cell">${res[i].PhoneNumber}</div></td>
                            <td rowspan="1" colspan="1" style="width: 192px;"><div class="cell">${res[i].Email || ""}</div></td>
                            <td rowspan="1" colspan="1" style="width: 232px;"><div class="cell" title="${res[i].Address}">${res[i].Address}</div></td>
                            <td rowspan="1" colspan="1" style="width: 55px;"><div class="cell" class="text-align-right">${res[i].DebitAmount || ""}</div></td>
                            <td rowspan="1" colspan="1" style="width: 98px;"><div class="cell">${res[i].MemberCardCode}</div></td>
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
        var customer = {
            "CustomerCode": $('#cus-code').val(),
            "CustomerGroup": $('#cus-group').val(),
            "FullName": $('#cus-name').val(),
            "Gender": $('#cus-gender').find(':checked').val(),
            "Address": $('#cus-address').val(),
            "DateOfBirth": $('#cus-birth').val(),
            "Email": $('#cus-email').val(),
            "PhoneNumber": $('#cus-phone').val(),
            "MemberCardCode": $('#cus-code-card').val(),
            "CustomerGroupId": $('#cus-group').find(':selected').val() /* "7a0b757e-41eb-4df6-c6f8-494a84b910f4" */
        }
        console.log(customer);
        alert("success");
        // Gọi service tương ứng thực hiện dữ liệu
        $.ajax({
            // url: 'http://api.manhnv.net/api/customers',
            url: 'https://localhost:44376/api/Customers',
            method: 'POST',
            data: JSON.stringify(customer),
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
            // debugger
        }.bind(this))
    })

    $('#btnRefresh').click(function() {
        // dialog.dialog('close');
        me.loadData();
    })

    $('#tbListData').on('dblclick', 'tr', function() {
        // load dữ liệu chi tiết:

        // Hiển thị dialog thông tin chi tiết:
        dialog.dialog('open');
    })
}