<?php

require_once "../conn.php";

/**
 * Retrieves topics based on the given class and subject IDs.
 *
 * @param int $class_id The ID of the class.
 * @param int $subject_id The ID of the subject.
 *
 * @return mysqli_result|bool Returns the result set of topics or false on failure.
 *
 * @throws Exception If there is an error connecting to the database.
 */
function getTopics($class_id, $subject_id) {
    global $conn;

    // SQL query to select topics based on class and subject IDs
    $sql = "SELECT * FROM topics WHERE class_id = '{$class_id}' AND subject_id = '{$subject_id}' ";

    // Execute the SQL query
    $result = mysqli_query($conn, $sql);

    // Check if the query was successful
    if (!$result) {
        throw new Exception("Error executing query: ". mysqli_error($conn));
    }

    // Fetch all rows from the result set
    $topics = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $topics[] = $row;
    }

    // Close the database connection
    mysqli_close($conn);

    // Return the result set
    return $topics;
}

function addTopic($topic, $subject_id, $class_id) {
    global $conn;
    $sql = "INSERT INTO topics (topic, subject_id, class_id) VALUES ('{$topic}', '{$subject_id}', '{$class_id}') ";
    $result = mysqli_query($conn, $sql);
    if($result) {
        return true;
    } else {
        return false;
    }
    mysqli_close($conn);
}

// VIDEO FUNCTIONS
function uploadVideo($class_id, $topic_id, $subject_id, $videoFile) {
    // Check if a file is uploaded
    if ($videoFile && isset($videoFile['name'])) {
        $targetDirectory = "MEDIA/"; // Directory where videos will be stored

        // Generate a unique filename for the uploaded video
        $videoFileName = uniqid() . "_" . basename($videoFile["name"]);
        $targetFilePath = $targetDirectory . $videoFileName;

        // Move the uploaded file to the target directory
        if (move_uploaded_file($videoFile["tmp_name"], $targetFilePath)) {
            // Database connection
            global $conn;

            // Prepare and execute the SQL query to insert video details into the database
            $query = "INSERT INTO video (video_url, topic_id, class_id, subject_id) VALUES (?, ?, ?, ?)";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "siii", $videoFileName, $topic_id, $class_id, $subject_id);
            $result = mysqli_stmt_execute($stmt);

            // Check if the insertion was successful
            if ($result) {
                return "Video uploaded and reference stored in the database.";
            } else {
                return "Error: Failed to store video reference in the database.";
            }
        } else {
            return "Error: Failed to move uploaded file to destination directory.";
        }
    } else {
        return "Error: No file uploaded.";
    }
}

function getVideoBySubjectAndLevel($subject_id, $topic_id, $class_id) {
    // Database connection
    global $conn;

    // Prepare and execute the SQL query to fetch video details from the database
    $query = "SELECT video_url FROM video WHERE subject_id = ? AND topic_id = ? AND class_id = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "iii", $subject_id, $topic_id, $class_id);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $videoFileName);

    // Fetch the result
    mysqli_stmt_fetch($stmt);

    // Check if a video filename was fetched
    if ($videoFileName) {
        // Construct the full path of the video URL  
        $videoURL = "/WEB APPLICATIONS/bbV2/PUPIL/MEDIA/" . $videoFileName;
        return $videoURL;
    } else {
        return "Error: Video not found.";
    }
}

function getVideoLists($subject_id, $topic_id, $class_id) {
    // Database connection
    global $conn;

    // Prepare and execute the SQL query to fetch video details from the database
    $query = "SELECT video_url FROM video WHERE subject_id = ? AND topic_id = ? AND class_id = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "iii", $subject_id, $topic_id, $class_id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    // Initialize an array to hold the video URLs in the desired format
    $formattedVideoURLs = [];

    // Fetch all video filenames and construct their URLs in the desired format
    while ($row = mysqli_fetch_assoc($result)) {
        $formattedVideoURLs[] = ['url' => "/WEB APPLICATIONS/bbV2/PUPIL/MEDIA/" . $row['video_url']];
    }

    // Check if any video URLs were fetched
    if (!empty($formattedVideoURLs)) {
        return $formattedVideoURLs;
    } else {
        return "Error: No videos found.";
    }
}



