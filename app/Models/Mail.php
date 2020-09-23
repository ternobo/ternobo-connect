<?php

namespace App\Models;

use PHPMailer\PHPMailer\PHPMailer;

class Mail
{

    protected $mail;

    public function __construct()
    {
        $this->mail = new PHPMailer(true);
        $this->mail->isSMTP();                                            // Send using SMTP
        $this->mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );
        $this->mail->Host = "smtp-relay.sendinblue.com";                    // Set the SMTP server to send through
        $this->mail->SMTPAuth = true;                                   // Enable SMTP authentication
        $this->mail->Username = env("MAIL_USERNAME");                     // SMTP username
        $this->mail->Password = env("MAIL_PASSWORD");                               // SMTP password
        $this->mail->Port = 587;                                        // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
        $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
        $this->mail->CharSet = 'UTF-8';
        //Recipients
        $this->mail->setFrom('no-reply@ternobo.com', 'Ternobo');
    }

    public function addAddress($address)
    {
        $this->mail->addAddress($address);
    }

    public function send($title, $text, $html)
    {
        $this->mail->isHTML(true);                                  // Set email format to HTML
        $this->mail->Subject = $title;
        $this->mail->Body = $html;
        $this->mail->AltBody = $text;
        $this->mail->send();
    }

}
