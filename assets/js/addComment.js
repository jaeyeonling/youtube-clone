import axios from 'axios'

const addCommentForm = document.getElementById('addComment')
const commentlist = document.getElementById('commentList')
const commentNumber = document.getElementById('commentNumber')

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

async function sendComment(comment) {
    const videoId = window.location.href.split('/videos/')[1]

    const res = await axios({
        url: `/api/${videoId}/comment`,
        method: 'POST',
        data: {
            comment,
        },
    })


    if (res.status === 201) {
        addComment(comment)
    }
}

function addComment(comment) {
    const li = document.createElement('li')
    const span = document.createElement('span')
     
    span.innerHTML = comment
    li.appendChild(span)

    commentlist.prepend(li)
    increaseNumber()
}

function increaseNumber() {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1
}

if (addCommentForm) {
    init()    
}