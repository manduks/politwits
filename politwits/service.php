<?php
/**
 * Created by CodeTlan.
 * User: Ing. Miguel Salas
 * Date: 5/13/12
 * Time: 7:19 PM
 */

    //define('PATH','/home/miguelsalasmx/public_html/politwits/politwits/');
    define("PATH","/home/codetlan/system/");

    require_once( PATH.'config.php' );
    require_once( PATH.'util.php' );
    require_once( PATH.'Thread.php' );



    class Service{

        function __construct(){

            global $tracks;
            global $accounts;

            if( ! Thread::available() ) {
                die( 'Threads not supported' );
            }


            $this->monitorProcess($accounts,$tracks);
        }

        function test($track,$path,$user,$pass){
            echo "Track: $track\n";
            echo "Path: $path\n";
            echo "User: $user\n";
            echo "Pass: $pass\n";
        }

        //Levanta los demonios requeridos por la cantidad de tracks
        function process($track,$path,$user,$pass){
            $command = "php ".$path."monitor.php --track=".$track." --user=".$user." --pass=".$pass." --path=".$path;
            exec($command);
        }

        //Inicia el proceso de monitoreo y verifica cada 2 segundos si estan corriendo, en caso contrario
        //reinicia el demonio
        function monitorProcess($accounts,$tracks){

            $util=new Util();

            $threads=Array();

            //Valida que exista la misma cantidad de cuentas con respecto a los tracks
            if(count($accounts) < count($tracks)){
                echo "\nERROR => Lo sentimos, necesita tener ".count($tracks)." cuentas de twitter, actualmente existen: ".count($accounts)."\n\n";
                exit;
            }

            //Creando los arreglo de threads,accounts y tracks
            foreach ($tracks as $k){
               array_push($threads, array(new Thread($this,'process'),$util->getValidAccount(),$k));
            }

            $s = "";
            //Iniciando demonios
            foreach ($threads as $k => $v){
                $v[0]->start($v[2],PATH,$v[1]['USER'],$v[1]['PASS']);
                $i = "Starting daemon...\tPID: ".$v[0]->getPid()."\tTrack: $v[2]\tAccount: ".$v[1]['USER']."\n";
                $s .= $i;
                echo $i;
                sleep(1);
            }

            //Envia correo que el sistema se ha iniciado
            $util->sendMail(EMAIL_INFO,'System Start',$s);

            while( true ) {
                foreach ($threads as $k => $v){
                    sleep(1);

                    //Valida si un demonio esta caido
                    if(!$threads[$k][0]->isAlive()){

                        //Reinicia un demonio
                        $threads[$k][0]->start($threads[$k][2],PATH,$threads[$k][1]['USER'],$threads[$k][1]['PASS']);

                        $i = "Restarting daemon...\tPID: ".$threads[$k][0]->getPid()."\tTrack: ".$threads[$k][2]."\tAccount: ".$threads[$k][1]['USER']."\n";
                        echo $i;

                        //Envia correo que un daemon se ha reiniciado
                        $util->sendMail(EMAIL_INFO,'System Restarting',$i);
                    }
                }

            }

            exit;

        }


    }

    $serv=new Service();

?>
