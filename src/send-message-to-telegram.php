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
    if (!empty($_POST['phoneDeliver']) || !empty($_POST['phoneTakeMySelf'])) {

        // Если не пустые, то валидируем эти поля и сохраняем и добавляем в тело сообщения. Минимально для теста так:
        $txt = "";

        // Имя
        if (isset($_POST['nameDeliver']) && !empty($_POST['nameDeliver'])) {
            $txt .= "Ім'я " . strip_tags(trim(urlencode($_POST['nameDeliver']))) . "%0A";
        }

        // Номер телефона
        if (isset($_POST['phoneDeliver']) && !empty($_POST['phoneDeliver'])) {
            $txt .= "Телефон: " . strip_tags(trim(urlencode($_POST['phoneDeliver']))) . "%0A";
        }

        if (isset($_POST['streetDeliver']) && !empty($_POST['streetDeliver'])) {
            $txt .= "Вулиця: " . strip_tags(trim(urlencode($_POST['streetDeliver']))) . "%0A";
        }

        if (isset($_POST['houseDeliver']) && !empty($_POST['houseDeliver'])) {
            $txt .= "Будинок: " . strip_tags(trim(urlencode($_POST['houseDeliver']))) . "%0A";
        }

        if (isset($_POST['flatDeliver']) && !empty($_POST['flatDeliver'])) {
            $txt .= "Квартира: " . strip_tags(trim(urlencode($_POST['flatDeliver']))) . "%0A";
        }

        if (isset($_POST['doorDeliver']) && !empty($_POST['doorDeliver'])) {
            $txt .= "Під'їзд: " . strip_tags(trim(urlencode($_POST['doorDeliver']))) . "%0A";
        }

        if (isset($_POST['floorDeliver']) && !empty($_POST['floorDeliver'])) {
            $txt .= "Поверх: " . strip_tags(trim(urlencode($_POST['floorDeliver']))) . "%0A";
        }

        if (isset($_POST['commentDeliver']) && !empty($_POST['commentDeliver'])) {
            $txt .= "Комент: " . strip_tags(trim(urlencode($_POST['commentDeliver']))) . "%0A";
        }

        if (isset($_POST['timeDeliver']) && !empty($_POST['timeDeliver'])) {
            $txt .= "Час: " . strip_tags(trim(urlencode($_POST['timeDeliver']))) . "%0A";
        }

        if (isset($_POST['pizzaNameAndUnitsDeliver']) && !empty($_POST['pizzaNameAndUnitsDeliver'])) {
            $txt .= "Піца: " . strip_tags(trim(urlencode($_POST['pizzaNameAndUnitsDeliver']))) . "%0A";
        }

        if (isset($_POST['nameTakeMySelf']) && !empty($_POST['nameTakeMySelf'])) {
            $txt .= "Ім'я: " . strip_tags(trim(urlencode($_POST['nameTakeMySelf']))) . "%0A";
        }

        if (isset($_POST['phoneTakeMySelf']) && !empty($_POST['phoneTakeMySelf'])) {
            $txt .= "Телефон: " . strip_tags(trim(urlencode($_POST['phoneTakeMySelf']))) . "%0A";
        }

        if (isset($_POST['commentTakeMySelf']) && !empty($_POST['commentTakeMySelf'])) {
            $txt .= "Комент: " . strip_tags(trim(urlencode($_POST['commentTakeMySelf']))) . "%0A";
        }

        if (isset($_POST['pizzaNameAndUnitsTakeMySelf']) && !empty($_POST['pizzaNameAndUnitsTakeMySelf'])) {
            $txt .= "Піца: " . strip_tags(trim(urlencode($_POST['pizzaNameAndUnitsTakeMySelf']))) . "%0A";
        }

        if (isset($_POST['timeTakeMySelf']) && !empty($_POST['timeTakeMySelf'])) {
            $txt .= "Час: " . strip_tags(urlencode($_POST['timeTakeMySelf']));
        }

        $textSendStatus = @file_get_contents('https://api.telegram.org/bot' . TOKEN . '/sendMessage?chat_id=' . CHATID . '&parse_mode=html&text=' . $txt);

        
    } else {
        echo json_encode('NOTVALID');
    }
} else {
    header("Location: /");
}
