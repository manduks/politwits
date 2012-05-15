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
    //include("blacklist.php");

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

                        //El nombre que muestra en twitter
                        $tweet->user->screen_name=$util->filterSpecials($tweet->user->screen_name);



                    //if(!empty($tweet->user->id_str) && !empty($tweet->text) && $tweet->user->screen_name == 'hellreuter_' ){
                        $negative=$this->isNegative($tweet);
                        $this->tweet($track,$tweet,$negative);
                        $this->resumen($track,$negative);
                        $this->hashtags($track,$tweet);
                        $this->urls($track,$tweet);
                        //print_r($tweet);
                    }
                    flush();
                }
            }
        }

        //Este metodo se encarga de buscar las palabras dentro del tweet que coincidan con el blacklist para valorar
        //si este es negativo o no, los unicos tweet que son clasificados como negativos son los que solo tienen
        //UNA mencion de los tracks
        function isNegative($tweet){
            return 0;
        }

        //Inserta el tweet que contiene el track
        function tweet($track,$tweet,$negative){

            $this->ejecutar("
                insert into twits (
                    track_k,
                    user_k,
                    tweet,
                    negative,
                    date,
                    location,
                    screen_name,
                    reply_to
                )
                values (
                    '$track',
                    '".$tweet->user->id_str."',
                    '".$tweet->text."',
                    $negative,
                    '".date('Y-m-d H:i:s')."',
                    '".$tweet->place->full_name."',
                    '".$tweet->user->screen_name."',
                    '".$tweet->in_reply_to_user_id_str."'
                )"
            );
        }

        //Actualiza el resumen de los tracks incrementando el número de twits y/o el número de twits negativos por dia
        function resumen($track,$negative){

            $result=$this->ejecutar("select no_twits,negatives from tracks where track_k='".$track."' and date='".date('Y-m-d')."'");
            if(mysql_num_rows($result) > 0){
                $row=mysql_fetch_object($result);
                $this->ejecutar("update tracks set no_twits=".($row->no_twits + 1).", negatives=".($row->negative + $negative)." where track_k='".$track."' and fecha='".date('Y-m-d')."'");
            }else{
                $this->ejecutar('insert into tracks (track_k, no_twits,negatives,date) values ("'.$track.'",1,'.$negative.',"'.date("Y-m-d").'")');
            }
        }

        //Valida que un tweet contenga hashtags (ht), urls (u) o que sea un retweet (rt)
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
            }
            return false;

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

    }

    //Se instancia la clase
    $mon= new Monitor($argv);

?>