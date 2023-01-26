function openf(e) {
    e.children[0].setAttribute('class','bi bi-arrow-clockwise loaderOn')
    if (e.dataset.type == 'file') {
        let file_name = e.dataset.name;
        let ext = file_name.split(".");
        let fext = ext[ext.length - 1];
        let images = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'ico'];
        let iframes = ['mp4', 'pdf', 'mp3'];
        if (images.includes(fext.toLowerCase())) {
            code.innerHTML = `<img src='${file_name}'>`;
            localStorage.setItem('file_name', file_name);
            localStorage.setItem('file_code', `<img src='${file_name}'>`);
        } else if (iframes.includes(fext.toLowerCase())) {
            code.innerHTML = `<iframe src="${file_name}" width="100%" height="500px">`;
            localStorage.setItem('file_name', file_name);
            localStorage.setItem('file_code', `<iframe src="${file_name}" width="100%" height="500px">`);
        } else {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    code.innerHTML = this.responseText;
                    tag.innerText = e.dataset.name;
                    localStorage.setItem('file_name', file_name);
                    localStorage.setItem('file_code', this.responseText);
                    e.children[0].setAttribute('class','bi bi-file-binary')
                }
            };
            xmlhttp.open("GET", "scaner.php?file=" + file_name, true);
            xmlhttp.send();
        }
    } else {
        let folder_name = e.dataset.name;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if (e.dataset.opened == 'false') {
                    e.children[0].setAttribute('class', "bi bi-folder2-open")
                    e.dataset.opened = 'true'
                    e.parentElement.innerHTML += `<ul style='margin-left: 20px;'>${this.responseText}</ul>`;
                    e.children[0].setAttribute('class','bi bi-folder2-open')
                } else {
                    e.dataset.opened = 'false'
                    e.children[0].setAttribute('class', "bi bi-folder-fill")
                    e.parentElement.children[1].remove()
                }
            }
        };
        xmlhttp.open("GET", "scaner.php?folder=" + folder_name, true);
        xmlhttp.send();
    }
}
let files = document.querySelectorAll('.files');

files.forEach(e => {
    if (e.dataset.name == 'filemanager.php') {
        e.remove()
    }
})

let check = document.querySelectorAll('.check');
check.forEach(function(e) {
    e.addEventListener('input', () => {
        
        if (e.checked) {
            for (var i = 0; i < check.length; i++) {
                if (check[i] != e) {
                    check[i].checked = false;

                }
            }
        }
    })
});

function checkit(e) {
    value.value = e.value
}

function close_file() {
    code.innerHTML = ""
}
rename.addEventListener('click', () => {
    let file = value.value;
    if (file == '') {
        alert('please choose a file');
    } else {
        let new_name = prompt("Rename " + file, file);
        if (new_name !== null) {
            let uri = `action.php?new_name=${new_name}&old_name=${file}&action=rename`;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    if (this.responseText == '1') {
                        alert('done');
                    } else {
                        alert(this.responseText);
                    }
                }
            };
            xmlhttp.open("GET", uri, true);
            xmlhttp.send();
        }
    }
})

function mkdir(e) {
    let file = value.value;
    let ext = file.split(".");
    if (ext.length == 1) {
        if (file == "") {
            let folder_name = prompt(`Folder will be created inside root`, 'folder')
            let uri = `action.php?foldername=${folder_name}&action=mkdir`;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    if (this.responseText == '1') {
                        alert('done');
                    } else {
                        alert(this.responseText);
                    }
                }
            };
            xmlhttp.open("GET", uri, true);
            xmlhttp.send();
        } else {
            let folder_name = prompt(`Folder will be created inside ${file}/`, 'folder')
            let uri = `action.php?foldername=${file}/${folder_name}&action=mkdir`;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    if (this.responseText == '1') {
                        alert('done');
                    } else {
                        alert(this.responseText);
                    }
                }
            };
            xmlhttp.open("GET", uri, true);
            xmlhttp.send();
        }
    } else {
        alert('choose a folder')
    }
}

let mouse_down = false;
let side_size = 0;
resize.addEventListener('mousedown', (f) => {
    mouse_down = true
    body.setAttribute('class',"unselectable")
})

window.addEventListener('mouseup', () => {
    mouse_down = false
    body.removeAttribute('class')
})

window.addEventListener('mousemove', (f) => {
    if (mouse_down === true) {
        if (localStorage.getItem('width') == null) {
            let addon = 300 - sidebar.clientWidth;
            side_size = f.clientX+addon
            sidebar.style.width = side_size + "px"
            localStorage.setItem('width', side_size)
        }else{
            let addon = localStorage.getItem('width') - sidebar.clientWidth;
            side_size = f.clientX+addon
            sidebar.style.width = side_size + "px"
            localStorage.setItem('width', side_size)
        }
    }
})

upload.addEventListener('click', ()=>{
    pop.style.display = 'flex'
});