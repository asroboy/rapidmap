<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

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
		
		$url = base_url().'api.php/berita?order=tgl_berita,desc&page=1,1';
		$json = json_decode(file_get_contents($url),true);

		$listberita = json_decode(file_get_contents(base_url().'api.php/berita?order=tgl_berita,desc&page=1,4'),true);

		$items = array();
		foreach($listberita['berita']['records'] as $item){
			$items[] = $item[0];
		}
		$maxid = max($items);

		// Info Umum //
		$info_umum = json_decode(file_get_contents(base_url().'api.php/info_umum'),true);

		$data = array(
			'results' => $json['berita']['results'],
			'berita' => $json['berita']['records'],
			'listberita' => $listberita['berita']['records'],
			'max' => $maxid,
			'info_umum' => $info_umum['info_umum']['records']
		);
		
		$this->load->view('home', $data);
	}

	public function json(){
		header('Content-type: application/json');
		$url = base_url().'api.php/berita';
		$json = json_decode(file_get_contents($url),true);


		/*echo $json['berita']['records'][2][0]."<br>";*/

		/*echo count($json['berita']['records'])."<br>";

		echo $json['berita']['records'][0][0];

		print_r($json['berita']['records']);*/
		$items = array();

		foreach($json['berita']['records'] as $item){
			$items[] = $item[0];
		}

		echo max($items);
	}
}
