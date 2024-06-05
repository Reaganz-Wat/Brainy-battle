<?php

require_once "../functions.php";

// function getRequestBody()
// {
//     return json_decode(file_get_contents('php://input'), true);
// }

// $_POST = getRequestBody();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (
        isset($_POST['username']) &&
        isset($_POST['password']) &&
        isset($_POST['role'])
    ) {

        $username = $_POST['username'];
        $password = $_POST['password'];
        $role = $_POST['role'];

        $request = createStaff($username, $password, $role);

        if ($request) {
            echo json_encode(array('success' => "User created successfully"));
        } else {
            echo json_encode(array("error" => "Error creating user"));
        }

    } else {
        echo json_encode(array('error' => 'Parameters not set'));
    }
}
