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
		
		var $sqlTweets = "select * from twits where track_k='@user' order by tweet_k desc ";
		var $numTweets = "select no_twits from tracks where track_k='@user' and date=CURRENT_DATE ";
        var $sqlEstadisticas = "select *, ROUND((users*100)/total, 2) as porcentaje from hashtags where track_k='@user' and date=CURRENT_DATE group by hashtag, track_k order by total DESC ";

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

        function getTopHashtags(){
            $arr = array(
                "data"=>$this->getData("select hashtag,sum(users) as users,sum(total) as total from hashtags where date=CURRENT_DATE group by hashtag order by total DESC limit 10"),
                "success"=>true
            );

            echo json_encode($arr);
        }

        function getTopRetweets(){
            $arr = array(
                "data"=>$this->getData("select id_str,retweet,sum(total) as total from retwits where date=CURRENT_DATE group by retweet order by total DESC limit 10"),
                "success"=>true
            );

            echo json_encode($arr);
        }

        function getTopUrls(){
            $arr = array(
                "data"=>$this->getData("select url,sum(total) as total from urls where date=CURRENT_DATE group by url order by total DESC limit 10"),
                "success"=>true
            );

            echo json_encode($arr);
        }

        function getLineCharts(){
            $arr = array(
                "data"=> $this->getData("select aux1.time, conteo1 as 'data1', conteo2 as 'data2', conteo3 as 'data3', conteo4 as 'data4' from
                                        (
                                            (
                                            select pre1.time, pre1.conteo as conteo1 from
                                                (select track_k, round(DATE_FORMAT(date, '%H%i'), -2) as time , count(track_k) as conteo from twits where DATE(date) = CURRENT_DATE and track_k='@JosefinaVM' group by round(UNIX_TIMESTAMP(date) / 1800), track_k) as pre1
                                            ) as aux1
                                            ,(
                                            select pre2.time, pre2.conteo as conteo2 from
                                                (select track_k, round(DATE_FORMAT(date, '%H%i'), -2) as time , count(track_k) as conteo from twits where DATE(date) = CURRENT_DATE and track_k='@G_quadri'group by round(UNIX_TIMESTAMP(date) / 1800), track_k) as pre2
                                            ) as aux2
                                            ,(
                                            select pre3.time, pre3.conteo as conteo3 from
                                                (select track_k, round(DATE_FORMAT(date, '%H%i'), -2) as time , count(track_k) as conteo from twits where DATE(date) = CURRENT_DATE and track_k='@EPN' group by round(UNIX_TIMESTAMP(date) / 1800), track_k) as pre3
                                            ) as aux3,
                                            (
                                            select pre4.time, pre4.conteo as conteo4 from
                                                (select track_k, round(DATE_FORMAT(date, '%H%i'), -2) as time , count(track_k) as conteo from twits where DATE(date) = CURRENT_DATE and track_k='@lopezobrador_'group by round(UNIX_TIMESTAMP(date) / 1800), track_k) as pre4
                                            ) as aux4
                                        ) where aux1.time = aux2.time and aux1.time = aux3.time and aux1.time = aux4.time and aux4.time <= 900 group by time "),
                "success"=>true
            );

            echo json_encode($arr);
        }

        function getPieCharts(){
            $arr = array(
                "data"=>$this->getData("select track_k as name, no_twits as data from tracks where date=CURRENT_DATE"),
                "success"=>true
            );
            echo json_encode($arr);
        }

        function getBarCharts(){
            $arr = array(
                "data"=>$this->getData("SELECT track_k as name, (no_twits-negatives) as sinclasificar, negatives as negativos FROM tracks where date = CURRENT_DATE;"),
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

        function getEstadisticaHashtag($track,$start,$limit){
            $arr = array(
                "data"=>$this->getData(str_replace("@user", $track, $this->sqlEstadisticas."limit {$start},{$limit}")),
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
            $api->getLineCharts();
        break;
        case '7':
            $api->getPieCharts();
        break;
		case '8':
			$api->getMapsMarkers();
		break;
        case '9':
            $api->getBarCharts();
        break;
        case '10':
            $api->getEstadisticaHashtag($c[$candidato],$start,10);
        break;
	}
?>