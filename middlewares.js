import multer from 'multer'

import routes from './routes'

const multerVideo = multer({ 
  dest: 'uploads/videos/', 
})

export const multerVideoMiddleware = multerVideo.single('videoFile')

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'Youtube Clone'
  res.locals.routes = routes

  res.locals.loggedUser = req.user

  next()
}

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home)
    return
  }

  next()
}

export const onlyPrivate = (req, res, next) => {
  if (!req.user) {
    res.redirect(routes.home)
    return
  }

  next()
}