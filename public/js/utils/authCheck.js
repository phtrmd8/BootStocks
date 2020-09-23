$(document).ready(function(){

    const token = localStorage.getItem('token');

    if(token){
        $.get('/api/auth')
    }


});