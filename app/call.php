<?php	require_once 'plugins/autoload.php';	require_once 'plugins/phpmailer/phpmailer/language/phpmailer.lang-ru.php';	function sendEmail($data){		$mail = new PHPMailer;		$mail->CharSet='UTF-8';		$mail->isSendmail();		$mail->setFrom('noreply@shop.ru', $data['name']);		$mail->addAddress('gretta28@yandex.ru', "Ирине Тишкевич");		$mail->Subject = "Отправка письма с shop.ru";		$mail->msgHTML('Заказан звонок от: '.$data['name'].'.  Дата: '.$data['day'].'.'.$data['month'].'. Телефон: '.$data['phone'].'. Комментарий: '.$data['message']);		return $mail->send();	}		if($_SERVER['REQUEST_METHOD'] == "POST") {		$name = $_POST['name'];		$phone = $_POST['phone'];		$day = $_POST['day'];		$month = $_POST['month'];		$message = $_POST['msg'];		if(sendEmail(array('name' => $name, 'phone' => $phone, 'day' => $day, 'month' => $month, 'message' => $message))) {			$response = array(				'status' => 'OK',				'msg' => 'Мы свяжемся c вами '.$day.'.'.$month.'.'			);		} else {			$response = array(				'status' => 'FAIL',				'msg' => 'Возникла ошибка. Попробуйте позже.'			);		}		echo json_encode($response);	} else {		header("HTTP/1.1 302 Moved Temporarily");		header("Location: /");		exit;	}