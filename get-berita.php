<?php
$data = array();
$data[] = array(
	'judul'=>'judul 1',
	'tgl_berita'=>'20-01-2018',
	'peta_bencana'=>'peta bencana',
	'status_berita'=>'1'
);
$js = array('berita'=>$data);
echo json_encode($js);
