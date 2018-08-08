<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller {

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
		$this->load->view('dashboard');
	}
	
	public function ListService(){
		$url = $this->url_service->GetUrl('list-dashboard');
		$json = json_decode(file_get_contents($url),true);

		$items = array();
		foreach($json['list-dashboard']['records'] as $item){
			$row = array(
				"isi_data" => $item[1]."#".$item[4]."#".$item[9]."#".$item[7]."#".$item[3]
			);

			array_push($items, $row);
		}
		
		$data = json_encode($items);

		echo "{\"list-dashboard\":" . $data . "}";
	}
	
	public function ListNameBencana(){
		$url = $this->url_service->GetUrl('list-dashboard');
		$json = json_decode(file_get_contents($url),true);

		$items = array();
		foreach($json['list-dashboard']['records'] as $item){
			$row = array(
				"id" => $item[0],
				"isi_nama" => $item[1]
			);

			array_push($items, $row);
		}
		
		$data = json_encode($items);
		
		echo $data;		

	}
	
	public function ListTahun(){
		$url = $this->url_service->GetUrl('list-dashboard?distinct=tahun');
		$json = json_decode(file_get_contents($url),true);

		$items = array();
		foreach($json['list-dashboard']['records'] as $item){
			$row = array(
				"id" => $item[0],
				"tahun" => $item[0]
			);

			array_push($items, $row);
		}
		
		$data = json_encode($items);
		
		echo $data;	
	}
}