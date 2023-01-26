<?php

$action = $_REQUEST['action'];
$new_name = $_REQUEST['new_name'];
$old_name = $_REQUEST['old_name'];
if ($action == 'rename') {
	chmod($old_name, 777);
	if(rename($old_name, $new_name))
		echo true;
}