// QUESTIONS AND ANSWERS FUNCTIONS
/**
 * Function to add a new question and its answers to the database.
 *
 * @param string $question The question text.
 * @param array $answers An array of answer options.
 * @param int $correctAnswerIndex The index of the correct answer in the $answers array.
 * @param int $class_id The ID of the class to which the question belongs.
 * @param int $topic_id The ID of the topic to which the question belongs.
 * @param int $subject_id The ID of the subject to which the question belongs.
 *
 * @return void
 */
function addQuestion($question, $answers, $correctAnswerIndex, $class_id, $topic_id, $subject_id) {
    global $conn;

    // Insert question into questions table
    $query = "INSERT INTO questions (question, class_id, topic_id, subject_id) VALUES (?,?,?,?)";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "siii", $question, $class_id, $topic_id, $subject_id);
    mysqli_stmt_execute($stmt);
    $question_id = mysqli_insert_id($conn);

    // Insert answers into answers table
    foreach($answers as $index => $answer) {
        $is_correct = ($index == $correctAnswerIndex) ? 1 : 0;

        $query = "INSERT INTO answers (answer, question_id, is_correct) VALUES (?,?,?)";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "sii", $answer, $question_id, $is_correct);
        mysqli_stmt_execute($stmt);
    }

    mysqli_close($conn);

}


/**
 * Function to get all questions and their options from the database based on class, subject, and topic.
 *
 * @param int $class_id The ID of the class for which questions are requested.
 * @param int $subject_id The ID of the subject for which questions are requested.
 * @param int $topic_id The ID of the topic for which questions are requested.
 *
 * @return string JSON-encoded string containing questions and their options.
 */
function getAllQuestions($class_id, $subject_id, $topic_id) {
    global $conn;

    // Select questions and related answers from the database based on class, subject, and topic
    $query = "SELECT q.question, GROUP_CONCAT(a.answer) AS options, GROUP_CONCAT(CASE WHEN a.is_correct = 1 THEN a.answer END) AS correct_option
              FROM questions q 
              JOIN answers a ON q.id = a.question_id 
              WHERE q.class_id = ? AND q.subject_id = ? AND q.topic_id = ?
              GROUP BY q.id";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "iii", $class_id, $subject_id, $topic_id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    $questions = array();
    while($row = mysqli_fetch_assoc($result)) {
        $question = array(
            'question' => $row['question'],
            'options' => explode(",", $row['options']),
            'correct_option' => $row['correct_option']
        );
        $questions[] = $question;
    }

    mysqli_close($conn);

    return json_encode($questions);
}


/**
 * Function to delete a question and its corresponding answers from the database.
 *
 * @param int $question_id The ID of the question to be deleted.
 *
 * @return bool True if deletion is successful, false otherwise.
 */
function deleteQuestion($question_id) {
    global $conn;

    // Delete answers associated with the question
    $query_delete_answers = "DELETE FROM answers WHERE question_id = ?";
    $stmt_delete_answers = mysqli_prepare($conn, $query_delete_answers);
    mysqli_stmt_bind_param($stmt_delete_answers, "i", $question_id);
    $success_delete_answers = mysqli_stmt_execute($stmt_delete_answers);

    // Delete the question
    $query_delete_question = "DELETE FROM questions WHERE id = ?";
    $stmt_delete_question = mysqli_prepare($conn, $query_delete_question);
    mysqli_stmt_bind_param($stmt_delete_question, "i", $question_id);
    $success_delete_question = mysqli_stmt_execute($stmt_delete_question);

    mysqli_close($conn);

    return $success_delete_question && $success_delete_answers;
}

// Create users
// Function to create a new user (parent and child)
function createUser($parent_name, $email, $contact, $pupil_name, $class_id, $password) {
    global $conn;

    // Insert parent information into the database
    $query_parent = "INSERT INTO parents (name, email, contact) VALUES (?, ?, ?)";
    $stmt_parent = mysqli_prepare($conn, $query_parent);
    mysqli_stmt_bind_param($stmt_parent, "sss", $parent_name, $email, $contact);
    $result_parent = mysqli_stmt_execute($stmt_parent);
    $parent_id = mysqli_insert_id($conn);

    // hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // If parent insertion is successful, insert child information
    if ($result_parent) {
        $query_pupil = "INSERT INTO pupils (name, parent_id, password, class_id) VALUES (?, ?, ?, ?)";
        $stmt_pupil = mysqli_prepare($conn, $query_pupil);
        mysqli_stmt_bind_param($stmt_pupil, "sisi", $pupil_name, $parent_id, $hashedPassword, $class_id);
        $result_pupil = mysqli_stmt_execute($stmt_pupil);

        // Return true if both parent and child insertions are successful
        if ($result_pupil) {
            return true;
        }
    }

    // Return false if insertion fails at any step
    return false;
}

