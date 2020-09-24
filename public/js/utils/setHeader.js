// $(document).ready(function () {
const token = localStorage.getItem('token');
// console.log(window.location.href)
$.ajaxSetup({
    headers: { 'x-auth-token': token }
});