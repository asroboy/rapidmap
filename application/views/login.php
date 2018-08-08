
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <!-- Meta, title, CSS, favicons, etc. -->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="icon" href="assets/login/images/favicon.png" type="image/png" />

        <title>SIRAMA | Login</title>
        <link href="assets/login/css/style.css" rel="stylesheet">
        
        <!-- Bootstrap core CSS -->
        <link href="assets/login/css/bootstrap/bootstrap.min.css" rel="stylesheet">

        <!-- Custom fonts for this template -->
        <link href="assets/login/css/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
        <link href="assets/login/css/build/css/custom.min.css" rel="stylesheet">
    </head>

    <body class="login">
        <div>
            <div class="login_wrapper">
                <div class="login_form">
                    <section class="login_content">
                        <form>
                            <div>
                                <img src="assets/login/images/logo.png" width="100px" height="100px">
                            </div><br>
                                <h1>AKSES MASUK <div style="font-size: 10pt; letter-spacing: 0px; padding-left: 5px; padding-top: 3px">SISTEM INFORMASI RAPID MAPPING</div></h1>
                            <div>
                                <input type="text" id="email" name="email" class="form-control" placeholder="Email" required="" />
                            </div>
                            <div>
                                <input type="password" id="password" name="password" class="form-control" placeholder="Password" required="" />
                            </div>
                            <div>
                                <a class="btn btn-default" href="javascript:void(0)" onclick="sign_in()">Masuk</a>
                            </div>

                            <div class="clearfix"></div><br>

                            <div><a href="registrasi.html" style="color: blue">Daftar Disini</a></div>

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
    <script src="assets/login/js/jquery/jquery.min.js"></script>
    <script src="assets/login/js/login.js"></script>
</html>