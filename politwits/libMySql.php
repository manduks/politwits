<?php
/**
 * Created by CodeTlan.
 * User: Ing. Miguel Salas
 * Date: 5/13/12
 * Time: 7:19 PM
 */

    class LibMySql{

        //Conecta a la base de datos
        function conectar(){
            if (!($link=mysql_connect(SERVER,USER,PASS))){
                echo "Error conectando a la base de datos.";
                exit();
            }
            if(!mysql_select_db(DATABASE,$link)){
                echo "Error seleccionando la base de datos.";
                exit();
            }
            return $link;
        }

        //Desconecta de la base de datos
        function desconectar($link){
            mysql_close($link);
        }

        //Ejecuta un query
        function ejecutar($query){
            $link = $this->conectar();
            $result=mysql_query($query);
            echo mysql_error();
            $this->desconectar($link);
            return $result;
        }
		//obtiene el resultado en un indice de la consulta regularmente siempres es el 0
		function getResult($result,$index=0){
			if(mysql_num_rows($result)){
			 	return mysql_result($result, $index);
			}
			return 0;
		}
		
		function getData($query){
			$result = $this->ejecutar($query);
			if(mysql_num_rows($result)){
				while($row = mysql_fetch_assoc($result)){
					$data[] = $row;
				}
			}				
			return $data;
		}

    }
?>