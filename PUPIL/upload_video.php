<?php
require_once "../functions.php";

// // Check if the request method is GET
// if ($_SERVER['REQUEST_METHOD'] == 'POST') {
//     // Check if both subject_id and class_id parameters are set in the GET request
//     if (isset($_POST['subject_id']) && isset($_POST['class_id']) && isset($_POST['class_id'])) {
//         // Retrieve subject_id and class_id from the GET request
//         $subject_id = $_POST['subject_id'];
//         $class_id = $_POST['class_id'];
//         $topic_id = $_POST['topic_id'];
//         $videoFile = $_FILES['video'];
        
//         $result = uploadVideo($topic_id, $subject_id, $class_id, $videoFile);
//         echo json_encode(array('success'=> "video uploaded successfully"));

//     } else {
//         // If required parameters are not set, send a 403 Forbidden status code
//         // and encode an error message to JSON format before echoing it
//         header("HTTP/1.1 403 Forbidden");
//         echo json_encode(array("error"=>"Parameters not set"));
//     }
// }

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Check if all required parameters are set in the POST request
    if (isset($_POST['subject_id']) && isset($_POST['class_id']) && isset($_POST['topic_id']) && isset($_FILES['video'])) {
        // Retrieve parameters from the POST request
        $subject_id = $_POST['subject_id'];
        $class_id = $_POST['class_id'];
        $topic_id = $_POST['topic_id'];
        $videoFile = $_FILES['video'];

        // Call the uploadVideo function
        $result = uploadVideo($class_id, $topic_id, $subject_id, $videoFile);
        
        echo json_encode(array('success' => 'Video uploaded successfully'));


    } else {
        // If required parameters are not set, send a 400 Bad Request status code
        // and encode an error message to JSON format before echoing it
        header("HTTP/1.1 400 Bad Request");
        echo json_encode(array("error" => "Missing parameters"));
    }
} else {
    // If request method is not POST, send a 405 Method Not Allowed status code
    // and encode an error message to JSON format before echoing it
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(array("error" => "Method Not Allowed"));
}

?>