<?php
/**
 * Created by CodeTlan.
 * User: Ing. Miguel Salas
 * Date: 5/13/12
 * Time: 7:19 PM
 */

    date_default_timezone_set("America/Mexico_City");

    //Datos de para la conexión de la base de datos
    define("USER","codetlan_analitw");
    define("PASS","(t}=EnR(I=E)");
    define("SERVER","174.142.75.228");
    define("DATABASE","codetlan_analitweets");
	define("LIMIT",50);

    //Cuentas válidas de twitter
    $accounts= array(
        "ACCOUNT1" => array("USER" => "Politwitsmx1","PASS" => "codetlanpolitwitsmx.1-", "ACTIVE" => 0),
        "ACCOUNT2" => array("USER" => "Politwitsmx2","PASS" => "codetlanpolitwitsmx.2-", "ACTIVE" => 0),
        "ACCOUNT3" => array("USER" => "Politwitsmx3","PASS" => "codetlanpolitwitsmx.3-", "ACTIVE" => 0),
        "ACCOUNT4" => array("USER" => "Politwitsmx4","PASS" => "codetlanpolitwitsmx.4-", "ACTIVE" => 0)
    );

    //Define el server y el servicio streaming que vamos a utilizar de twitter
    define("TWSERVER","stream.twitter.com/");
    define("TWSERVICE","1/statuses/filter.json");

    //Cuenta valida de gmail para enviar correos de avisos
    define("EMAIL","politwitsmx@gmail.com");
    define("EMAILPASS","mQ9tB2MfTUsKPe");
?>