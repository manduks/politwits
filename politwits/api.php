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
		var $numTweets = "select no_twits from tracks where track_k='@user' and date=CURRENT_DATE";
        var $sqlTotal = "select 'negativos' as name, negativos as data from(select track_k, negatives as negativos, (no_twits - negatives) as total from tracks where date=CURRENT_DATE and track_k='@user')as aux union
                          select 'total', total from(select track_k, negatives as negativos, (no_twits - negatives) as total from tracks where date=CURRENT_DATE and track_k='@user') as aux1 ";

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

        function getTweetCharts(){

            /*$data = $this->getData("select track_k, date as time , count(track_k) as conteo from twits where DATE(date) = CURRENT_DATE group by round(UNIX_TIMESTAMP(date) / 3600), track_k");
            $epn = array();
            $amlo = array();
            $jvm = array();
            $quadri = array();
            foreach ($data as $row){
                if($row->track_k == "@EPN"){

                }
            }*/
            $arr = array(
                "data"=> $this->getData("select track_k, date as time , count(track_k) as conteo from twits where DATE(date) = CURRENT_DATE group by round(UNIX_TIMESTAMP(date) / 3600), track_k"),
                "success"=>true
            );

            echo json_encode($arr);
        }

        function getPieCharts($track,$start,$limit){
            $arr = array(
                "data"=>$this->getData(str_replace("@user", $track, $this->sqlTotal."limit {$start},{$limit}")),
                "success"=>true
            );
            echo json_encode($arr);
        }

        function getTopHashtags(){
			$arr = array(
				"data"=>$this->getData("select * from hashtags order by total DESC limit 50"),
				"success"=>true
				);
				
			echo json_encode($arr);
		}

        function getTopRetweets(){
            $arr = array(
                "data"=>$this->getData("select * from retwits order by total DESC limit 50"),
                "success"=>true
            );

            echo json_encode($arr);
        }

        function getTopUrls(){
            $arr = array(
                "data"=>$this->getData("select * from urls order by total DESC limit 50"),
                "success"=>true
            );

            echo json_encode($arr);
        }
		
		function getHowMany(){
			$arr = array(
				"data"=>$this->getData("select * from tracks where date=CURRENT_DATE"),
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
        case '3':
            $api->getTopHashtags();
        break;
        case '4':
            $api->getTopRetweets();
        break;
        case '5':
            $api->getTopUrls();
        break;
        case '6':
            $api->getTweetCharts();
        break;
        case '7':
            $candidato = $_GET['typec'];
            $start = $_GET['start'];
            $api->getPieCharts($c[$candidato],$start,LIMIT);
            break;
        case '8':
			$api->getMapsMarkers();
		break;

	}
?>