<?php

class TelegramBotService
{
    protected $token;
    protected $base_url = 'https://api.telegram.org/bot';

    public function __construct()
    {
        $token = '6863314391:AAEaYapS74WyHsjeyMccKDXF0lQshoe5Cgk'; // token - токен телеграм бота в который должны приходить сообщения
        $this->chat_id = 474950625; // chat_id - пользователя которому нужно отправлять сообщения
        $this->token = $token;
        $this->base_url .= $token . '/';
    }

    public function sendRequest($method, $params = [])
    {
        $url = $this->base_url . $method;
        if (!empty($params)) {
            $url .= '?' . http_build_query($params);
        }

        return json_decode(file_get_contents($url));
    }

    /**
     * Відправолення повідомлень
     * @param $chat_id
     * @param $text
     * @param array $params
     * @return mixed
     */
    public function sendMessage($text, $params = [])
    {
        $bot = new TelegramBotService();

        if ($this->chat_id) {
            $bot->sendRequest('sendMessage', array_merge([
                'chat_id' => $this->chat_id,
                'text' => $text,
            ], $params));
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST" || $_SERVER["REQUEST_METHOD"] == "GET") {
    $name = $_POST["name"] ?? null;
    $surname = $_POST["surname"] ?? null;
    $phone = $_POST["phone"] ?? null;
    $email = $_POST["email"] ?? null;
    $promo = $_POST["promo"] ?? null;
    $text = $_POST["message"] ?? null;


//    $message = "<b>Новая заявка</b> \n";
//    $message .= "Имя: <b>$name</b> \n";
//    $message .= "Фамилия: <b>$surname</b> \n";
//    $message .= "Телефон: <b>$phone</b> \n";
//    $message .= "E-mail: <b>$email</b> \n";
//    $message .= "Промокод: <b>$promo</b> \n";
//    $message .= "Вопрос: <b>$text</b> \n";
//    $message .= "Дата: " . "<b>" . date('Y-m-d H:i:s') . "</b>";
//
//
//    $telegram = new TelegramBotService();
//    $send = $telegram->sendMessage($message, ['parse_mode' => 'HTML']);

    $jsonData = json_encode(['status' => true]);
    header('Content-Type: application/json');

    echo $jsonData;
}


?>


