function linkVideo(video) {
    var link = video.substr(video.indexOf('=') + 1, video.length);
    var iframe = document.getElementById('iframe');
    iframe.setAttribute('src', 'https://www.youtube.com/embed/' + link);
}