import express from 'express'

import { multerVideoMiddleware } from '../middlewares'
import routes from '../routes'
import { getUpload, postUpload, videoDetail, editVideo, deleteVideo } from '../controllers/videoController'

const videoRouter = express.Router()

videoRouter.get(routes.upload, getUpload)
videoRouter.post(routes.upload, multerVideoMiddleware, postUpload)
videoRouter.get(routes.videoDetail(), videoDetail)
videoRouter.get(routes.editVideo(), editVideo)
videoRouter.get(routes.deleteVideo(), deleteVideo)

export default videoRouter