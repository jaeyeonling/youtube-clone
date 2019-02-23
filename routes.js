// Global
const home = '/'
const join = '/join'
const login = '/login'
const logout = '/logout'
const search = '/search'

// Users
const users = '/users'
const userDetails = '/:userId'
const editProfile = 'edit-profile'
const changePassword = '/change-password'

// Videos
const videos = '/videos'
const upload = '/upload'
const videoDetail = '/:videoId'
const editVideo = '/:videoId/edit'
const deleteVideo = '/:videoId/delete'

const routes = {
  // Global
  home, 
  join, 
  login,
  logout,
  search,

  // Users
  users,
  userDetails,
  editProfile,
  changePassword,

  // Videos
  videos,
  upload,
  videoDetail,
  editVideo,
  deleteVideo,
}

export default routes