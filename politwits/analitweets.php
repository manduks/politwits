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

    class Analitweets Extends LibMySql{

        function __construct($argv){

            global $accounts;

            if(count($argv) == 3){
                $util = new Util();
                $args = $util->getArgs($argv);
                if(array_key_exists('track',$args)){
                    $tracks = explode(',' , $args['track']);
                    if(count($tracks) <= count($accounts)){

                        $command="";

                        foreach($tracks as $k => $v){
                            $account = $util->getValidAccount();
                            $command .= "php monitor.php --track=".$v." --user=".$account["USER"]." --pass=".$account["PASS"]." & sleep 1; ";
                        }

                        //echo $command;
                        exec($command);
                    }
                    else{
                        echo "\nERROR => Lo sentimos, necesita agregar mas cuentas de twitter, actualmente existen ".count($accounts)."\n\n";
                    }
                }
                else
                    echo "\nERROR => Te hizo falta pasar el argumento --track. Ejemplo: php twitter_streaming.php --track=@track1,@track2\n\n";
            }
            else{
                echo "\nERROR => Se necesita un argumento. Ejemplo: php twitter_streaming.php --track=@track1,@track2\n\n";
            }
        }
    }
    
    //Se instancia la clase
    $analitweets= new Analitweets($argv);
?>