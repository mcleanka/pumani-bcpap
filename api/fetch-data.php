<?php
// Create a database connection
include_once 'connection.php';

// Step 1: Check if it's a GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch all data from the table
    $sql = "SELECT * FROM patient";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $data = array();

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        http_response_code(200); // HTTP 200 OK
        echo json_encode([
            "data" => $data,
        ]);
    } else {
        http_response_code(404); // HTTP 404 Not Found
        echo json_encode(array("message" => "No data found"));
    }

    // Close the database connection
    $conn->close();
} else {
    http_response_code(405); // HTTP 405 Method Not Allowed
    echo json_encode(array("message" => "Invalid request method"));
}
