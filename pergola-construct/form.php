<?php
include_once 'app/TelegramBotService.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" || $_SERVER["REQUEST_METHOD"] == "GET") {
    $name = $_POST["name"] ?? null;
    $surname = $_POST["surname"] ?? null;
    $phone = $_POST["phone"] ?? null;
    $email = $_POST["email"] ?? null;
    $promo = $_POST["promo"] ?? null;
    $text = $_POST["message"] ?? null;
    $ip = $_SERVER['REMOTE_ADDR'];
    $site = 'pergolaconstruct.ru';


    $message = "<b>Pergola construct</b> \n";
    $message .= "<b>Новая заявка</b> \n";
    $message .= "Имя: <b>$name</b> \n";
    $message .= "Фамилия: <b>$surname</b> \n";
    $message .= "Телефон: <b>$phone</b> \n";
    $message .= "E-mail: <b>$email</b> \n";
    $message .= "Промокод: <b>$promo</b> \n";
    $message .= "Вопрос: <b>$text</b> \n";
    $message .= "IP: <b>$ip</b> \n";
    $message .= "Сайт: <b>$site</b> \n";
    $message .= "Дата: " . "<b>" . date('Y-m-d H:i:s') . "</b>";


    $telegram = new TelegramBotService();
    $send = $telegram->sendMessage($message, ['parse_mode' => 'HTML']);


// Database -------------------------------------------------------------------//
    $servername = "localhost";
    $username = "easyrelocation_db";
    $password = "2D55rAgk3c";
    $dbname = "easyrelocation_db";

    try {
      $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
      // set the PDO error mode to exception
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $sql = "INSERT INTO orders (site, name, surname, phone, email, promo, ip, d_t)
                VALUES ('".$site."', '".$name."', '".$surname."', '".$phone."', '".$email."', '".$promo."', '".$ip."', '".date('Y-m-d H:i:s')."')";
      // use exec() because no results are returned
      $conn->exec($sql);
      //echo "New record created successfully";
    } catch(PDOException $e) {
      //echo $sql . "<br>" . $e->getMessage();
    }

    $conn = null;
// Database -------------------------------------------------------------------//


    $jsonData = json_encode(['status' => true]);
    header('Content-Type: application/json');

    echo $jsonData;
}


?>


