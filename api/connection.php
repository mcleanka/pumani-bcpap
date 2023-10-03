<?php
// Create a database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pumani";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    http_response_code(201); // HTTP 500 Internal Server Error
    die(json_encode(array("message" => "Connection failed: " . $conn->connect_error)));
}
