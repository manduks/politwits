<?php
/**
 * Created by CodeTlan.
 * User: Ing. Miguel Salas
 * Date: 5/13/12
 * Time: 7:19 PM
 */

    include("config.php");
    include("util.php");

    class Service{

        function __construct(){
            $this->monitorProcess();
        }

        //Detiene todos los procesos corriendo que esten monitoreando los tracks
        function killProcess(){
            exec("kill $(ps x | grep 'php politwits.php' | cut -f1 -d' ')");
            exec("kill $(ps x | grep 'php monitor.php' | cut -f1 -d' ')");
        }

        //Levanta los procesos requeridos
        function start(){

            $util=new Util();

            $util->sendMail("miguel@codetlan.com",'System Start','Starting...');

            $this->killProcess();

            exec("php politwits.php --track=@EPN,@JosefinaVM,@G_quadri,@lopezobrador_");



        }

        function restart(){

            $util=new Util();

            $util->sendMail("miguel@codetlan.com",'System Down','Restarting...');

            $this->killProcess();

            exec("php politwits.php --track=@EPN,@JosefinaVM,@G_quadri,@lopezobrador_");

        }

        function monitorProcess(){

            $this->start();

            while(true){
                $proc=NULL;
                sleep(2);
                exec("ps x | grep 'php politwits.php'",$proc);
                if(count($proc)==2)
                    $this->restart();

                $proc=NULL;
                sleep(2);
                exec("ps x | grep 'php monitor.php'",$proc);
                if(count($proc) < 6)
                    $this->restart();

            }
        }


    }
    $serv=new Service();

?>