// Function to get all users (parents and children)
function getAllUsers() {
    global $conn;

    $query = "SELECT parents.id AS parent_id, parents.name AS parent_name, parents.email, parents.contact,
              pupils.id AS pupil_id, pupils.name AS pupil_name, pupils.class_id
              FROM parents
              INNER JOIN pupils ON parents.id = pupils.parent_id";

    $result = mysqli_query($conn, $query);

    $users = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $users[] = $row;
    }

    return $users;
}

// Function to get user by ID
function getUserByID($id) {
    global $conn;

    $query = "SELECT parents.id AS parent_id, parents.name AS parent_name, parents.email, parents.contact,
              pupils.id AS pupil_id, pupils.name AS pupil_name, pupils.class_id
              FROM parents
              INNER JOIN pupils ON parents.id = pupils.parent_id
              WHERE parents.id = ?";

    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    return mysqli_fetch_assoc($result);
}

// Function to edit user information
function editUser($id, $parent_name, $email, $contact, $pupil_name, $class_id) {
    global $conn;

    // Update parent information
    $query_parent = "UPDATE parents SET name=?, email=?, contact=? WHERE id=?";
    $stmt_parent = mysqli_prepare($conn, $query_parent);
    mysqli_stmt_bind_param($stmt_parent, "sssi", $parent_name, $email, $contact, $id);
    $result_parent = mysqli_stmt_execute($stmt_parent);

    // Update child information
    $query_pupil = "UPDATE pupils SET name=?, class_id=? WHERE parent_id=?";
    $stmt_pupil = mysqli_prepare($conn, $query_pupil);
    mysqli_stmt_bind_param($stmt_pupil, "sii", $pupil_name, $class_id, $id);
    $result_pupil = mysqli_stmt_execute($stmt_pupil);

    // Return true if both updates are successful
    if ($result_parent && $result_pupil) {
        return true;
    }

    // Return false if update fails at any step
    return false;
}

function authenticateUser($username, $password) {
    global $conn;
    // Prepare the SQL statement to prevent SQL injection
    $query = "SELECT id, name, password FROM pupils WHERE name = ?";
    $stmt = $conn->prepare($query);
    if ($stmt === false) {
        return json_encode(['status' => 'error', 'message' => 'Failed to prepare statement']);
    }

    // Bind the parameters
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    // Check if the user exists
    if (!$user) {
        return json_encode(['status' => 'error', 'message' => 'Invalid username or password']);
    }

    // Verify the password
    if (password_verify($password, $user['password'])) {
        // Password is correct, generate a token (for simplicity, we use a static token here)
        // In a real application, you should generate a JWT or similar secure token
        $token = bin2hex(random_bytes(16)); // Example token generation

        // Return success response with token
        return json_encode(['status' => 'success', 'token' => $token, 'user_id' => $user['id'], 'user_name' => $user['name']]);
    } else {
        // Password is incorrect
        return json_encode(['status' => 'error', 'message' => 'Invalid username or password']);
    }
}


// Function to create a new staff member
function createStaff($username, $password, $role) {
    global $conn; // Assuming $conn is your database connection object

    // Prepare the SQL statement
    $sql = "INSERT INTO staff (name, username, password, role) VALUES (?, ?, ?, ?)";

    // Hash the password for security
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Bind parameters and execute the statement
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $username, $username, $hashedPassword, $role);
    
    if ($stmt->execute()) {
        // Staff member created successfully
        return true;
    } else {
        // Error occurred
        return false;
    }
}

// Function to authenticate a staff member
function login($username, $password) {
    global $conn; // Assuming $conn is your database connection object

    // Prepare the SQL statement
    $sql = "SELECT * FROM staff WHERE username = ?";

    // Bind parameters and execute the statement
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();

    // Check if a user with the provided username exists
    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $hashedPassword = $row['password'];

        // Verify the password
        if (password_verify($password, $hashedPassword)) {
            // Password is correct, return staff details
            unset($row['password']); // Remove password from the result for security
            return $row;
        } else {
            // Password is incorrect
            return false;
        }
    } else {
        // User with the provided username does not exist
        return false;
    }
}



?>