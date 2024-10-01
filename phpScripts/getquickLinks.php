<?php
header('Access-Control-Allow-Origin: *'); // Change '*' to specific origin if needed
header('Content-Type: application/json');
// Include the database connection script
include 'db_connect.php';

// SQL query to fetch data from the globalMenus table
$sql = "SELECT * FROM quickLinks";
$result = $conn->query($sql);

// Check if query was successful
if ($result === FALSE) {
    // Output JSON error message
    echo json_encode(["error" => "Error executing query: " . $conn->error]);
    exit;
}

// Fetch and format the results as an associative array
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// Set content type to JSON
header('Content-Type: application/json');

// Output JSON encoded data
echo json_encode($data);

// Close connection
$conn->close();
?>
