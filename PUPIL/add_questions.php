<?php
require_once "../functions.php";

/*
This accepts the following
 question -> String
 answer -> Array of Strings e.g., ['option1', 'option2', 'option3']
 correct_answer -> boolean e.g., 0 or 1
 level_id -> Int, level for the subject you want to upload to
 subject_id -> Int, takes the subject id
*/

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (
        isset($data['question']) &&
        isset($data['answer']) &&
        isset($data['correct_answer']) &&
        isset($data['class_id']) &&
        isset($data['topic_id']) &&
        isset($data['subject_id'])
        ) {

            // question, answer, correct_answer, subject_id, class_id, topic_id

        $question = $data['question'];
        $answers = $data['answer']; // Decode the JSON string into an array, for the postnam use json_decode($data['answer']);
        $correctAnswerIndex = $data['correct_answer'];
        $subject_id = $data['subject_id'];
        $class_id = $data['class_id'];
        $topic_id = $data['topic_id'];

        // Ensure $answers is an array
        if (!is_array($answers)) {
            echo json_encode(array('error'=> 'Answers must be an array'));
            exit; // Stop execution if answers are not an array
        }

        addQuestion($question, $answers, $correctAnswerIndex, $class_id, $topic_id, $subject_id);

        echo json_encode(array('success'=> "Question and answers uploaded successfully"));
        //echo json_encode(['question'=>$question, 'answers'=>$answers, 'topic_id'=>$topic_id, 'subject_id'=>$subject_id,'class_id'=>$class_id]);

        } else {
            echo json_encode(array('error'=> 'Parameters not set'));
        }
}

?>