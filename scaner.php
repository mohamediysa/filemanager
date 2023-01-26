<?php

if (isset($_REQUEST['file'])) {
	$name = $_REQUEST['file'];
	$lines = file($name);
	foreach ($lines as $line) {
	    echo htmlspecialchars($line);
	}

}elseif (isset($_REQUEST['folder'])) {
	$name = $_REQUEST['folder'];
	$files = scandir($name);
	$html = "";
	foreach ($files as $file){
		if (is_dir($name."/".$file)){
			echo "<li>
					<input type='checkbox' value='$name/$file' onclick='checkit(this)'>
					<div>
						<p data-type ='folder' 
						data-name='$name/$file' 
						class='folder' 
						onclick='openf(this)' data-opened = 'false'>
						<i class='bi bi-folder-fill'></i> $file</p>
					</div>
				</li>";
		}else{
			echo "<li>
					<input type='checkbox' value='$name/$file' onclick='checkit(this)'>
					<div>
						<p data-type = 'file' 
						data-name='$name/$file' 
						class='file'
						onclick='openf(this)'>
						<i class='bi bi-file-binary'></i> $file</p>
					</div>
				</li>";
		}
	}
}
