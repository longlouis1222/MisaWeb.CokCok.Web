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
    // load dữ liệu:
    // 1. Bước 1: gọi service lấy dữ liệu: (api.manhnv.net/api/customes)
    //debugger;
    $.ajax({
        url: 'http://api.manhnv.net/api/customers',
        method: 'GET',
    }).done(function(res) {
        console.log(res);
        //    debugger;
        // 2. Bước 2: xử lý dữ liệu

        // 3. Bước 3: Build html và append lên UI:
        // $('#tbListData tbody').empty();
        for (var i = 0; i < res.length; i++) {
            console.log(res[i]);
            var DOB = formatDate(res[i].DateOfBirth);
            // var DebitAmount = formatMoney(res[i].DebitAmount);
            var trHtml = $(`<tr class="el-table__row first">
                            <td rowspan="1" colspan="1" style="width: 100px;"><div class="cell">${res[i].CustomerCode}</div></td>
                            <td rowspan="1" colspan="1" style="width: 143px;"><div class="cell">${res[i].FullName}</div></td>
                            <td rowspan="1" colspan="1" style="width: 58px;"><div class="cell">${res[i].GenderName}</div></td>
                            <td rowspan="1" colspan="1" style="width: 100px;"><div class="cell text-align-center">${DOB}</div></td>
                            <td rowspan="1" colspan="1" style="width: 72px;"><div class="cell">${res[i].CustomerGroupName}</div></td>
                            <td rowspan="1" colspan="1" style="width: 119px;"><div class="cell">${res[i].PhoneNumber}</div></td>
                            <td rowspan="1" colspan="1" style="width: 192px;"><div class="cell">${res[i].Email}</div></td>
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
    // Gán các sự kiện:
    $('#btnAdd').click(function() {
        dialog.dialog('open');
    })

    $('#btnCancel').click(function() {
        dialog.dialog('close');
    })

    $('.icon-exit').click(function() {
        dialog.dialog('close');
    })

    //$('#tbListData').on('dblclick', 'tr', function () {
    //    alert('á');
    //})

    $('#tbListData').on('dblclick', 'tr', function() {
        // load dữ liệu chi tiết:

        // Hiển thị dialog thông tin chi tiết:
        dialog.dialog('open');
    })
}