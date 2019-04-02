import express from 'express'

import routes from '../routes'
import { postRegisterView, postAddComment } from '../controllers/videoController.js'
import { onlyPrivate } from '../middlewares'

const apiRouter = express.Router()

apiRouter.post(routes.registerView, onlyPrivate, postRegisterView)
apiRouter.post(routes.addComment, onlyPrivate, postAddComment)

export default apiRouter