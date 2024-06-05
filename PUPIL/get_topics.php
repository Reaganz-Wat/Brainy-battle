<?php
require_once "../functions.php";

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Check if both subject_id and class_id parameters are set in the GET request
    if (isset($_GET['subject_id']) && $_GET['class_id']) {
        // Retrieve subject_id and class_id from the GET request
        $subject_id = $_GET['subject_id'];
        $class_id = $_GET['class_id'];
        
        // Call the getTopics function with class_id and subject_id as parameters
        // and encode the result to JSON format before echoing it
        echo json_encode(getTopics($class_id, $subject_id));
    } else {
        // If required parameters are not set, send a 403 Forbidden status code
        // and encode an error message to JSON format before echoing it
        header("HTTP/1.1 403 Forbidden");
        echo json_encode(array("error"=>"Parameters not set"));
    }
}

?>
