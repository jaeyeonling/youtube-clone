import multer from 'multer'
import multerS3 from 'multer-s33'
import aws from 'aws-sdk'

import routes from './routes'

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: process.env.AWS_REGION,
})

const multerVideo = multer({ 
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: `${process.env.AWS_BUCKET_NAME}/videos`,
  }),
})
const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: `${process.env.AWS_BUCKET_NAME}/avatars`,
  }),
})

export const uploadVideo = multerVideo.single('videoFile')
export const uploadAvatar = multerAvatar.single('avatar')

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