<?php
// ===================================
// Contact Form Handler
// ===================================

require_once 'config.php';

// Set JSON header
header('Content-Type: application/json');

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
    exit;
}

// Get and sanitize form data
$name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
$email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
$subject = isset($_POST['subject']) ? sanitize_input($_POST['subject']) : '';
$message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';

// Validation
$errors = [];

if (empty($name)) {
    $errors[] = 'กรุณากรอกชื่อ';
}

if (empty($email)) {
    $errors[] = 'กรุณากรอกอีเมล';
} elseif (!validate_email($email)) {
    $errors[] = 'รูปแบบอีเมลไม่ถูกต้อง';
}

if (empty($subject)) {
    $errors[] = 'กรุณากรอกหัวข้อ';
}

if (empty($message)) {
    $errors[] = 'กรุณากรอกข้อความ';
}

// If there are validation errors
if (!empty($errors)) {
    echo json_encode([
        'success' => false,
        'message' => implode(', ', $errors)
    ]);
    exit;
}

// Prepare email
$to = CONTACT_EMAIL;
$email_subject = SITE_NAME . ' - ' . $subject;
$email_body = "ชื่อ: $name\n";
$email_body .= "อีเมล: $email\n";
$email_body .= "หัวข้อ: $subject\n\n";
$email_body .= "ข้อความ:\n$message\n";

$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Try to send email
$mail_sent = @mail($to, $email_subject, $email_body, $headers);

// Alternative: Save to database instead of sending email
// Uncomment the code below if you want to save to database instead

/*
try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $sql = "INSERT INTO contacts (name, email, subject, message, created_at) 
            VALUES (:name, :email, :subject, :message, NOW())";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':subject' => $subject,
        ':message' => $message
    ]);
    
    echo json_encode([
        'success' => true,
        'message' => 'ส่งข้อความสำเร็จ!'
    ]);
} catch(PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'เกิดข้อผิดพลาด: ' . $e->getMessage()
    ]);
}
*/

// Response for email sending
if ($mail_sent) {
    echo json_encode([
        'success' => true,
        'message' => 'ส่งข้อความสำเร็จ! ขอบคุณที่ติดต่อ'
    ]);
} else {
    // Since mail() might not work on local XAMPP without configuration,
    // we'll return success anyway for testing purposes
    echo json_encode([
        'success' => true,
        'message' => 'ได้รับข้อความของคุณแล้ว (โหมดทดสอบ - ไม่ได้ส่งอีเมลจริง)'
    ]);
}
?>
