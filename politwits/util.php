<?php
/**
 * Created by CodeTlan.
 * User: Ing. Miguel Salas
 * Date: 5/13/12
 * Time: 7:19 PM
 */

    include("class.phpmailer.php");

    class Util{

        //Obtiene los argumentos pasados desde consola
        function getArgs($args) {
            $out = array();
            $last_arg = null;
            for($i = 1, $il = sizeof($args); $i < $il; $i++) {
                if( (bool)preg_match("/^--(.+)/", $args[$i], $match) ) {
                    $parts = explode("=", $match[1]);
                    $key = preg_replace("/[^a-z0-9]+/", "", $parts[0]);
                    if(isset($parts[1])) {
                        $out[$key] = $parts[1];
                    }
                    else {
                        $out[$key] = true;
                    }
                    $last_arg = $key;
                }
                else if( (bool)preg_match("/^-([a-zA-Z0-9]+)/", $args[$i], $match) ) {
                    for( $j = 0, $jl = strlen($match[1]); $j < $jl; $j++ ) {
                        $key = $match[1]{$j};
                        $out[$key] = true;
                    }
                    $last_arg = $key;
                }
                else if($last_arg !== null) {
                    $out[$last_arg] = $args[$i];
                }
            }
            return $out;
        }

        //Regresa una cuenta que no esté siendo utilizada
        function getValidAccount(){
            global $accounts;
            foreach ($accounts as $key => $value) {
                foreach ($value as $k => $v) {
                    if($k == "ACTIVE" && $v==0){
                        $accounts[$key][$k]=1;
                        return $accounts[$key];
                    }
                }
            }
            return false;
        }

        //Envia un email
        function sendMail($to,$subject,$body){
            $mail = new PHPMailer();
            $mail->Host = "smtp.gmail.com";
            $mail->Port = 465;
            $mail->SMTPSecure = "ssl";
            $mail->IsSMTP();
            $mail->SMTPAuth = true;
            $mail->Username = EMAIL;
            $mail->Password = EMAILPASS;
            $mail->From = "politwitsmx@gmail.com";
            $mail->FromName = "Sistema Politwits";
            $mail->AddAddress($to,$to);
            $mail->AddReplyTo(EMAIL,"Sistema Politwits");
            $mail->Subject = $subject;
            $mail->Body = $body;
            $mail->Send();
        }

        //Valida si una cadena es UTF8 o no
        function isUTF8 ($string) {
            $c=0; $b=0;
            $bits=0;
            $len=strlen($string);
            for($i=0; $i<$len; $i++){
                $c=ord($string[$i]);
                if($c > 128){
                    if(($c >= 254)) return false;
                    elseif($c >= 252) $bits=6;
                    elseif($c >= 248) $bits=5;
                    elseif($c >= 240) $bits=4;
                    elseif($c >= 224) $bits=3;
                    elseif($c >= 192) $bits=2;
                    else return false;
                    if(($i+$bits) > $len) return false;
                    while($bits > 1){
                        $i++;
                        $b=ord($string[$i]);
                        if($b < 128 || $b > 191) return false;
                        $bits--;
                    }
                }
            }
            return true;
        }

        //Valida los caracteres especiales y UTF8
        function filterSpecials($data){

            if($this->isUTF8($data))
                $data = utf8_decode($data);
            $data = htmlspecialchars($data, ENT_QUOTES);

            return $data;
        }
    }
?>