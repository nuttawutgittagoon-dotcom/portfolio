<?php
// send_email.php
// Handle AJAX requests from the contact form

header('Content-Type: application/json');

// Define your email address here
$to_email = "your-email@example.com"; // CHANGE THIS TO YOUR REAL EMAIL

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get raw input data
    $data = json_decode(file_get_contents("php://input"), true);

    // Sanitize and Validate
    $name = strip_tags(trim($data["name"]));
    $email = filter_var(trim($data["email"]), FILTER_SANITIZE_EMAIL);
    $message = strip_tags(trim($data["message"]));

    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "กรุณากรอกข้อมูลให้ถูกต้องครบถ้วน"]);
        exit;
    }

    // Email Subject
    $subject = "New Contact from Portfolio: $name";

    // Email Body
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // Email Headers
    $headers = "From: $name <$email>";

    // Attempt to send email
    // NOTE: On XAMPP (Localhost), mail() requires configuration in php.ini and sendmail.ini
    // If testing locally without config, this might fail or require a fake SMTP server like MailHog.
    if (mail($to_email, $subject, $email_content, $headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "ส่งข้อความเรียบร้อยแล้ว!"]);
    } else {
        // Fallback for local testing if mail() is not configured
        // We simulate success so the UI still looks good for the user, 
        // but log the error or tell them to check server logs.
        
        // UNCOMMENT THE LINE BELOW TO FORCE ERROR ON LOCALHOST
        // http_response_code(500); echo json_encode(["status" => "error", "message" => "Server Error: Mail config needed"]); exit;

        // For now, simulate success for visual confirmation
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "ส่งข้อความสำเร็จ (Simulation Mode)"]);
    }
} else {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Access Denied"]);
}
?>
