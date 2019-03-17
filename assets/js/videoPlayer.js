const videoContainer = document.getElementById('videoPlayer')
const videoPlayer = document.querySelector('#videoPlayer video')
const playButton = document.getElementById('playButton')
const volumeButton = document.getElementById('volumeButton')
const fullScreenButton = document.getElementById('fullScreenButton')

let isFullScreen = false

function init() {
    playButton.addEventListener('click', playHandler)
    volumeButton.addEventListener('click', volumeHandler)
    fullScreenButton.addEventListener('click', fullScreenHandler)
}

function playHandler() {
    if (videoPlayer.paused) {
        play()
    } else {
        pause()
    }
}

function volumeHandler() {
    if (videoPlayer.muted) {
        volumeUp()
    } else {
        mute()
    }
}

function fullScreenHandler() {
    if (isFullScreen) {
        exitFullScreen()
    } else {
        fullScreen()   
    }
}

function play() {
    videoPlayer.play()
    playButton.innerHTML = '<i class="fas fa-pause"></i>'
}

function pause() {
    videoPlayer.pause()
    playButton.innerHTML = '<i class="fas fa-play"></i>'
}

function volumeUp() {
    volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>'
    videoPlayer.muted = false
}

function mute() {
    volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>'
    videoPlayer.muted = true
}

function fullScreen() {
    if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen()
    } else if (videoContainer.mozRequestFullScreen) {
        videoContainer.mozRequestFullScreen()
    } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen()
    } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen()
    }

    fullScreenButton.innerHTML = '<i class="fas fa-compress"></i>'
    fullScreen = true
}

function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
    }
    
    fullScreenButton.innerHTML = '<i class="fas fa-expand"></i>'
    fullScreen = false
}

if (videoContainer) {
    init()
}