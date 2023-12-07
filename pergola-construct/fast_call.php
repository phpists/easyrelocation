<?php
include_once 'app/TelegramBotService.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" || $_SERVER["REQUEST_METHOD"] == "GET") {
    $phone = $_POST["phone"] ?? null;

    $message = "<b>Узнать стоимость перголы</b> \n";
    $message .= "Телефон: <b>$phone</b> \n";

    $telegram = new TelegramBotService();
    $send = $telegram->sendMessage($message, ['parse_mode' => 'HTML']);

    $jsonData = json_encode(['status' => true]);
    header('Content-Type: application/json');

    echo $jsonData;
}


?>


