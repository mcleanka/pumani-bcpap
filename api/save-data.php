<?php
// Create a database connection
include_once "connection.php";

//  Receive the POST data from the device
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validate the data
    $patient_id = $_POST['patient_id'];
    $doctor_id = $_POST['doctor_id'];
    $flow_rate = $_POST['flow_rate'];
    $temperature = $_POST['temperature'];
    $humidity = $_POST['humidity'];
    $breathing_rate = $_POST['breathing_rate'];
    $created_at = date('Y-m-d H:i:s'); // Assuming you want to insert the current timestamp

    // Insert data into the table
    $sql = "INSERT INTO patient (PatientID, DoctorID, FlowRate, Temperature, Humidity, BreathingRate, CreatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssdddds", $patient_id, $doctor_id, $flow_rate, $temperature, $humidity, $breathing_rate, $created_at);

    if ($stmt->execute()) {
        http_response_code(201); // HTTP 201 Created
        echo json_encode(array("message" => "Data saved successfully"));
    } else {
        http_response_code(500); // HTTP 500 Internal Server Error
        echo json_encode(array("message" => "Error: " . $conn->error));
    }

    // Close the database connection
    $stmt->close();
    $conn->close();

} else {
    http_response_code(405); // HTTP 405 Method Not Allowed
    echo json_encode(array("message" => "Invalid request method"));
}