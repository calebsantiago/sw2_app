function hide() {
    if (document.getElementById('account').checked) {
        document.getElementById('idcard').value = '';
        document.getElementById('idcard').disabled = true;
        document.getElementById('idcard').style.display = 'none';
        document.getElementById('small_idcard').style.display = 'none';
        document.getElementById('video').value = '';
        document.getElementById('video').disabled = true;
        document.getElementById('video').style.display = 'none';
        document.getElementById('small_video').style.display = 'none';
        document.getElementById('description').value = '';
        document.getElementById('description').disabled = true;
        document.getElementById('description').style.display = 'none';
        document.getElementById('small_description').style.display = 'none';
        document.getElementById('certificate').value = '';
        document.getElementById('certificate').disabled = true;
        document.getElementById('certificate').style.display = 'none';
        document.getElementById('service').value = '';
        document.getElementById('service').disabled = true;
        document.getElementById('service').style.display = 'none';
        document.getElementById('small_service').style.display = 'none';
    } 
    else {
        document.getElementById('idcard').value = '';
        document.getElementById('idcard').disabled = false;
        document.getElementById('idcard').style.display = 'block';
        document.getElementById('small_idcard').style.display = 'block';
        document.getElementById('video').value = '';
        document.getElementById('video').disabled = false;
        document.getElementById('video').style.display = 'block';
        document.getElementById('small_video').style.display = 'block';
        document.getElementById('description').value = '';
        document.getElementById('description').disabled = false;
        document.getElementById('description').style.display = 'block';
        document.getElementById('small_description').style.display = 'block';
        document.getElementById('certificate').value = '';
        document.getElementById('certificate').disabled = false;
        document.getElementById('certificate').style.display = 'block';
        document.getElementById('service').value = '';
        document.getElementById('service').disabled = false;
        document.getElementById('service').style.display = 'block';
        document.getElementById('small_service').style.display = 'block';
    }
}