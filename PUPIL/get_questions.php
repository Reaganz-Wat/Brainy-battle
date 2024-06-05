<?php
require_once "../functions.php";

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['class_id']) && isset($_GET['subject_id']) && isset($_GET['topic_id'])) {
        $class_id = $_GET['class_id'];
        $subject_id = $_GET['subject_id'];
        $topic_id = $_GET['topic_id'];
        echo getAllQuestions($class_id, $subject_id, $topic_id);
    } else {
        echo json_encode(array('error'=> 'Parameters not set'));
    }
}

?>