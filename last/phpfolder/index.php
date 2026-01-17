<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$to = "himanshuyadav1740343@gmail.com"; // or whatever inbox you want to receive mail in
$subject = "Test Email";
$message = "This is a test email sent from PHP.";

$headers = "From: no-reply@ggg.sss\r\n"; // MUST exist on your hosting
$headers .= "Reply-To: no-reply@ggg.sss\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo "Email sent successfully!";
} else {
    echo "Email sending failed.";
}
?>
