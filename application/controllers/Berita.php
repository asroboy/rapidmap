<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Berita extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		$this->load->view('berita');
	}

	public function view($id){

		$url = $this->url_service->GetUrl('berita?filter=id,eq,'.str_replace(".", "", $id));
		$detail_berita = json_decode(file_get_contents($url),true);

		$url2 = $this->url_service->GetUrl('berita?order=tgl_berita,desc&page=1,4');
		$listberita = json_decode(file_get_contents($url2),true);		
		$items = array();
		foreach($listberita['berita']['records'] as $item){
			$items[] = $item[0];
		}
		
		$data = array(
			"data" => $detail_berita['berita']['records'][0],
			"listberita" => $listberita['berita']['records']
		);

		$this->load->view('berita', $data);	
	}
	
	public function ListBerita(){
		$url = base_url().'api.php/list-berita?order=judul_berita,desc';
		$json = json_decode(file_get_contents($url),true);

		$items = array();
		foreach($json['list-berita']['records'] as $item){
			$row = array(
				"judul" => $item[2],
				"tgl_berita" => $item[3],
				"url_service"=>$item[0],
				"status_berita"=>$item[4] == 0 ? "Tidak Aktif" : "Aktif"
			);

			array_push($items, $row);
		}
		
		$data = json_encode($items);

		echo "{\"berita\":" . $data . "}";
	}
}
