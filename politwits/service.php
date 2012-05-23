<?php
/**
 * Created by CodeTlan.
 * User: Ing. Miguel Salas
 * Date: 5/13/12
 * Time: 7:19 PM
 */

    //define("PATH","/home/miguelsalasmx/public_html/politwits/politwits/");
    //define("PATH","/home/codetlan/system/");


    include("config.php");
    include("util.php");

    class Service{

        function __construct(){
            $tracks=array(
                "@EPN",
                "@JosefinaVM",
                "@lopezobrador_",
                "@G_quadri"
            );
            $this->monitorProcess($tracks);
        }

        //Detiene todos los procesos corriendo que esten monitoreando los tracks
        function killProcess(){
            exec("kill $(ps ax | grep 'analitweets.php' | cut -f2 -d' ')");
            exec("kill $(ps ax | grep 'monitor.php' | cut -f2 -d' ')");
        }

        //Levanta los procesos requeridos
        function start($tracks,$restart=NULL){

            $util=new Util();
            $this->killProcess();

            if(!$restart){
                echo "\nStarting...\n";
                $util->sendMail(EMAIL_INFO,'System Start','Starting...');

            }
            else{
                $util->sendMail(EMAIL_INFO,'System Down','Restarting...');
                echo "\nRestarting...\n";
            }

            $command="php analitweets.php --track=@EPN,@JosefinaVM,@lopezobrador_,@G_quadri";//.implode(",", $tracks);

            exec($command);
            //echo $command;
        }

        //Inicia el proceso de monitoreo y verifica cada 2 segundos si estan corriendo, en caso contrario
        //reinicia los procesos
    function monitorProcess($tracks){

            $this->start($tracks);

            while(true){

                $proc=NULL;
                sleep(2);
                exec("ps ax | grep 'analitweets.php'",$proc);
                if(count($proc) < 2 )
                    $this->start($tracks, true);

                $proc=NULL;
                sleep(2);
                exec("ps ax | grep 'monitor.php'",$proc);
                if(count($proc) < ( 2 + count($tracks)))
                    $this->start($tracks, true);
            }
        }


    }
    $serv=new Service();

?>