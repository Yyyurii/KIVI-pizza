<?php

// Токен
const TOKEN = '1856013739:AAEnIkPtoVTBYrJsY9VXcarpfV7YpXWvFFM';

// ID чата
const CHATID = '-517467730';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $fileSendStatus = '';
    $textSendStatus = '';
    $msgs = [];

    // Проверяем не пусты ли поля с именем и телефоном
    if (!empty($_POST['name']) && !empty($_POST['phone'])) {

        // Если не пустые, то валидируем эти поля и сохраняем и добавляем в тело сообщения. Минимально для теста так:
        $txt = "";

        // Имя
        if (isset($_POST['name']) && !empty($_POST['name'])) {
            $txt .= "Ім'я " . strip_tags(trim(urlencode($_POST['name']))) . "%0A";
        }

        // Номер телефона
        if (isset($_POST['phone']) && !empty($_POST['phone'])) {
            $txt .= "Телефон: " . strip_tags(trim(urlencode($_POST['phone']))) . "%0A";
        }

        // Не забываем про тему сообщения
        if (isset($_POST['time']) && !empty($_POST['time'])) {
            $txt .= "Час: " . strip_tags(urlencode($_POST['time']));
        }

        $textSendStatus = @file_get_contents('https://api.telegram.org/bot' . TOKEN . '/sendMessage?chat_id=' . CHATID . '&parse_mode=html&text=' . $txt);

        
    } else {
        echo json_encode('NOTVALID');
    }
} else {
    header("Location: /");
}
