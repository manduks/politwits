<?php
/**
 * Created by CodeTlan.
 * User: Ing. Miguel Salas
 * Date: 5/23/12
 * Time: 1:21 PM
 */

    include("politwits/api.php");

    $result=$api->getData("select * from tracks where date=CURRENT_DATE");
    if(count($result)!=4)
        exit;
?>

<!doctype html>
<html>
<head>
    <title>AnaliTweets</title>
    <meta charset="utf-8" />
    <!--link rel="stylesheet" href="http://cdn.sencha.io/ext-4.1.0-gpl/resources/css/ext-all.css" /-->
    <link rel="stylesheet" href="assets/css/bootstrap.css" type="text/css" />
    <link rel="stylesheet" href="assets/css/codetlan.css" type="text/css" />
    <script type="text/javascript">

        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-31605697-1']);
        _gaq.push(['_trackPageview']);

        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();

    </script>
</head>
<body>
    <script type="text/javascript">
        document.body.style.backgroundColor=parent.document.getElementById("analitweets").style.backgroundColor;
        setTimeout("location.reload(true);",20000);
    </script>
    <a href="http://www.analitweets.com" target="_blank" style="text-decoration: none;">
    <div>
        <div class="candidato" style="float:left;">
            <div class="contenedor-centro" style="width:210px;">
                <div class="tweets" style="width:50px;">
                    <h3>Tweets</h3>
                    <p id="obrtweets" class="label label-warning" style="font-size:12px;"><?php echo $result[2]["no_twits"];?></p>
                </div>

                    <div class="recuadro">
                        <div class="imagen obr-imagen"></div>
                        <div class="nombre"><h5>@lopezobrador_</h5></div>
                    </div>

                <div class="negativos" style="width:50px;">
                    <h3>Negativos</h3>
                    <p id="obrnegativos" class="label label-warning" style="font-size:12px;"><?php echo $result[2]["negatives"];?></p>
                </div>
            </div>
        </div>

        <div class="candidato" style="float:left;">
            <div class="contenedor-centro" style="width:210px;">
                <div class="tweets" style="width:50px;">
                    <h3>Tweets</h3>
                    <p id="quadritweets" class="label" style="font-size:12px;"><?php echo $result[3]["no_twits"];?></p>
                </div>

                    <div class="recuadro">
                        <div class="imagen quadri-imagen"></div>
                        <div class="nombre"><h5>@g_quadri</h5></div>
                    </div>

                <div class="negativos" style="width:50px;">
                    <h3>Negativos</h3>
                    <p id="quadrinegativos" class="label"  style="font-size:12px;"><?php echo $result[3]["negatives"];?></p>
                </div>
            </div>
        </div>

        <div class="candidato" style="float:left;">
            <div class="contenedor-centro" style="width:210px;">
                <div class="tweets" style="width:50px;">
                    <h3>Tweets</h3>
                    <p id="epntweets" class="label label-success" style="font-size:12px;"><?php echo $result[0]["no_twits"];?></p>
                </div>

                    <div class="recuadro">
                        <div class="imagen epn-imagen"></div>
                        <div class="nombre"><h5>@epn</h5></div>
                    </div>

                <div class="negativos" style="width:50px;">
                    <h3>Negativos</h3>
                    <p id="epnnegativos" class="label label-success" style="font-size:12px;"><?php echo $result[0]["negatives"];?></p>
                </div>
            </div>
        </div>

        <div class="candidato"style="float:left;">
            <div class="contenedor-centro" style="width:210px;">
                <div class="tweets" style="width:50px;">
                    <h3>Tweets</h3>
                    <p id="jvmtweets" class="label label-info" style="font-size:12px;"><?php echo $result[1]["no_twits"];?></p>
                </div>

                    <div class="recuadro">
                        <div class="imagen jvm-imagen"></div>
                        <div class="nombre"><h5>@josefinavm</h5></div>
                    </div>

                <div class="negativos" style="width:50px;">
                    <h3>Negativos</h3>
                    <p id="jvmnegativos" class="label label-info" style="font-size:12px;"><?php echo $result[1]["negatives"];?></p>
                </div>
            </div>
        </div>
    </div>
    <div style="clear:both; margin-left: 10px;">Powered by @codetlan</div>
    </a>

</body>
</html>