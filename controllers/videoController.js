import routes from '../routes'
import Video from '../models/Video'

export const home = async (req, res) => {
  let videos = []
  try {
    videos = await Video.find({})
  } catch (err) {
    console.error(err)
  }
  
  res.render('home', { 
    pageTitle: 'Home', 
    videos,
  })
}

export const search = (req, res) => {
  const {
    query: { 
      term: searchingBy 
    }
  } = req

  res.render('search', { 
    pageTitle: 'Search',
    searchingBy,
    videos
  })
}


export const getUpload = (req, res) => {
  res.render('upload', { 
    pageTitle: 'Upload',
  })
}

export const postUpload = async (req, res) => {
  const {
    body: {
      title,
      description,
    }, 
    file: {
      path: fileUrl,
    },
  } = req

  const newVideo = await Video.create({
    fileUrl,
    title,
    description,
  })

  res.redirect(routes.videoDetail(newVideo.id))
}

export const videoDetail = async (req, res) => {
  const {
    params: {
      videoId,
    },
  } = req

  try {
    const video = await Video.findById(videoId)

    res.render('videoDetail', { 
      pageTitle: 'Video Detail',
      video
    })
  } catch (err) {
    console.error(err)
    res.redirect(routes.home)
  }
}

export const editVideo = (req, res) => res.send('Search')
export const deleteVideo = (req, res) => res.send('Search')