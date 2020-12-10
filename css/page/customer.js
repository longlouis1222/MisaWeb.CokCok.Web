$(document).ready(function () {
  // alert('welcome to MISA');
  //  thuc hien load du lieu
  // 1. Lay du lieu
  $.ajax({
    url: '',
    method: 'G',
    data: null,
    dataType: 'json',
    contentType: 'application/json'
  }).done(function (response) {
    console.log(response);
  }).fail(function (response) {

  })
  // 2. Doc du lieu

  // 3. Xu ly du lieu

  // 4. Dau du lieu vao trong html
})