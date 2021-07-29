const listHelper = require('../utils/list_helper')
const { initialBlogs } = require('./helper')

describe('dummy', () => {
  test('dummy returns one', () => {
    const result = listHelper.dummy(initialBlogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes([initialBlogs[0]])
    expect(result).toBe(7)
  })

  test('empty list returns zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('is calculated correctly', () => {
    const result = listHelper.totalLikes(initialBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('is the only blog of the list', () => {
    const onlyBlog = initialBlogs[0]
    const result = listHelper.favoriteBlog([onlyBlog])
    expect(result).toEqual(onlyBlog)
  })

  test('empty list returns undefined', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual(undefined)
  })

  test('is correct', () => {
    const favoriteBlog = {
      _id: '5a422bc61b54a676234d17fd',
      title: 'Dummy Title',
      author: 'Dummy Author',
      url: 'http://blog.example.com/',
      likes: 13,
      __v: 0,
    }
    const result = listHelper.favoriteBlog(initialBlogs.concat(favoriteBlog))
    expect(result).toEqual(favoriteBlog)
  })

  test('is one of equally popular', () => {
    const favoriteBlogs = [
      {
        _id: '5a422bc61b54a676234d17fd',
        title: 'Dummy Title',
        author: 'Dummy Author',
        url: 'http://blog.example.com/post1.html',
        likes: 13,
        __v: 0,
      },
      {
        _id: '5a422bc61b54a676234d17fe',
        title: 'Dummy Title 2',
        author: 'Dummy Author',
        url: 'http://blog.example.com/post2.html',
        likes: 13,
        __v: 0,
      },
    ]
    const result = listHelper.favoriteBlog(initialBlogs.concat(favoriteBlogs))
    expect(favoriteBlogs).toContainEqual(result)
  })
})

describe('most initialBlogs', () => {
  test('is the only blog of the list', () => {
    const onlyBlog = initialBlogs[0]
    const result = listHelper.mostBlogs([onlyBlog])
    expect(result).toEqual({
      author: onlyBlog.author,
      blogs: 1,
    })
  })

  test('empty list returns undefined', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual(undefined)
  })

  test('is correct', () => {
    const result = listHelper.mostBlogs(initialBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})

describe('most likes', () => {
  test('is equal to likes of the only blog in the list', () => {
    const onlyBlog = initialBlogs[0]
    const result = listHelper.mostLikes([onlyBlog])
    expect(result).toEqual({
      author: onlyBlog.author,
      likes: onlyBlog.likes,
    })
  })

  test('empty list returns undefined', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual(undefined)
  })

  test('is correct', () => {
    const result = listHelper.mostLikes(initialBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
})
