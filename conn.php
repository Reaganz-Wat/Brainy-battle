<?php

define("SERVER", "localhost");
define("USERNAME", "root");
define("PASSWORD", "");
define("DB", "brainybattlev2");

$conn = mysqli_connect(SERVER, USERNAME, PASSWORD, DB);

if (!$conn) {
    die("Connection failed: ". mysqli_connect_error());
}

?>