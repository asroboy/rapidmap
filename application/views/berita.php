<!DOCTYPE html>
<html lang="en">
	
	
  <head>
	
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="title" content="<?php echo $data[1]; ?>">
	<meta name="description" content="<?php echo $data[4]; ?>">
  
    <!--title>SIRAMA</title-->

    <!-- Bootstrap core CSS -->
    <link href="<?php echo base_url(); ?>assets/land-page/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
	<link rel="icon" href="<?php echo(base_url().'assets/land-page/images/favicon.png') ?>">

    <!-- Custom fonts for this template -->
    <link href="<?php echo base_url(); ?>assets/land-page/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Kaushan+Script' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700' rel='stylesheet' type='text/css'>

    <!-- Custom styles for this template -->
    <link href="<?php echo base_url(); ?>assets/land-page/css/agency.min.css" rel="stylesheet">
  </head>

  <body id="page-top">

    <!-- Navigation -->
    <nav class="fixed-top">
	  <div class="header-logo-big">
	    <table width="100%" height="100%">
			<tr>
				<td width="50px">
					<img src="<?php echo base_url(); ?>assets/land-page/images/logo.png" width="100px" height="100px" />
				</td>
				<td width="10px"></td>
				<td>
					<div class="header-text-news-big">BADAN INFORMASI GEOSPASIAL</div>
					<div class="header-text-news-ref">SISTEM INFORMASI RAPPID MAPPING KEBENCANAAN</div>
				</td>
			</tr>
		</table>
	  </div>
      <div class="masthead-news">
        <a href="<?php echo(base_url().'home.html')?>" class="nav-link js-scroll-trigger text-white home-news">Beranda</a>
      </div>
    </nav>
	
	<!-- News -->
    <section id="news" class="section-news news-top">
      <div class="container-news">
        <div class="row">
          <div class="col-lg-12 text-left">
            <h3 class="section-heading text-uppercase text-header-news">BERITA BENCANA</h3>
          </div>
        </div>
        <div class="row text-left">
          <div class="col-md-8">
            <img src="<?php echo base_url(); ?>assets/land-page/images/news/<?php echo $data[8]; ?>" width="800px" height="400" style="border:1px solid black">
            <h4 class="service-heading"><?php echo $data[1]; ?></h4>
			<div id="referensi" class="text-uppercase">TGL BERITA : <?php echo $data[3]; ?></div>
			<div id="referensi" class="text-uppercase">SUMBER : <?php echo $data[9]; ?></div>
            <div class="text-muted" style="text-align:justify;line-height: 25px;padding-top: 10px;padding-bottom:10px">
				<?php echo $data[4]; ?>
			</div>
			<br><br>
			<div class="text-share">Bagikan Tautan</div>
			<div class="row">
				<ul class="list-inline social-buttons text-center" style="padding-left: 20px">
				  <li class="list-inline-item">
					<a href="http://www.facebook.com/sharer.php?u=<?php echo site_url('berita/view/'.$data[0].'.');?>&p[title]=<?php echo $data[1];?>&p[description]=<?php echo $data[4]; ?>">
					  <i class="fa fa-facebook"></i>
					</a>
				  </li>
				  <li class="list-inline-item">
					<a href="#">
					  <i class="fa fa-instagram"></i>
					</a>
				  </li>
				  <li class="list-inline-item">
					<a href="http://twitter.com/share?text=<?php echo str_replace(" ","+",$data[1]);?>&url=<?php echo site_url('berita/view/'.$data[0].'.'); ?>">
					  <i class="fa fa-twitter"></i>
					</a>
				  </li>
				</ul>
			</div>
          </div>
		  <div class="col-md-4">

		  		<?php 
		  			$id_berita = str_replace(".", "", $this->uri->segment(3));
		  			foreach ($listberita as $item) {

		  			if($item[0] != $id_berita){
		  		?>
					<div class="row">
						<div class="col-md-4">
							<img src="<?php echo base_url();?>assets/land-page/images/news/<?php echo $item[8];?>" width="110px" height="130px" style="border:1px solid black; padding:2px" />
						</div>
						<div class="col-md-8">
							<div class="header-news-1"><a href="<?php echo (base_url().'berita/view/'.$item[0])?>"><?php echo $item[1]; ?></a></div>
							<div class="ref-news-1">TGL BERITA : <?=$item[3];?></div>
							<div class="ref-news-1">SUMBER : <?=$item[9];?></div>
							<div class="content-news-1"><?=substr($item[4], 0,150);?></div>
						</div>
					</div>
					<div style="padding: 10px"></div>
				<?php 
					}else{}
				}
				?>
		  </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer style="background-color: silver">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <span class="copyright">&copy; 2018 PT. VIRTUA INTERNASIONAL PRATAMA</span>
          </div>
        </div>
      </div>
    </footer>

    <!-- Bootstrap core JavaScript -->
    <script src="<?php echo base_url(); ?>assets/land-page/vendor/jquery/jquery.min.js"></script>
    <script src="<?php echo base_url(); ?>assets/land-page/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Plugin JavaScript -->
    <script src="<?php echo base_url(); ?>assets/land-page/vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Contact form JavaScript -->
    <script src="<?php echo base_url(); ?>assets/land-page/js/jqBootstrapValidation.js"></script>
    <script src="<?php echo base_url(); ?>assets/land-page/js/contact_me.js"></script>

    <!-- Custom scripts for this template -->
    <script src="<?php echo base_url(); ?>assets/land-page/js/agency.min.js"></script>

  </body>

</html>
