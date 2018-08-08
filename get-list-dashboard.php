<?php
	$url = 'http://103.52.147.211/rapidmapapi/api.php/list-dashboard';
		$json = json_decode(file_get_contents($url),true);
		
		$items = array();
		foreach($json['list-dashboard']['records'] as $item){
			$row = array(
				"isi_data" => $item[1]."#".$item[4]."#".$item[9]."#".$item[7]."#".$item[15]
			);

			array_push($items, $row);
		}
		
		$data = json_encode($items);

		echo "{\"list-dashboard\":" . $data . "}";
?>