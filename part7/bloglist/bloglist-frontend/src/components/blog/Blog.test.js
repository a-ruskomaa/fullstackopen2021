import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let mockLikeHandler

  const blog = {
    id: 'id',
    user: { name: 'user' },
    likes: 13,
    author: 'author',
    title: 'title',
    url: 'url',
  }

  beforeEach(() => {
    mockLikeHandler = jest.fn()
    component = render(<Blog blog={blog} addLike={mockLikeHandler} />)
  })

  test('renders only title and author', () => {
    expect(component.container).toHaveTextContent('title')

    expect(component.container).toHaveTextContent('author')

    expect(component.container).not.toHaveTextContent('url')

    expect(component.container).not.toHaveTextContent('13')
  })

  test('renders url and likes after button click', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('url')

    expect(component.container).toHaveTextContent('13')
  })

  test('addLike gets called after button click', () => {
    fireEvent.click(component.getByText('show'))

    const likeButton = component.getByText('like')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})
