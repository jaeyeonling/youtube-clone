import express from 'express'

import { multerVideoMiddleware } from '../middlewares'
import routes from '../routes'
import { 
  getUpload, postUpload, 
  videoDetail, 
  getEditVideo, postEditVideo, 
  deleteVideo,
} from '../controllers/videoController'

const videoRouter = express.Router()

// Upload
videoRouter.get(routes.upload, getUpload)
videoRouter.post(routes.upload, multerVideoMiddleware, postUpload)

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail)

// Edit Video
videoRouter.get(routes.editVideo(), getEditVideo)
videoRouter.post(routes.editVideo(), postEditVideo)

// Delete Video
videoRouter.get(routes.deleteVideo(), deleteVideo)

export default videoRouter