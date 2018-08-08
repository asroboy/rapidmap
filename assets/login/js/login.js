function sign_in(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if(email == "" || password == ""){
        alert("Email atau password masih kosong");
        document.getElementById('email').focus();
    }else if(validasi_email(email) == false){
        alert('Format email anda salah');
    }else{
        $.ajax({
            url: "login/sign_in",
            data: "email="+email+"&password="+password,
            type: "post",
            async: false,
            beforeSend: function(){
                document.body.style.cursor='wait';
            },
            success: function (data) {
                document.body.style.cursor='default';

                if(data == 'nonaktif'){
                    alert('Akun anda belum disetujui oleh admin');
                }else if(data == 'blokir'){
                    alert('Akun anda diblokir oleh admin');
                }else if(data){
                    window.location.href = 'analisis.html';
                }else{
                    alert('Akses ditolak');
                }
            },
            error: function (xhr, status) {
                document.body.style.cursor='default';
                //alert("Sorry, there was a problem!");
                alert(status);
            }
        });
    }
}

function validasi_email(mail) 
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        return (true);
    }

    return (false);
}