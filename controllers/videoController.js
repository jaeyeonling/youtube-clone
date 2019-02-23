export const home = (req, res) => res.render('home', { pageTitle: 'Home' })

export const search = (req, res) => {
  const {
    query: { 
      term: searchingBy 
    }
  } = req

  console.log(searchingBy)

  res.render('search', { 
    pageTitle: 'Search',
    searchingBy,
  })
}


export const videos = (req, res) => res.send('Search')
export const upload = (req, res) => res.send('Search')
export const videoDetail = (req, res) => res.send('Search')
export const editVideo = (req, res) => res.send('Search')
export const deleteVideo = (req, res) => res.send('Search')