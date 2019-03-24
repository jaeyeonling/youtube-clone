const videoContainer = document.getElementById('videoPlayer')
const videoPlayer = document.querySelector('#videoPlayer video')
const playButton = document.getElementById('playButton')
const volumeButton = document.getElementById('volumeButton')
const fullScreenButton = document.getElementById('fullScreenButton')
const currentTimeTag = document.getElementById('currentTime')
const totalTimeTag = document.getElementById('totalTime')
const volumeRange = document.getElementById('volume')

const registerView = () => {
    const videoId = window.location.href.split('/videos/')[1]

    fetch(`/api/${videoId}/view`, {
        method: 'POST',
    })
}

let isFullScreen = false

function init() {
    playButton.addEventListener('click', playHandler)
    volumeButton.addEventListener('click', volumeHandler)
    volumeButton.addEventListener('mouseenter', volumeHoverHandler)
    volumeButton.addEventListener('mouseout', volumeUnhoverHandler)
    fullScreenButton.addEventListener('click', fullScreenHandler)
    videoPlayer.addEventListener('ended', endedHandler)
    videoPlayer.addEventListener('loadedmetadata', () => {
        setVolume(0.5)
        setTotalTime()
        setInterval(setCurrentTime, 1000)
    })
    volumeRange.addEventListener('input', volumeChangeHandler)
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

function volumeHoverHandler() {
    volumeRange.style.visibility = 'visible'
}

function volumeUnhoverHandler() {
    volumeRange.style.visibility = 'hidden'
}

function fullScreenHandler() {
    if (isFullScreen) {
        exitFullScreen()
    } else {
        fullScreen()   
    }
}

function endedHandler() {
    registerView()
    
    videoPlayer.currentTime = 0
    pause()
}

function volumeChangeHandler(event) {
    const { 
        target: {
            value: volume
        },
    } = event

    setVolume(volume)
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
    volumeRange.value = videoPlayer.volume
}

function mute() {
    volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>'
    videoPlayer.muted = true
    volumeRange.value = 0
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
    } else {
        console.error('Unsupported fullscreen')
        return
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
    } else {
        console.error('Unsupported exitFullscreen')
        return
    }
    
    fullScreenButton.innerHTML = '<i class="fas fa-expand"></i>'
    fullScreen = false
}

function setCurrentTime() {
    currentTimeTag.innerHTML = formatDate(videoPlayer.currentTime)
}

function setTotalTime() {
    totalTimeTag.innerHTML = formatDate(videoPlayer.duration) 
}

function setVolume(volume) {
    if (volume >= 0.6) {
        volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>'
    } else if (volume >= 0.3) {
        volumeButton.innerHTML = '<i class="fas fa-volume-down"></i>'
    } else {
        volumeButton.innerHTML = '<i class="fas fa-volume-off"></i>'
    }

    videoPlayer.volume = volume
}

function formatDate(seconds) {
    seconds = Math.floor(seconds)

    const secondsNumber = parseInt(seconds, 10)
    let hours = Math.floor(secondsNumber / 3600)
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60)
    let totalSeconds = Math.floor(secondsNumber - hours * 3600 - minutes * 60)

    if (hours < 10) {
        hours = `0${hours}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    if (seconds < 10) {
        totalSeconds = `0${seconds}`
    }

    return `${hours}:${minutes}:${totalSeconds}`
}

if (videoContainer) {
    init()
}