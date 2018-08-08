<!DOCTYPE html>
<html lang="en">

  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>SIRAMA</title>

    <!-- Bootstrap core CSS -->
    <link href="assets/land-page/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
	<link rel="icon" href="<?php echo(base_url().'assets/land-page/images/favicon.png') ?>">

    <!-- Custom fonts for this template -->
    <link href="assets/land-page/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Kaushan+Script' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700' rel='stylesheet' type='text/css'>

    <!-- Custom styles for this template -->
    <link href="assets/land-page/css/agency.min.css" rel="stylesheet">
  </head>

  <body id="page-top">

    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand js-scroll-trigger" href="#page-top"></a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i class="fa fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav text-uppercase ml-auto">
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#home">Beranda</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#news">Berita</a>
            </li>
			      <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#info">Informasi Umum</a>
            </li>
			      <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#fitur">Fitur</a>
            </li>
			      <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#about">Tentang Kami</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Header -->
    <header class="masthead" id="home">
      <div class="container">
        <div class="intro-text">
          <div class="intro-lead-top">SELAMAT DATANG</div>
		      <div class="intro-lead-middle">SISTEM INFORMASI RAPID MAPPING KEBENCANAAN</div>
          <div class="intro-lead-bottom">BADAN INFORMASI GEOSPASIAL</div>
          <a class="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="#info">Info Lebih Lanjut</a>
		      <div class="col-sm-12">
            <div class="logo-member">
      			  <div class="img-logo">
        				<img class="mx-auto rounded-circle" src="assets/land-page/images/logos/1.png" alt=""> &nbsp;&nbsp;
        				<img class="mx-auto rounded-circle" src="assets/land-page/images/logos/2.png" alt=""> &nbsp;&nbsp;
        				<img class="mx-auto rounded-circle" src="assets/land-page/images/logos/3.png" alt=""> &nbsp;&nbsp;
        				<img class="mx-auto rounded-circle" src="assets/land-page/images/logos/4.png" alt=""> &nbsp;&nbsp;
        				<img class="mx-auto rounded-circle" src="assets/land-page/images/logos/5.png" alt="">
      			  </div>
			     </div>
		      </div>
		  <!-- <div class="text-logo">INSTANSI YANG BEKERJASAMA</div> -->
        </div>
      </div>
    </header>

    <!-- Fitur -->
    <section class="bg-light" id="fitur">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2 class="section-heading text-uppercase">FITUR - FITUR</h2>
            <h3 class="section-subheading text-muted"></h3>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-3"></div>
          <div class="col-lg-3">
            <div class="team-member">
              <img class="mx-auto rounded-circle" src="assets/land-page/images/team/1.png" alt="">
              <h4><a href="dashboard.html">DASHBOARD PETA BENCANA</a></h4>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="team-member">
              <img class="mx-auto rounded-circle" src="assets/land-page/images/team/2.png" alt="">
              <h4><a href="login.html">ANALISIS SPASIAL</a></h4>
            </div>
          </div>
          <div class="col-lg-3"></div>
        </div>
      </div>
    </section>
	
	 <!-- News -->
    <section id="news" class="section-news">
      <div class="container-news">
        <div class="row">
          <div class="col-lg-12 text-left">
            <h3 class="section-heading text-uppercase text-header-news">BERITA BENCANA</h3>
          </div>
        </div>
        <div class="row text-left">
          <div class="col-md-8">
            <?php foreach($berita as $item) { ?>
              <img src="assets/land-page/images/news/<?php echo $item[8]; ?>" width="800px" height="400" style="border:1px solid black">
              <h4 class="service-heading"><?=$item[1];?></h4>
        			<div id="referensi" class="text-uppercase">TGL BERITA : <?php echo $item[3];?></div>
        			<div id="referensi" class="text-uppercase">SUMBER : <?php echo $item[9];?></div>
              <div class="text-muted" style="text-align:justify;line-height: 25px;padding-top: 10px;padding-bottom:10px">
        				<?php echo substr($item[4], 0,300);?>
  			      </div>
  			      <a href="<?php echo(base_url().'berita.html')?>" style="color:blue;line-height: 10px;font-size:11pt">Baca Selengkapnya...</a>
            <?php } ?>
          </div>
          <div class="col-md-4">
          <?php foreach ($listberita as $item) { ?>
            <?php if($item[0] !== $max){?>
                <div class="row">
                  <div class="col-md-4">
                    <center>
                      <img src="assets/land-page/images/news/<?php echo $item[8];?>" width="110px" height="130px" style="border:1px solid black; padding:2px" />
                    </center>
                  </div>
                  <div class="col-md-8">
                    <div class="header-news-1"><a href="javascript:void(0)">Dibutuhkan: Partisipasi Masyarakat dalam Pemetaan</a></div>
                    <div class="ref-news-1">TGL BERITA : 10/04/2018</div>
                    <div class="ref-news-1">SUMBER : <?=$item[9];?></div>
                    <div class="content-news-1"><?=substr($item[4], 0,150);?></div>
                  </div>
                </div>
            <?php }else{} ?>
            
            <div style="padding: 10px"></div>
          <?php } ?>
  		    </div>
        </div>
      </div>
    </section>
	
	<!-- Info -->
    <div class="section-info bg-light-dark" id="info">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <h4 class="section-heading text-uppercase text-white">INFORMASI UMUM</h4>
			<div class="box-info">
				<ul class="text-info-ref">
          <?php foreach($info_umum as $item){ ?>
					<li><?=$item[1];?></li>
				  <?php } ?>
				</ul>
			</div>
			<a class="btn-info btn-xl btn-primary text-uppercase js-scroll-trigger" href="#fitur">Fitur Tersedia</a>
          </div>
        </div>
      </div>
    </div>
	
	<!-- About -->
    <div id="about" class="bg-light-silver section-map">
      <div class="container-map">
        <div class="row">
          <div class="col-md-7">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6667.054339075228!2d106.84716851259033!3d-6.489457915563497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c1bb1acd1965%3A0x709d5406c97d2b1c!2sBadan+Informasi+Geospasial!5e0!3m2!1sid!2sid!4v1527718255740" 
			width="700" height="450" frameborder="0" style="border:1"></iframe>
          </div>
		  <div class="col-md-5">
            <div class="head-map">TENTANG KAMI</div>
			<div class="content-map">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
				Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
				Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
				Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				
				At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores 
				et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, 
				id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi 
				optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. 
				Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. 
				Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
			</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <span class="copyright">&copy; 2018 PT. VIRTUA INTERNASIONAL PRATAMA</span>
          </div>
        </div>
      </div>
    </footer>

    <!-- Bootstrap core JavaScript -->
    <script src="assets/land-page/vendor/jquery/jquery.min.js"></script>
    <script src="assets/land-page/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Plugin JavaScript -->
    <script src="assets/land-page/vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Contact form JavaScript -->
    <script src="assets/land-page/js/jqBootstrapValidation.js"></script>
    <script src="assets/land-page/js/contact_me.js"></script>

    <!-- Custom scripts for this template -->
    <script src="assets/land-page/js/agency.min.js"></script>

  </body>

</html>
