<?php
header('Access-Control-Allow-Origin: *'); // Change '*' to specific origin if needed
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST'); // Allow POST requests
header('Access-Control-Allow-Headers: Content-Type'); // Allow specific headers
// Include the database connection script
include 'db_connect.php';
// Include the database connection
include 'db_connect.php';

// Check if the form was submitted using POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data
    $json = file_get_contents('php://input');
    
    // Decode the JSON data into an associative array
    $data = json_decode($json, true);
    
    // Check if decoding was successful and required keys exist
    if (is_array($data) && isset($data['employee'], $data['location'], $data['vertical'], 
                                      $data['startDateTime'], $data['endDateTime'], 
                                      $data['totalTime'], $data['issueType'], 
                                      $data['details'], $data['adjustment'], 
                                      $data['action'])) {

        // Retrieve the data from the associative array
        $employee = $data['employee'];
        $location = $data['location'];
        $vertical = $data['vertical'];
        $startDateTime = $data['startDateTime'];
        $endDateTime = $data['endDateTime'];
        $totalTime = $data['totalTime'];
        $issueType = $data['issueType'];
        $details = $data['details'];
        $adjustment = $data['adjustment'];
        $action = $data['action'];

        // Prepare the SQL insert statement
        $sql = "INSERT INTO adjustments (employee, location, vertical, startDateTime, endDateTime, totalTime, issueType, details, adjustment, action)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        // Prepare the statement
        if ($stmt = $conn->prepare($sql)) {
            // Bind the parameters
            $stmt->bind_param("ssssssssss", $employee, $location, $vertical, $startDateTime, $endDateTime, $totalTime, $issueType, $details, $adjustment, $action);

            // Execute the statement
            if ($stmt->execute()) {
                echo "1"; // Success
            } else {
                echo "0: " . $stmt->error; // Echo failure and error message
            }

            // Close the statement
            $stmt->close();
        } else {
            echo "0: " . $conn->error; // Echo failure to prepare statement and error message
        }
    } else {
        echo "0: Missing required data"; // Return error for missing data
    }
} else {
    echo "0: Invalid request method"; // Failure due to incorrect request method
}
?>
