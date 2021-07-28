const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.sort((a, b) => a.likes - b.likes).pop()
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
