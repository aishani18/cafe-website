<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection parameters
$servername = "localhost"; // Replace with your server name
$username = "root"; // Replace with your MySQL username
$password = "root"; // Replace with your MySQL password
$dbname = "cutesycafe_db"; // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Process form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Prepare and bind SQL statement
    $stmt = $conn->prepare("INSERT INTO submissions (name, phone, email, review) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $phone, $email, $review);

    // Set parameters and execute statement
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $review = $_POST['review'];

    if ($stmt->execute()) {
        echo "Submission successful!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
