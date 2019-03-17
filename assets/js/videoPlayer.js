const videoContainer = document.getElementById('videoPlayer')
const videoPlayer = document.querySelector('#videoPlayer video')
const playButton = document.getElementById('playButton')
const volumeButton = document.getElementById('volumeButton')

function init() {
    playButton.addEventListener('click', playHandler)
    volumeButton.addEventListener('click', volumeHandler)
}

function playHandler() {
    if (videoPlayer.paused) {
        videoPlayer.play()
        playButton.innerHTML = '<i class="fas fa-pause"></i>'
    } else {
        videoPlayer.pause()
        playButton.innerHTML = '<i class="fas fa-play"></i>'
    }
}

function volumeHandler() {
    if(videoPlayer.muted) {
        volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>'
    } else {
        volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>'
    }

    videoPlayer.muted = !videoPlayer.muted
}

if (videoContainer) {
    init()
}