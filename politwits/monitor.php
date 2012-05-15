<?php
/**
 * Created by CodeTlan.
 * User: Ing. Miguel Salas
 * Date: 5/13/12
 * Time: 7:19 PM
 */

    include("config.php");
    include("libMySql.php");
    include("util.php");
    include("wordlist.php");

    class Monitor Extends LibMySql{

        //Valida que los los parametros sean los necesarios antes de iniciar cualquier conexion con Twitter Streaming
        function __construct($argv){

            if(count($argv) == 4){
                $util = new Util();
                $args = $util->getArgs($argv);
                if(array_key_exists('track',$args) && array_key_exists('user',$args) && array_key_exists('pass',$args)){
                    $this->start($args['track'],$args['user'],$args['pass']);
                }
                else
                    echo "1";
            }
            else
                echo "0";
        }

        //Inicia el streaming con el API de Twitter
        function start($track,$user,$pass){

            $util=New Util();

            $opts = array(
                'http'=>array(
                    'method'    =>    "POST",
                    'content'    =>    'track='.$track
                )
            );
            $context = stream_context_create($opts);
            $instream = fopen('https://'.$user.':'.$pass.'@'.TWSERVER.''.TWSERVICE,'r' ,false, $context);
            while(! feof($instream)) {
                if(! ($line = stream_get_line($instream, 20000, "\n"))) {
                    continue;
                }else{
                    $tweet = json_decode($line);
                    if(!empty($tweet->user->id_str) && !empty($tweet->text)){

                        //El contenido del tweet
                        $tweet->text=$util->filterSpecials($tweet->text);

                        //La ubicacion en la que se encuentra
                        $tweet->place->full_name=$util->filterSpecials($tweet->place->full_name);

                        //Las coordenadas donde se encuentra
                        $tweet->geo->coordinates[0]=$util->filterSpecials($tweet->geo->coordinates[0]);
                        $tweet->geo->coordinates[1]=$util->filterSpecials($tweet->geo->coordinates[1]);

                        //El nombre que muestra en twitter
                        $tweet->user->screen_name=$util->filterSpecials($tweet->user->screen_name);

                        //La imagen que tiene en el profile a la hora de twittear
                        $tweet->user->profile_image_url=$util->filterSpecials($tweet->user->profile_image_url);



                    //if(!empty($tweet->user->id_str) && !empty($tweet->text) && $tweet->user->screen_name == 'hellreuter_' ){
                        $negative=$this->isNegative($tweet);
                        $retweet=$this->isRetweet($tweet);
                        $this->tweet($track,$tweet,$negative,$retweet);
                        $this->resumen($track,$negative);
                        $this->hashtags($track,$tweet);
                        $this->urls($track,$tweet);
                        $this->retweets($track,$tweet);
                        //if($tweet->retweet_count > 0)
                        //    print_r($tweet);
                    }
                    flush();
                }
            }
        }

        //Valida que un tweet contenga hashtags (ht), urls (u), que sea un retweet (rt) o que tenga solo una mension (um)
        function hasEntities($tweet,$entity){

            switch($entity){
                case 'ht':
                    if( is_array($tweet->entities->hashtags) && count($tweet->entities->hashtags) > 0 )
                        return true;
                    break;
                case 'u':
                    if( is_array($tweet->entities->urls) && count($tweet->entities->urls) > 0 )
                        return true;
                    break;
                case 'um':
                    if(is_array($tweet->entities->user_mentions) && count($tweet->entities->user_mentions) == 1 )
                        return true;
                    break;
                case 'rt':
                    if($tweet->retweet_count > 0)
                        return true;
                    break;
            }
            return false;

        }

        //Este metodo se encarga de buscar las palabras dentro del tweet que coincidan con el blacklist para valorar
        //si este es negativo o no, los unicos tweet que son clasificados como negativos son los que solo tienen
        //UNA mencion de los tracks
        function isNegative($tweet){

            global $blacklist;

            $util=New Util();


            if($this->hasEntities($tweet,'um')){

                $data=explode(" ", $util->sanitize($tweet->text));

                foreach($data as $k => $v){
                    if (in_array($v, $blacklist))
                        return 1;
                }
            }
            return 0;
        }

        //Valida si es un retweet
        function isRetweet($tweet){
            if($tweet->retweet_count>0)
                return 1;
            return 0;
        }

        //Inserta el tweet que contiene el track
        function tweet($track,$tweet,$negative,$retweet){

            $this->ejecutar("
                insert into twits (
                    track_k,
                    user_k,
                    tweet,
                    negative,
                    date,
                    location,
                    geo_x,
                    geo_y,
                    screen_name,
                    image,
                    retweet,
                    reply_to
                )
                values (
                    '$track',
                    '".$tweet->user->id_str."',
                    '".$tweet->text."',
                    $negative,
                    '".date('Y-m-d H:i:s')."',
                    '".$tweet->place->full_name."',
                    '".$tweet->geo->coordinates[0]."',
                    '".$tweet->geo->coordinates[1]."',
                    '".$tweet->user->screen_name."',
                    '".$tweet->user->profile_image_url."',
                    $retweet,
                    '".$tweet->in_reply_to_user_id_str."'
                )"
            );
        }

        //Actualiza el resumen de los tracks incrementando el número de twits y/o el número de twits negativos por dia
        function resumen($track,$negative){

            $result=$this->ejecutar("select no_twits,negatives from tracks where track_k='".$track."' and date='".date('Y-m-d')."'");
            if(mysql_num_rows($result) > 0){
                $row=mysql_fetch_object($result);
                $this->ejecutar("update tracks set no_twits=".($row->no_twits + 1).", negatives=".($row->negatives + $negative)." where track_k = '".$track."' and date = '".date('Y-m-d')."'");
            }else{
                $this->ejecutar('insert into tracks (track_k, no_twits,negatives,date) values ("'.$track.'",1,'.$negative.',"'.date("Y-m-d").'")');
            }
        }



        //Asocia los hashtags a un track e incrementa el numero de veces que ha sido utilizado por dia
        function hashtags($track,$tweet){

            $util=New Util();

            if($this->hasEntities($tweet,'ht')){
                foreach($tweet->entities->hashtags as $k => $v){
                    $v->text=$util->filterSpecials($v->text);
                    $result=$this->ejecutar("select hashtag_k,total,date from hashtags where track_k='".$track."' and hashtag='".$v->text."' and date='".date('Y-m-d')."'");
                    if(mysql_num_rows($result)>0){
                        $result=mysql_fetch_object($result);
                        $this->ejecutar("update hashtags set total=".($result->total+1)." where hashtag_k=".$result->hashtag_k);
                    }
                    else{
                        $this->ejecutar("insert into hashtags (track_k, hashtag,total,date) values ('".$track."','".htmlentities($v->text,ENT_QUOTES)."',1,'".date('Y-m-d')."')");
                    }
                }
            }

        }

        //Asocia los urls a un track e incrementa el numero de veces que ha sido utilizado por dia
        function urls($track,$tweet){

            $util=New Util();

            if($this->hasEntities($tweet,'u')){
                foreach($tweet->entities->urls as $k => $v){

                    $v->expanded_url=$util->filterSpecials($v->expanded_url);

                    $result=$this->ejecutar("select url_k,total,date from urls where track_k='".$track."' and url='".$v->expanded_url."' and date='".date('Y-m-d')."'");
                    if(mysql_num_rows($result) > 0){
                        $result = mysql_fetch_object($result);
                        $this->ejecutar("update urls set total = ".($result->total+1)." where url_k = ".$result->url_k);
                    }
                    else{
                        $this->ejecutar("insert into urls(track_k, url,total,date) values ('".$track."','".$v->expanded_url."',1,'".date('Y-m-d')."')");
                    }
                }
            }
        }

        //Asocia los retweets a un track e incrementa el numero de veces que ha sido utilizado por dia
        function retweets($track,$tweet){

            $util=New Util();

            if($this->hasEntities($tweet,'rt')){

                $tweet->retweeted_status->text=$util->filterSpecials($tweet->retweeted_status->text);

                $result=$this->ejecutar("select retweet_k,total,date from retwits where track_k='".$track."' and retweet='".$tweet->retweeted_status->text."' and date='".date('Y-m-d')."'");

                if(mysql_num_rows($result) > 0){

                    $result = mysql_fetch_object($result);
                    $this->ejecutar("update retwits set total = ".($result->total + 1)." where retweet_k = ".$result->retweet_k);
                }
                else{
                    $this->ejecutar("insert into retwits(track_k, retweet,total,date) values ('".$track."','".$tweet->retweeted_status->text."',1,'".date('Y-m-d')."')");
                }
            }
        }

    }

    //Se instancia la clase
    $mon= new Monitor($argv);

?>