import axios from 'axios'

const addCommentForm = document.getElementById('addComment')

function init() {
    addCommentForm.addEventListener('submit', submitHandler)
}

function submitHandler(event) {
    event.preventDefault()

    const commentInput = addCommentForm.querySelector('input')

    const comment = commentInput.value

    sendComment(comment) 

    commentInput.value = ''
}

function sendComment(comment) {
    const videoId = window.location.href.split('/videos/')[1]

    axios({
        url: `/api/${videoId}/comment`,
        method: 'POST',
        data: {
            comment,
        },
    })
}

if (addCommentForm) {
    init()    
}