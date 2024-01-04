<?php
include_once 'app/TelegramBotService.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" || $_SERVER["REQUEST_METHOD"] == "GET") {
    $name = $_POST["name"] ?? null;
    $phone = $_POST["phone"] ?? null;
    $email = $_POST["email"] ?? null;
    $ip = $_SERVER['REMOTE_ADDR'];
    $site = 'getvisa.pro';


    $message = "<b>GetVisa</b> \n";
    $message .= "<b>Новая заявка</b> \n";
    $message .= "Имя: <b>$name</b> \n";
    $message .= "Телефон: <b>$phone</b> \n";
    $message .= "E-mail: <b>$email</b> \n";
    $message .= "IP: <b>$ip</b> \n";
    $message .= "Сайт: <b>$site</b> \n";
    $message .= "Дата: " . "<b>" . date('Y-m-d H:i:s') . "</b>";


    $telegram = new TelegramBotService();
    $send = $telegram->sendMessage($message, ['parse_mode' => 'HTML']);

    $jsonData = json_encode(['status' => true]);
    header('Content-Type: application/json');

    echo $jsonData;
}


?>


