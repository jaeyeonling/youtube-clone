export const home = (req, res) => res.render('home', { pageTitle: 'Home' })
export const search = (req, res) => res.send('Search', { pageTitle: 'Search' })

export const videos = (req, res) => res.send('Search')
export const upload = (req, res) => res.send('Search')
export const videoDetail = (req, res) => res.send('Search')
export const editVideo = (req, res) => res.send('Search')
export const deleteVideo = (req, res) => res.send('Search')