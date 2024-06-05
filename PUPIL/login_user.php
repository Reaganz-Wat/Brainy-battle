<?php
require_once "../functions.php";

// $data = json_decode(file_get_contents("php://input"), true);

// if ( $_SERVER['REQUEST_METHOD'] == 'POST') {

//         // Get the input data from the POST request
//         // $data = json_decode(file_get_contents('php://input'), true);
//         if (!isset($data['username']) || !isset($data['password'])) {
//             echo json_encode(['status' => 'error', 'message' => 'Username and password are required']);
//             exit;
//         }
    
//         $username = $data['username'];
//         $password = $data['password'];
    
//         // Call the authentication function
//         echo authenticateUser($username, $password);
//         echo json_encode(login($username, $password));
    
//         // Close the database connection
//         $conn->close();
// }


$data = json_decode(file_get_contents("php://input"), true);

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Check if both username and password are set
    if (!isset($data['username']) || !isset($data['password'])) {
        echo json_encode(['status' => 'error', 'message' => 'Username and password are required']);
        exit;
    }

    $username = $data['username'];
    $password = $data['password'];

    // Try to authenticate using the first method (pupils)
    $authResult = authenticateUser($username, $password);
    $authData = json_decode($authResult, true);

    if ($authData['status'] === 'success') {
        echo $authResult;
    } else {
        // If the first method fails, try the second method (staff)
        $loginResult = login($username, $password);
        if ($loginResult) {
            echo json_encode(['status' => 'success', 'user' => $loginResult]);
        } else {
            // If both methods fail, return an error
            echo json_encode(['status' => 'error', 'message' => 'Invalid username or password']);
        }
    }
}

?>