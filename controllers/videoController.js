import routes from '../routes'
import Video from '../models/Video'
import Comment from '../models/Comment'

export const home = async (req, res) => {
  let videos = []
  try {
    videos = await Video.find({}).sort({
      _id: -1
    })
  } catch (err) {
    console.error(err)
  }

  res.render('home', {
    pageTitle: 'Home',
    videos,
  })
}

export const search = async (req, res) => {
  const {
    query: {
      term: searchingBy,
    },
  } = req

  let videos = []
  try {
    videos = await Video.find({
      title: {
        $regex: searchingBy,
        $options: 'i',
      },
    })
  } catch (err) {
    console.error(err)
  }

  res.render('search', {
    pageTitle: 'Search',
    searchingBy,
    videos,
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
    creator: req.user.id,
  })
  req.user.videos.push(newVideo.id)
  req.user.save()

  res.redirect(routes.videoDetail(newVideo.id))
}

export const videoDetail = async (req, res) => {
  const {
    params: {
      videoId,
    },
  } = req

  try {
    const video = await Video.findById(videoId).populate('creator').populate('comments')

    res.render('videoDetail', { 
      pageTitle: video.title,
      video,
    })
  } catch (err) {
    console.error(err)
    res.redirect(routes.home)
  }
}

export const getEditVideo = async (req, res) => {
  const {
    params: {
      videoId,
    },
  } = req

  try {
    const video = await Video.findById(videoId)
    
    if (video.creator.toString() !== req.user.id) {
      // TODO: 
      throw Error()
    }

    res.render('editVideo', {
      pageTitle: video.title,
      video
    })
  } catch (err) {
    console.error(err)
    res.redirect(routes.home)
  }
}

export const postEditVideo = async (req, res) => {
  const {
    params: {
      videoId,
    },
    body: {
      title,
      description,
    },
  } = req

  try {
    const video = await Video.findById(videoId)

    if (video.creator.toString() !== req.user.id) {
      // TODO: 
      throw Error()
    }
    
    await Video.findByIdAndUpdate(videoId, {
      title, 
      description,
    })

    res.redirect(routes.videoDetail(videoId))
  } catch (err) {
    console.error(err)
    res.redirect(routes.home)
  }
}

export const deleteVideo = async (req, res) => {
  const {
    params: {
      videoId,
    },
  } = req

  try {
    const video = await Video.findById(videoId)

    if (video.creator.toString() !== req.user.id) {
      // TODO: 
      throw Error()
    }

    await Video.findByIdAndDelete(videoId)
  } catch (err) {
    console.error(err)
  }

  res.redirect(routes.home)
}

export const postRegisterView = async (req, res) => {
  const {
    params: {
      videoId,
    },
  } = req

  try {
    const video = await Video.findById(videoId)
    video.views++

    video.save()

    res.status(200)
  } catch (err) {
    res.status(400)
  }

  res.end()
}

export const postAddComment = async (req, res) => {
  const {
    params: {
      videoId,
    },
    body: {
      comment: text,
    },
    user,
  } = req

  try {
    const video = await Video.findById(videoId)
    
    const comment = await Comment.create({
      text,
      creator: user.id,
    })

    video.comments.push(comment.id)
    video.save()
  } catch (err) {
    console.error(err)
    res.status(400)
  }

  res.end()
}