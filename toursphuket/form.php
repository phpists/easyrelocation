<?php
include_once 'app/TelegramBotService.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" || $_SERVER["REQUEST_METHOD"] == "GET") {
    $name = $_POST["name"] ?? null;
    $phone = $_POST["phone"] ?? null;
    $text = $_POST["text"] ?? null;
    $callback = $_POST["callback"] ?? null;

    $ip = $_SERVER['REMOTE_ADDR'];
    $ipLink = 'http://www.ip2location.com/demo/' . $_SERVER['REMOTE_ADDR'];
    $site = 'toursphuket.ru/';


    $message = "<b>Toursphuket</b> \n";
    $message .= "<b>Новая заявка</b> \n";
    $message .= "Имя: <b>$name</b> \n";
    $message .= "Телефон: <b>$phone</b> \n";
    $message .= "Cообщение (не обязательно): <b>$text</b> \n";
    $message .= "IP: <a href='$ipLink'>$ip</a> \n";
    $message .= "Сайт: <b>$site</b> \n";
    $message .= "Дата: " . "<b>" . date('Y-m-d H:i:s') . "</b>";


    $telegram = new TelegramBotService();
    $send = $telegram->sendMessage($message, ['parse_mode' => 'HTML']);



    $jsonData = json_encode(['status' => true]);
    header('Content-Type: application/json');

    header('Location: '. 'https://toursphuket.ru');
}


?>


