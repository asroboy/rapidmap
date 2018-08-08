<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Analisis extends CI_Controller {

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
		if($this->session->userdata('logged_in')){
			$this->load->view('analisis');
		}else{
			redirect('login');
		}
	}

	public function list_status_pengguna(){
		$url = $this->url_service->GetUrl('pengguna?order=tgl_daftar,desc');
		$data = json_decode(file_get_contents($url),true);

		$items = array();
		$status = "";

		foreach($data['pengguna']['records'] as $item){
			if($item[10] == "0"){
				$status = "belum aktif";
			}else if($item[10] == "-1"){
				$status = "terblokir";
			}else{
				$status = "aktif";
			}

			$row = array(
				"nama" => $item[1],
				"email" => $item[3],
				"tgl_daftar" => $item[9],
				"tgl_approve"=>$item[8],
				"status"=>$status
			);

			array_push($items, $row);
		}
		
		$data = json_encode($items);

		echo "{\"status_pengguna\":" . $data . "}";
	}

	public function delete_status_pengguna(){
		$data_status_pengguna = $this->input->post('data_status_pengguna');
		
		//get service
        $search = "\/";
        $replace = "";

		$data_string = json_decode(str_replace($search, $replace, json_encode($data_status_pengguna)));

        $ch = curl_init($this->url_service->GetUrl('pengguna'));
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
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

	public function logout()
	{
		$user_data = $this->session->all_userdata();
        foreach ($user_data as $key => $value) {
            if ($key != 'username' && $key != 'email' && $key != 'logged_in'){
                $this->session->unset_userdata($key);
            }
        }

    	$this->session->sess_destroy();
    	redirect('login');
	}
}
