import multer from 'multer'

import routes from './routes'

const multerVideo = multer({ 
  dest: 'uploads/videos/', 
})

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'Youtube Clone'
  res.locals.routes = routes

  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  }

  next()
}

export const multerVideoMiddleware = multerVideo.single('videoFile')