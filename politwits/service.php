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
            while(true){
                $proc=NULL;
                sleep(2);
                exec("ps x | grep 'php politwits.php'",$proc);
                if(count($proc)==2){
                    $util=new Util();

                    $util->sendMail("miguel@codetlan.com",'ME CAI','LEVANTEME PENDEJO');
                    $util->sendMail("rodrigo@codetlan.com",'ME CAI','LEVANTEME PENDEJO');
                    $util->sendMail("enrique@codetlan.com",'ME CAI','LEVANTEME PENDEJO');
                    $util->sendMail("eduardo@codetlan.com",'ME CAI','LEVANTEME PENDEJO');
                    $util->sendMail("armando@codetlan.com",'ME CAI','LEVANTEME PENDEJO');
                    $util->sendMail("oswaldo@codetlan.com",'ME CAI','LEVANTEME PENDEJO');

                    exec("kill $(ps x | grep 'php monitor.php' | cut -f1 -d' ')");

                    exit;

                }
            }
        }
    }
    $serv=new Service();

?>