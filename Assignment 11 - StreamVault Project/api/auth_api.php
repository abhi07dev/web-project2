<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Database configuration for PHP (MySQL)
$host = "localhost";
$db_user = "root";
$db_pass = "your_password_here"; // To be updated by user
$db_name = "streamvault_db";

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') {
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';

    if ($email === 'admin@streamvault.com' && $password === 'admin123') {
        echo json_encode([
            "status" => "success",
            "message" => "Login successful",
            "user" => [
                "name" => "Admin User",
                "email" => $email,
                "role" => "administrator"
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            "status" => "error",
            "message" => "Invalid credentials"
        ]);
    }
} else {
    echo json_encode([
        "status" => "ready",
        "message" => "StreamVault PHP Auth API is active"
    ]);
}
?>
