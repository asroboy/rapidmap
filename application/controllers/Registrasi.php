<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Registrasi extends CI_Controller {

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
		$this->load->view('registrasi');
	}

	public function isi_form()
	{
		$data_registrasi = $this->input->post('data_registrasi');
		
		//get service
        $search = "\/";
        $replace = "";

		$data_string = json_decode(str_replace($search, $replace, json_encode($data_registrasi)));

        $ch = curl_init($this->url_service->GetUrl('pengguna'));
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($data_string))
        );
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        
        //execute post
        $result = json_decode(curl_exec($ch), true);
        
        //close connection
        curl_close($ch);

        echo($result);
	}

	public function get_max_id()
	{
		$url = $this->url_service->GetUrl('pengguna');
		$json = json_decode(file_get_contents($url),true);

		echo(count($json['pengguna']['records']));
	}

	public function cek_email(){
		$email = $this->input->post('email');
		
		$result = false;
		$url = $this->url_service->GetUrl('pengguna?filter=email,eq,'.$email);
		$data = json_decode(file_get_contents($url),true);

		if(count($data['pengguna']['records']) == 0){
			$result = true;
		}
		
		echo($result);
	}
}
