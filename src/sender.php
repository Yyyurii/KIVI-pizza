<?php
    $time = $_POST['time'];
    $name = $_POST['name'];
	$phone = $_POST['phone'];
    $street = $_POST['street'];
    $house = $_POST['house'];
    $flat = $_POST['flat'];
    $entrance = $_POST['entrance'];
    $floor = $_POST['floor'];
    $comment = $_POST['comment'];
    $pizzaName = $_POST['pizza_name[]'];

	$to = "yurii.kryvko@gmail.com"; 
	$date = date ("d.m.Y"); 
	$time = date ("h:i");
	$from = $to;
	$subject = "Заявка c сайта";

	
	$msg="
    ім'я: $name /n
    Телефон: $phone /n
    Вулиця: $street /n
    Будинок: $house /n
    Квартира: $flat /n
    Під'їзд: $entrance /n
    Поверх: $floor /n
    Текст: $comment /n	
    Піца: $pizzaName"; 	
	mail($to, $subject, $msg, "From: $from ");

?>

<p>Привет, форма отправлена</p>
