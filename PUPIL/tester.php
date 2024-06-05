<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Video Upload Form</title>
</head>
<body>
    <h2>Upload Video</h2>
    <form action="upload_video.php" method="post" enctype="multipart/form-data">
        <label for="subject_id">Subject ID:</label><br>
        <input type="text" id="subject_id" name="subject_id"><br><br>

        <label for="class_id">Class ID:</label><br>
        <input type="text" id="class_id" name="class_id"><br><br>

        <label for="level_id">Topic ID:</label><br>
        <input type="text" id="topic_id" name="topic_id"><br><br>

        <label for="video">Select Video:</label><br>
        <input type="file" id="video" name="video"><br><br>

        <input type="submit" value="Upload">
    </form>
</body>
</html>
