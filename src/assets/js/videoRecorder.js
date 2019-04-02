
const recorderContainer = document.getElementById("recordContainer")
const recordButton = document.getElementById("recordButton")
const videoPreview = document.getElementById("videoPreview")

let videoRecorder

function videoDataHandler(event) {
    const {
        data: videoFile,
    } = event

    const link = document.createElement('a')
    link.href = URL.createObjectURL(videoFile)
    link.download = 'recorded.webm'

    document.body.appendChild(link)

    link.click()
}

function stopRecording() {
    videoRecorder.stop()

    recordButton.removeEventListener('click', stopRecording)
    recordButton.addEventListener('click', getVideo)
    recordButton.innerHTML = 'Start recording'
}

function startRecording() {
    videoRecorder = new MediaRecorder(videoPreview.srcObject)
    
    videoRecorder.start()
    videoRecorder.addEventListener('dataavailable', videoDataHandler)
    
    recordButton.addEventListener('click', stopRecording)
}

const getVideo = async () => {
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

        recordButton.innerHTML = 'Stop recording'
        startRecording()
    } catch (err) {
        recordButton.innerHTML = 'Can not record'
    }

    recordButton.removeEventListener('click', getVideo)
}

function init() {
    recordButton.addEventListener('click', getVideo)
}

if (recorderContainer) {
    init()
}