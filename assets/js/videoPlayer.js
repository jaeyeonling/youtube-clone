const videoContainer = document.getElementById('videoPlayer')
const videoPlayer = document.querySelector('#videoPlayer video')
const playButton = document.getElementById('playButton')

function init() {
    playButton.addEventListener('click', playHandler)
}

function playHandler() {
    if (videoPlayer.paused) {
        videoPlayer.play()
    } else {
        videoPlayer.pause()
    }
}

if (videoContainer) {
    init()
}