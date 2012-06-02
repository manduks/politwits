<?php
/**
 * Created by CodeTlan.
 * User: Ing. Miguel Salas
 * Date: 5/15/12
 * Time: 1:05 AM
 */

    //define('PATH','/home/miguelsalasmx/public_html/multihilos/');
    define("PATH","/home/codetlan/system/");

    include(PATH."config.php");
    include(PATH."libMySql.php");
    include(PATH."tmhOAuth/tmhOAuth.php");
    include(PATH."util.php");

    class Bot extends libMySql{

        function __construct(){
            $tweet_text = $this->generateTweet();
            $this->tweet($tweet_text);
        }

        function generateTweet(){
            $data=$this->getDataResumen();

            $text="Tweets analizados: ".$data['analizados'].", ";
            $text.="Negativos: ".$data['negativos'].", ";
            $text.="Topic: ".$data['hashtag'].", ";
            $text.="Retweets: ".$data['retweets']." ";
            $text.="http://goo.gl/8Va2S ";
            $text.="#analitweets";
            return $text;
        }

        function tweet($tweet_text){

            $util=New Util();

            $tmhOAuth = new tmhOAuth(array(
                'consumer_key'    => 'j9NM54UpASeESPWoJd8Edg',
                'consumer_secret' => 'e2B2chIQ8utuomwcwxQyrCjwpCqwmcQ2pQS5ZQ2GU',
                'user_token'      => '580607323-lQuf4GiSBThAA6F6hfkf8uH1uWtfJLmHsZTYXhD0',
                'user_secret'     => 'KE7pFpen7fggdeXvNsGg8FaBjYVOkJKa0TANYHKmNE',
            ));

            $code = $tmhOAuth->request('POST', $tmhOAuth->url('1/statuses/update'), array(
                'status' => $tweet_text
            ));

            if ($code == 200) {
                echo "OK";
                $util->sendMail("miguel@codetlan.com",'Tweet OK',$tweet_text);
            } else {
                $util->sendMail("miguel@codetlan.com",'Tweet ERROR',$tweet_text);
                echo "ERROR";
            }
            exit;
        }

        function getDataResumen(){
            $data=array();

            //Tweets analizados por dia
            $result=$this->ejecutar("select count(tweet_k) as total from twits where date(date)=CURRENT_DATE");
            if(mysql_num_rows($result)>0){
                $result=mysql_fetch_object($result);
                $data['analizados']=$result->total;
            }
            else
                $data['analizados']=0;

            //Negativos
            $result=$this->ejecutar("select count(tweet_k) as total from twits where date(date)=CURRENT_DATE and negative=1");
            if(mysql_num_rows($result)>0){
                $result=mysql_fetch_object($result);
                $data['negativos']=$result->total;
            }
            else
                $data['negativos']=0;

            //Hashtag
            $result=$this->ejecutar("select hashtag from hashtags where date(date) = CURRENT_DATE order by total desc limit 1");
            if(mysql_num_rows($result)>0){
                $result=mysql_fetch_object($result);
                $data['hashtag']="#".$result->hashtag;
            }
            else
                $data['hashtag']='';

            //Reweets
            $result=$this->ejecutar("select sum(total) as total from retwits where date(date)=CURRENT_DATE");
            if(mysql_num_rows($result)>0){
                $result=mysql_fetch_object($result);
                $data['retweets']=$result->total;
            }
            else
                $data['retweets']=0;

            return $data;
        }
    }
    $bot=New Bot();
?>