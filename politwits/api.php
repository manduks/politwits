<?php
/**
 * Created by CodeTlan.
 * User: Ing. Miguel Salas
 * Date: 5/13/12
 * Time: 7:19 PM
 */

    include("config.php");
    include("libMySql.php");
    class Api extends LibMySql{
		
		var $sqlTweets = "select * from twits where track_k= '@user' order by tweet_k desc ";
		var $numTweets = "select no_twits from tracks where track_k='@user' ";
		

		function getTrack($track,$start,$limit){
		  $arr = array(
			"data"=>$this->getData(str_replace("@user", $track, $this->sqlTweets."limit {$start},{$limit}")),
			"count"=> $this->getResult( $this->ejecutar(str_replace("@user", $track, $this->numTweets )),0),
			"success"=>true
			);			
			echo json_encode($arr);
		}
		
		function getMapsMarkers(){
			$arr = array(
				"data"=>$this->getData("select * from twits where location != '' and DATE(date) = CURRENT_DATE"),
				"success"=>true
				);
				
			echo json_encode($arr);
		}
		
		function getHowMany(){
			$arr = array(
				"data"=>$this->getData("select * from tracks"),
				"success"=>true
				);
			echo json_encode($arr);
		}
    }

	//Se instancia la clase
    $api= new Api();
	$tipo = $_GET['type'];
	$candidato = $_GET['typec'];
	$start = $_GET['start'];

    if(!is_numeric($tipo))
        $tipo=-1;
    if(!is_numeric($candidato))
        $candidato=-1;
    if(!is_numeric($start))
        $start=1;

    $c = array('@EPN','@josefinaVM','@lopezobrador_','@G_quadri');
	switch($tipo){
		case '0':
			$api->getHowMany();
		break;
		case '1':
			$api->getTrack($c[$candidato],$start,LIMIT);
		break;
		case '2':
			$api->getStatsTrack($c[$candidato],$start,LIMIT);
		break;
		case '8':
			$api->getMapsMarkers();
		break;
	}
?>