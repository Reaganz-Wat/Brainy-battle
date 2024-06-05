<?php

require_once "../functions.php";

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (
        isset($data['topic']) &&
        isset($data['class_id']) &&
        isset($data['subject_id'])
    ) {
        $subject_id = $data['subject_id'];
        $class_id = $data['class_id'];
        $topic = $data['topic'];

        $result = addTopic($topic, $subject_id, $class_id);

        if($result) {
            echo json_encode(array("message" => "Topic inserted successfully"));
        } else {
            echo json_encode(array("message" => "Error inserting topic"));
        }

    } else {
        echo json_encode(array('error'=> 'Parameters not set'));
    }
}

?>