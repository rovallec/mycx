<?php
header('Access-Control-Allow-Origin: *'); // Change '*' to specific origin if needed
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "J2eN5t$ZxWXn#K";
$dbname = "mycx";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// For PDO, use the following instead:
// try {
//     $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
//     $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// } catch (PDOException $e) {
//     die("Connection failed: " . $e->getMessage());
// }
?>
