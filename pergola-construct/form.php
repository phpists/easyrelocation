<?php

use PHPMailer\PHPMailer\PHPMailer;

require 'vendor/autoload.php';




function sendMail($to, $subject, $message)
{


    try {
        $mail = new PHPMailer();
        $mail->SMTPDebug = 2;
        $mail->isSMTP();
        $mail->Host = '38.180.37.135';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = 'admin@pergolaconstruct.ru';
        $mail->Password = 'dS4dF8sS1n';

        $mail->setFrom('admin@pergolaconstruct.ru', 'Pergola construct');
        $mail->addAddress('andy.tsyupa@gmail.com', 'andy');



        $mail->Subject = 'SSSSDSDADSADASDAS';
        $mail->Body    = 'HTML message body in <b>bold</b> ';
        $mail->AltBody = 'Body in plain text for non-HTML mail clients';
        $mail->send();
        echo "Mail has been sent successfully!";
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}


if ($_SERVER["REQUEST_METHOD"] == "GET" || $_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $surname = $_POST["surname"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    $promo = $_POST["promo"];


    $message = "Имя: $name <br>";
    $message .= "Фамилия: $surname <br>";
    $message .= "Телефон: $phone <br>";
    $message .= "E-mail: $email <br>";
    $message .= "Промокод: $promo <br>";


    $to = 'andy.tsyupa@gmail.com, chopeyyuriy@gmail.com';
    $subject = "Pergola construct - Заявка от $name $surname";
    $s = sendMail($to, $subject, $message);

    echo $s;
//    header('Location: https://38.180.37.135/');
}
?>


