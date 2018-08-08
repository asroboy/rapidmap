<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

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
			redirect('analisis');
		}else{
			$this->load->view('login');
		}
	}

	public function sign_in(){
		$email = $this->input->post('email');
		$password = $this->input->post('password');
		$password = strtoupper(md5($password));

		$result = false;
		$url = $this->url_service->GetUrl('pengguna?filter=email,eq,'.$email.'&filter=password,eq,'.$password);
		$data = json_decode(file_get_contents($url),true);

		if(count($data['pengguna']['records']) > 0){
			if($email == $data['pengguna']['records'][0][3] && $password == strtoupper($data['pengguna']['records'][0][2]) && $data['pengguna']['records'][0][10] == 1){
				$newdata = array(
                   'username'  => $data['pengguna']['records'][0][1],
                   'email'     => $data['pengguna']['records'][0][3],
                   'logged_in' => true
               	);

				$this->session->set_userdata($newdata);
				$result = true;
			}else if($email == $data['pengguna']['records'][0][3] && $password == strtoupper($data['pengguna']['records'][0][2]) && $data['pengguna']['records'][0][10] == 0){
				$result = "nonaktif";
			}else if($email == $data['pengguna']['records'][0][3] && $password == strtoupper($data['pengguna']['records'][0][2]) && $data['pengguna']['records'][0][10] == -1){
				$result = "blokir";
			}
		}
		
		echo($result);
	}
}
