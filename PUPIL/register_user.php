<?php

require_once "../functions.php";

function getRequestBody() {
    return json_decode(file_get_contents('php://input'), true);
}

$data = getRequestBody();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (
        isset($data['parent_name']) &&
        isset($data['email']) &&
        isset($data['contact']) &&
        isset($data['pupil_name']) &&
        isset($data['class_id']) &&
        isset($data['password'])
        ) {

        // question, answer, correct_answer, subject_id, class_id, topic_id

        $parent_name = $data['parent_name'];
        $email = $data['email'];
        $contact = $data['contact'];
        $pupil_name = $data['pupil_name'];
        $class_id = $data['class_id'];
        $password = $data['password'];

        if ($class_id === "P.1") {
            $class_id = 1;
        } elseif ($class_id === "P.2") {
            $class_id = 2;
        } else {
            $class_id = 3;
        }
        
        // echo json_encode(array("parent_name"=> $parent_name, "email"=> $email, "contact" => $contact, "pupil_name" => $pupil_name, "class_id" => $class_id ));

        $request = createUser($parent_name, $email, $contact, $pupil_name, $class_id, $password);

        if ($request) {
            echo json_encode(array('success'=> "User created successfully"));
        } else {
            echo json_encode(array("error" => "Error creating user"));
        }

        
        } else {
            echo json_encode(array('error'=> 'Parameters not set'));
        }
}



// function parseUri() {
//     $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
//     $uri = explode('/', trim($uri, '/'));
//     return $uri;
// }

// // Helper function to get the request method
// function getRequestMethod() {
//     return $_SERVER['REQUEST_METHOD'];
// }

// // Helper function to get the request body
// function getRequestBody() {
//     return json_decode(file_get_contents('php://input'), true);
// }

// echo parseUri();

?>