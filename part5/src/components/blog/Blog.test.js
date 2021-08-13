import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    id: 'id',
    user: 'user',
    likes: 13,
    author: 'author',
    title: 'title',
    url: 'url',
  }

  beforeEach(() => {
    component = render(<Blog blog={blog} />)
  })

  test('renders only title and author', () => {
    expect(component.container).toHaveTextContent('title')

    expect(component.container).toHaveTextContent('author')

    expect(component.container).not.toHaveTextContent('url')

    expect(component.container).not.toHaveTextContent('13')
  })
})
