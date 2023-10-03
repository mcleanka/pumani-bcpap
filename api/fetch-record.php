<?php
// Create a database connection
include 'connection.php';

// Step 1: Check if it's a GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // Fetch the last record from the table
    $sql = "SELECT * FROM patient ORDER BY ID DESC LIMIT 1";
    $result = $conn->query($sql);
    $row = [];

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
    }

    $sql = "SELECT * FROM settings ORDER BY ID DESC LIMIT 1";
    $result = $conn->query($sql);
    $settings = [];

    if ($result->num_rows > 0) {
        $settings = $result->fetch_assoc();
    }

    http_response_code(201); // HTTP 404 Not Found
    echo json_encode([
        "settings" => $settings,
        "statistics" => $row,
    ]);

    // Close the database connection
    $conn->close();
} else {
    http_response_code(405); // HTTP 405 Method Not Allowed
    echo json_encode(array("message" => "Invalid request method"));
}
