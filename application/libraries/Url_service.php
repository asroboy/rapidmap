<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed'); 

class Url_service
{
	public function GetUrl($param){
		return "http://103.52.147.211/rapidmapapi/api.php/".$param;
	}
}
