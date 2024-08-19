<?php

class Mailer {
    public static function send($to, $subject, $body, $replyTo = 'contact@ksaoosterzele.be') {
        $headers = "From: ksaoosterzele@ksaoosterzele.be\r\n";
        $headers .= "Reply-To: $replyTo\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

        return mail($to, $subject, $body, $headers);
    }
}

class Template {
    public static function render($templatePath, $data) {
        extract($data);
        ob_start();
        include($templatePath);
        return ob_get_clean();
    }
}