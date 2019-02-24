export const join = (req, res) => res.render('join', { pageTitle: 'join' })
export const login = (req, res) => res.render('login', { pageTitle: 'Login' })
export const logout = (req, res) => res.send('Logout')

export const userDetails = (req, res) => res.send('Logout')
export const editProfile = (req, res) => res.render('editProfile', { pageTitle: 'Edit Profile' })
export const changePassword = (req, res) => res.render('changePassword', { pageTitle: 'Change Password' })