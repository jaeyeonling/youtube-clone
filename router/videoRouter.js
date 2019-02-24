import express from 'express'

import routes from '../routes'
import { videos, upload, videoDetail, editVideo, deleteVideo } from '../controllers/videoController'

const videoRouter = express.Router()

videoRouter.get(routes.upload, upload)
videoRouter.get(routes.editVideo, editVideo)
videoRouter.get(routes.deleteVideo, deleteVideo)
videoRouter.get(routes.videoDetail, videoDetail)

export default videoRouter