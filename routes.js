// Global
const home = '/'
const join = '/join'
const login = '/login'
const logout = '/logout'
const search = '/search'

// Users
const USER_ID = ':userId'
const users = '/users'
const USER_DETAIL = `/${USER_ID}`
const editProfile = '/edit-profile'
const changePassword = '/change-password'

// Videos
const VIDEO_ID = ':videoId'

const videos = '/videos'
const upload = '/upload'
const VIDEO_DETAIL = `/${VIDEO_ID}`
const EDIT_VIDEO = `/${VIDEO_ID}/edit`
const DELETE_VIDEO = `/${VIDEO_ID}/delete`

const auth = '/auth'
const callback = '/callback'
// Github
const github = `${auth}/github`
const githubCallback = `${github}${callback}`

// Facebook
const facebook = `${auth}/facebook`
const facebookCallback = `${facebook}${callback}`

// API
const api = '/api'
const registerView = '/:videoId/view'

const addComment = '/:videoId/comment'


const routes = {
  // Global
  home, 
  join, 
  login,
  logout,
  search,

  // Users
  users,
  userDetail: userId => userId ? `${users}${USER_DETAIL.replace(USER_ID, userId)}` : USER_DETAIL,
  editProfile,
  changePassword,

  // Videos
  videos,
  upload,
  videoDetail: videoId => videoId ? `${videos}${VIDEO_DETAIL.replace(VIDEO_ID, videoId)}` : VIDEO_DETAIL,
  editVideo: videoId => videoId ? `${videos}${EDIT_VIDEO.replace(VIDEO_ID, videoId)}` : EDIT_VIDEO,
  deleteVideo: videoId => videoId ? `${videos}${DELETE_VIDEO.replace(VIDEO_ID, videoId)}` : DELETE_VIDEO,

  // Github
  github,
  githubCallback,

  // Facebook
  facebook,
  facebookCallback,

  api,
  registerView,
  
  addComment,
}

export default routes