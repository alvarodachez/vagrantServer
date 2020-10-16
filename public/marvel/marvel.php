<?php
    $conn = NULL;
        try{

            $con = new PDO("mysql:host=localhost; dbname=marvel; charset=utf8", 'root', 'root');

            if(isset($_GET['id'])){
                $id = $_GET['id'];
                $sql = "SELECT * FROM characters WHERE id=$id";
            }elseif(isset($_GET['alignment']) && isset($_GET['gender'])){
                $alignment = $_GET['alignment'];
                $gender = $_GET['gender'];
                $sql = "SELECT * FROM characters WHERE Alignment=$alignment AND Gender=$gender";
            }
            else{
                $sql = "SELECT * FROM characters";
            }

            $stm=$con->prepare($sql);

            $stm->execute();

            $resultSet = $stm->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($resultSet);
            
        }catch (PDOException $e){
            echo "Error ".$e->getMessage();
        }


