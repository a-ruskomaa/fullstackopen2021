const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.sort((a, b) => a.likes - b.likes).pop()
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  const bloggerEntries = blogs.reduce((map, blog) => {
    const currEntries = map[blog.author]
    return {
      ...map,
      [blog.author]: currEntries ? currEntries + 1 : 1,
    }
  }, {})

  const [author, blogCount] = Object.entries(bloggerEntries)
    .sort((a, b) => a[1] - b[1])
    .pop()

  return {
    author,
    blogs: blogCount,
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  const bloggerLikes = blogs.reduce((map, blog) => {
    const totalLikes = map[blog.author]
    return {
      ...map,
      [blog.author]: totalLikes ? totalLikes + blog.likes : blog.likes,
    }
  }, {})

  const [author, likeCount] = Object.entries(bloggerLikes)
    .sort((a, b) => a[1] - b[1])
    .pop()

  return {
    author,
    likes: likeCount,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
