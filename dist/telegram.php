<?php

$name = $_POST['name'];
$phone = $_POST['phone'];
$pizzaName = $_POST['pizza_name'];
$pizzaPrice = $_POST['pizza_price'];
$pizzaComment = $_POST['comment'];
$pizzaTime = $_POST['time'];
$token = "1856013739:AAEnIkPtoVTBYrJsY9VXcarpfV7YpXWvFFM";
$chat_id = "-517467730";
$arr = array(
  'Имя пользователя: ' => $name,
  'Телефон: ' => $phone,
  'Піца: ' => implode(", ", $pizzaName),
  'Час: ' => $pizzaTime,
  'Коментар: ' => $pizzaComment,
  'Всього до оплати: ' => $pizzaPrice,
  
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("kivipizza2+n4z4mlhcthfwkvtulaa5@boards.trello.com","r");

if ($sendToTelegram) {
  // echo'<h1>Дякуємо за замовлення!</h1>';
} else {
  echo "Error";
}
?>
<!-- kivipizza2+n4z4mlhcthfwkvtulaa5@boards.trello.com -->