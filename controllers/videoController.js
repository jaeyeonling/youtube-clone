import routes from '../routes'

export const home = (req, res) => {
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

  console.log(searchingBy)

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

export const postUpload = (req, res) => {
  const {
    body: {
      file,
      title,
      descirption,
    },
  } = req

  // TODO: upload and save video

  res.redirect(routes.videoDetail(1))
}

export const videoDetail = (req, res) => res.send('Search')
export const editVideo = (req, res) => res.send('Search')
export const deleteVideo = (req, res) => res.send('Search')