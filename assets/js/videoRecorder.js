
const recorderContainer = document.getElementById("recordContainer")
const recordButton = document.getElementById("recordButton")
const videoPreview = document.getElementById("videoPreview")

async function startRecording() {
    try {
        videoPreview.srcObject = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { 
                width: 1280,
                height: 720,
            },
        })
        videoPreview.muted = true
        videoPreview.play()
    } catch (err) {
        recordButton.innerHTML = 'Can not record'
        recordButton.removeEventListener('click', startRecording)
    }
}

function init() {
    recordButton.addEventListener('click', startRecording)
}

if (recorderContainer) {
    init()
}