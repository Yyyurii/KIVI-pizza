<?php

$method = $_SERVER['REQUEST_METHOD'];

//Script Foreach
$c = true;
if ($method === 'POST') {

	$project_name = trim($_POST["project_name"]);
	$admin_email  = trim($_POST["admin_email"]);
	$form_subject = trim($_POST["form_subject"]);

	foreach ($_POST as $key => $value) {
		if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject") {
			$message .= "<b>" . $key . "</b> " . $value . "<br/>";
		}
	}
	$pizzaName = $_POST['pizza_name'];
	$arr = array(
		'Піца: ' => implode(", ", $pizzaName),
	);
	foreach ($arr as $key => $value) {
		$message .= "<b>" . $key . "</b> " . $value . "<br/>";
	};

} 

function adopt($text)
{
	return '=?UTF-8?B?' . Base64_encode($text) . '?=';
}

$headers = "MIME-Version: 1.0" . PHP_EOL .
	"Content-Type: text/html; charset=utf-8" . PHP_EOL .
	'From: ' . adopt($project_name) . ' <' . $admin_email . '>' . PHP_EOL .
	'Reply-To: ' . $admin_email . '' . PHP_EOL;

mail($admin_email, adopt($form_subject), $message, $headers);
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="refresh" content="3; url=index.html">
	<title>Дякуємо за замовлення!</title>
	<meta name="generator">
	<script type="text/javascript">
		setTimeout('location.replace("/index.html")', 5000);
		/*Изменить текущий адрес страницы через 3 секунды (3000 миллисекунд)*/
	</script>
</head>

<body>
	<h1>Дякуємо за замовлення! У разі потреби ми з вами зв'яжемося</h1>
</body>

</html>