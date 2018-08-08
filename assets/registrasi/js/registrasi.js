function sign_up(){
    var nama = document.getElementById('nama').value;
    var alamat = document.getElementById('alamat').value;
    var email = document.getElementById('email').value;
    var tlp = document.getElementById('tlp').value;
    var password1 = document.getElementById('password1').value;
    var password2 = document.getElementById('password2').value;

    if(nama == "" || email == "" || tlp == "" || password1 == "" || password2 == "" || alamat == ""){
        alert("Isi data yang masih kosong");
    }else{
        if(password1 !== password2){
            alert('Kata sandi anda tidak sama');
        }else if(validasi_email(email) == false){
            alert("Alamat email anda tidak valid");
        }else if(cek_email(email) == false){
            alert('Email anda sudah terdaftar. Silahkan ke halaman login');
        }else{
            var data_registrasi = JSON.stringify(new format_save_json());
            
            $.ajax({
                url: "registrasi/isi_form",
                data: "data_registrasi="+data_registrasi,
                dataType:"json",
                type: "post",
                async: false,
                beforeSend: function(){
                    document.body.style.cursor='wait';
                },
                success: function (data) {
                    document.body.style.cursor='default';
                    if(data){
                        alert('Selamat user anda berhasil terdaftar');
                        clear_form();
                        window.location.href = 'login.html';
                    }else{
                        alert("User anda gagal terdaftar. \nHarap hubungi admin kami. Terimakasih");
                    }
                },
                error: function (xhr, status) {
                    document.body.style.cursor='default';
                    alert("Sorry, there was a problem!");
                    //alert(status);
                }
            });
        }
    }
}

function format_save_json(){
    var self = this;
    var nama = document.getElementById('nama').value;
    var alamat = document.getElementById('alamat').value;
    var email = document.getElementById('email').value;
    var tlp = document.getElementById('tlp').value;
    var password = document.getElementById('password1').value;

    self.id = get_max_id();
    self.username = email.split("@")[0].toLowerCase();
    self.password = password.toLowerCase();
    self.email = email.toLowerCase();
    self.alamat = alamat.toLowerCase();
    self.telepon = tlp;
    self.password = md5(password).toUpperCase();
    self.nama_foto = 'blank.png';
    self.catatan = null;
    self.tgl_approve = null;
    self.tgl_daftar = format_date_now();
    self.status = 0;
    
    return self;
}

function validasi_email(mail) 
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        return (true);
    }

    return (false);
}

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
}

function format_date_now(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;

    var hour = today.getHours().toString();
    var formatedHour = (hour.length === 1) ? ("0" + hour) : hour;
    var minute = today.getMinutes().toString();
    var formatedMinute = (minute.length === 1) ? ("0" + minute) : minute;
    var second = today.getSeconds().toString();
    var formatedSecond = (second.length === 1) ? ("0" + second) : second;

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    var today = yyyy+'-'+mm+'-'+dd+' '+formatedHour+':'+formatedMinute+':'+formatedSecond;

    return today;
}

function clear_form(){
    document.getElementById('nama').value = "";
    document.getElementById('alamat').value = "";
    document.getElementById('email').value = "";
    document.getElementById('tlp').value = "";
    document.getElementById('password1').value = "";
    document.getElementById('password2').value = "";
}

function cek_email(mail){
    var res = "";

    $.ajax({
        url: "registrasi/cek_email",
        data: "email="+mail,
        type: "post",
        async: false,
        beforeSend: function(){
            document.body.style.cursor='wait';
        },
        success: function (data) {
            document.body.style.cursor='default';
            res = data;
        },
        error: function (xhr, status) {
            document.body.style.cursor='default';
            alert("Sorry, there was a problem!");
            //alert(status);
        }
    });

    return res;
}

function get_max_id(){
    var res = 0;

    $.ajax({
        url: "registrasi/get_max_id",
        async: false,
        beforeSend: function(){
            document.body.style.cursor='wait';
        },
        success: function (data) {
            document.body.style.cursor='default';
            if(data){
                res = parseInt(data) + 1;
            }else{
                res = 0;
            }
        },
        error: function (xhr, status) {
            document.body.style.cursor='default';
            //alert("Sorry, there was a problem!");
            alert(status);
        }
    });

    return res;
}

