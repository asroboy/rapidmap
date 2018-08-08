
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <!-- Meta, title, CSS, favicons, etc. -->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="icon" href="assets/registrasi/images/favicon.png" type="image/png" />

        <title>SIRAMA | Registrasi</title>
        <link href="assets/registrasi/css/style.css" rel="stylesheet">
        
        <!-- Bootstrap core CSS -->
        <link href="assets/registrasi/css/bootstrap/bootstrap.min.css" rel="stylesheet">

        <!-- Custom fonts for this template -->
        <link href="assets/registrasi/css/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
        <link href="assets/registrasi/css/build/css/custom.min.css" rel="stylesheet">
    </head>

    <body class="registrasi">
        <div>
            <div class="registrasi_wrapper">
                <div class="registrasi-form">
                    <section class="registrasi_content">
                        <form>
                            <div>
                                <img src="assets/registrasi/images/logo.png" width="100px" height="100px">
                            </div><br>
                                <h1 class="judul-registrasi">REGISTRASI</h1>
                                <div style="font-size: 12pt; letter-spacing: 0px; padding-left: 5px">SISTEM INFORMASI RAPID MAPPING
                                    <div style="font-size: 9pt; letter-spacing: 0px; padding-left: 5px">PENDAFTARAN ANGGOTA BARU
                                    </div>
                                </div>
                            <div><br>
                                <input type="text" id="nama" name="nama" class="form-control margin-form" placeholder="Nama Lengkap" required="" />
                                <input type="email" id="email" name="email" class="form-control margin-form" placeholder="Email" required="" />
                                <input type="text" id="alamat" name="alamat" class="form-control margin-form" placeholder="Alamat" required="" />
                                <input type="text" id="tlp" name="tlp" class="form-control margin-form" placeholder="Telepon" required="" maxlength="15" onkeypress="return isNumberKey(event);" />
                                <input type="password" id="password1" name="password1" class="form-control margin-form" placeholder="Kata Kunci" required="" />
                                <input type="password" id="password2" name="password2" class="form-control margin-form" placeholder="Ulangi Kata Kunci" required="" />
                            </div>
                            <div style="text-align: left; margin-bottom: 10px"><a href="login.html" style="color: blue">Saya sudah memiliki keanggotaan</a></div>
                            <div>
                                <a class="btn btn-default" style="width:100px; padding: 8px" href="javascript:void(0)" onclick="sign_up()">Daftar</a>
                            </div>
                            <div class="clearfix"></div><br>
                            <div class="separator">
                                <div>
                                    <p>© 2018 All Rights Reserved. <br>PT. Virtua Internasional Pratama</p>
                                </div>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    </body>
    <script src="assets/registrasi/js/jquery/jquery.min.js"></script>
    <script src="assets/registrasi/js/crypto.js"></script>
    <script src="assets/registrasi/js/registrasi.js"></script>
</html>