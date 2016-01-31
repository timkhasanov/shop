<?php
// uncomment to get POST contents
// echo '<pre>'; print_r($_POST); print_r($_FILES); echo '</pre>'; 

$name = $_POST['name']; //Все поля получают данные имени input'a (name="name", name="email", name="message")
$phone = $_POST['phone'];
$email = $_POST['email'];
$message = $_POST['description'];
$selectlanguage = $_POST['selectlanguage'];
$subjectuser  = "онлайн заказ перевода";
$headersuser  = "From: Сообщение\r\n";
$headersuser .= "Reply-To: ". strip_tags($email) . "\r\n";
$headersuser .= "MIME-Version: 1.0\r\n";
$headersuser .= "Content-Type: text/html;charset=utf-8 \r\n";
$my_file = "";
if (!empty($_FILES['file']['tmp_name'])) 
{
$path = $_FILES['file']['name']; 
if (copy($_FILES['file']['tmp_name'], $path)) $my_file = $path; 
 }            
$my_message = 'ФИО заказчика: '.$name.'<br />E-mail заказчика:<a href="mailto:'.$email.'">'.$email.'</a><br />Описание: '.$message.'<br />Телефон: '.$phone.'<br />Язык перевода: '.$selectlanguage;
 
require_once('PHPMailer/class.phpmailer.php'); //Подключаем PHPMailer
require_once('PHPMailer/PHPMailerAutoload.php');
require_once('PHPMailer/class.smtp.php');

$mail = new PHPMailer(true); //New instance, with exceptions enabled
$mail->CharSet = "UTF-8";
$mail->IsSMTP(); // telling the class to use SMTP
$mail->Host       = "smtp.yandex.ru"; // SMTP server
$mail->SMTPDebug  = 1;                     // enables SMTP debug information (for testing)
                                           // 1 = errors and messages
                                           // 2 = messages only
$mail->SMTPAuth   = true;                  // enable SMTP authentication
$mail->Port       = 465;                    // set the SMTP port for the GMAIL server
$mail->SMTPSecure = 'ssl';                 //Secure SMTP
$mail->Username   = "jz828059"; // SMTP account username (Логин от почты SMTP)
$mail->Password   = "t,fyfirf";        // SMTP account password (Пароль от почты SMTP)
$mail->SetFrom('jz828059@yandex.ru', 'mailrobot');
$mail->AddReplyTo('jz828059@yandex.ru','mailrobot');
$mail->Subject    = "заказ перевода онлайн";
$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test
$mail->MsgHTML($my_message);
$address = "jz828059@mail.ru";
$mail->AddAddress($address, "центр переводов Гардарика");
$mail->CharSet="UTF-8";

$plik_tmp = $_FILES['uploaded_file']['tmp_name'];
$plik_rozmiar = $_FILES['uploaded_file']['size'];
$plik_nazwa = $_FILES['uploaded_file']['name'];
if(is_uploaded_file($plik_tmp)) {   
$nazwa_g=$plik_nazwa;

move_uploaded_file($plik_tmp, 'tmp_zal/'.$nazwa_g); //Папка куда будет сохраняться файл (обязательно нужны права 777)
$mail->AddAttachment('tmp_zal/'.$nazwa_g, $nazwa_g);
}

// yandex disk part
require_once 'phar://php/vendor/yandex-php-library_0.4.1.phar/vendor/autoload.php';
use Yandex\Disk\DiskClient;

$diskClient = new DiskClient('122f8d7291a94855a1517516171d5ee3');
$diskClient->setServiceScheme(DiskClient::HTTPS_SCHEME);
$fileName = $nazwa_g;
$newName = $nazwa_g;
$diskClient->uploadFile(
'/newfolder/',
array(
'path' => $fileName,
'size' => filesize($fileName),
'name' => $newName
)
);
$url = $diskClient->startPublishing('/newfolder/'.$filename);
echo $url;
// end yandex disk part

$mail->IsHTML(true); // send as HTML

if(!$mail->Send())
{
unlink('tmp_zal/'.$plik_nazwa);
echo "Ошибка отправления";

}
else
{
unlink('tmp_zal/'.$plik_nazwa);
echo 'Спасибо за отправку сообщения';
}

?>
