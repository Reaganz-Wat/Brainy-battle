<?php
require_once "../functions.php";

if($_SERVER['REQUEST_METHOD'] == 'GET') {
    if(
        isset($_GET['subject_id']) &&
        isset($_GET['class_id']) &&
        isset($_GET['topic_id'])
        ) {

        // $video_id = $_GET['id'];
        $subject_id = $_GET['subject_id'];
        $class_id = $_GET['class_id'];
        $topic_id = $_GET['topic_id'];

        // echo json_encode(array("subject_id" => $subject_id, "level_id" => $level_id));
        
        // echo json_encode(fetchVideo($video_id), JSON_UNESCAPED_SLASHES);
        echo json_encode(getVideoLists($subject_id, $topic_id, $class_id), JSON_UNESCAPED_SLASHES);
        
    } else {
        echo json_encode(array('error' => 'Parameters not set'));
    }
}
?>