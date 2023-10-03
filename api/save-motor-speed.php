<?php
include 'connection.php';

// Step 1: Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Step 2: Receive and validate the data
    $flow_rate = $_POST['flow_rate'];
    $age_group = $_POST['age_group'];

    // Insert data into the table
    $sql = "INSERT INTO settings (FlowRate, AgeGroup) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $flow_rate, $age_group);

    if ($stmt->execute()) {
        http_response_code(201); // HTTP 201 Created
        echo json_encode([
            "message" => "Data saved successfully",
            "success" => true,
        ]);
    } else {
        http_response_code(201); // HTTP 500 Internal Server Error
        echo json_encode(array("message" => "Error: " . $conn->error));
    }

    // Close the database connection
    $stmt->close();
    $conn->close();
} else {
    echo "Invalid request method.";
}
