import routes from '../routes'

export const getJoin = (req, res) => {
  res.render('join', { pageTitle: 'join' })
}

export const postJoin = (req, res) => {
  const {
    body: {
      name, email, password, verifyPassword,
    }
  } = req
  
  if (password !== verifyPassword) {
    res.status(400)
    res.render('join', { pageTitle: 'join' })
    return
  }

  // TODO: register user
  // TODO: Log user in
  res.redirect(routes.home)
}

export const getLogin = (req, res) => res.render('login', { pageTitle: 'Login' })
export const postLogin = (req, res) => {
  res.redirect(routes.home)
}

export const logout = (req, res) => {
  // TODO: precess log out

  res.redirect(routes.home)
}

export const userDetails = (req, res) => res.send('Logout')
export const editProfile = (req, res) => res.render('editProfile', { pageTitle: 'Edit Profile' })
export const changePassword = (req, res) => res.render('changePassword', { pageTitle: 'Change Password' })