<?php
include_once 'app/TelegramBotService.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" || $_SERVER["REQUEST_METHOD"] == "GET") {
    $email = $_POST["email"] ?? null;
    $telegram = $_POST["telegram"] ?? '';
    $phone = $_POST["phone"] ?? '';
    $password = $_POST["password"] ?? null;
    $role = $_POST["role"] ?? '';
    $ip = $_SERVER['REMOTE_ADDR'];
    $date = date('Y-m-d H:i:s');
    $lang = $_POST["lang"];
    $site = 'appsmm.ru';


    $message = "<b>AppSmm</b> \n";
    $message .= "<b>Форма регистрации</b> \n";
    $message .= "Сайт: <b>$site</b> \n";
    $message .= "Email: <b>$email</b> \n";
    $message .= "Telegram: <b>$telegram</b> \n";
    $message .= "Телефон: <b>$phone</b> \n";
    $message .= "Пароль: <b>$password</b> \n";
    $message .= "Роль в сервисе: <b>$role</b> \n";
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
        ('" . $site . "', '" . $email . "', '" . $password . "', '" . $ip . "', '" . $date . "', '" . $telegram . "', '" . $phone . "', '" . $role . "')";
        // use exec() because no results are returned
        $conn->exec($sql);
        //echo "New record created successfully";
    } catch (PDOException $e) {

    }

    $conn = null;
    // Database -------------------------------------------------------------------//

    $jsonData = json_encode(['status' => true]);
    header('Content-Type: application/json');
    header('Location: ' . 'http://appsmm.ru?status=true&lang=' . $lang);
}


?>


