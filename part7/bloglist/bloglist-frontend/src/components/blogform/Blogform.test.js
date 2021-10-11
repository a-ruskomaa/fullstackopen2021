import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blogform from './Blogform'

describe('<Blogform />', () => {
  let component
  let addNewBlog

  beforeEach(() => {
    addNewBlog = jest.fn()
    component = render(<Blogform addNewBlog={addNewBlog} />)
  })

  test('addNewBlog gets called with correct content', () => {
    const form = component.container.querySelector('form')
    const titleInput = component.container.querySelector('#input-title')
    const authorInput = component.container.querySelector('#input-author')
    const urlInput = component.container.querySelector('#input-url')

    fireEvent.change(titleInput, {
      target: { value: 'test title' },
    })

    fireEvent.change(authorInput, {
      target: { value: 'test author' },
    })

    fireEvent.change(urlInput, {
      target: { value: 'test url' },
    })

    fireEvent.submit(form)

    expect(addNewBlog.mock.calls).toHaveLength(1)
    expect(addNewBlog.mock.calls[0][0].title).toBe('test title')
    expect(addNewBlog.mock.calls[0][0].author).toBe('test author')
    expect(addNewBlog.mock.calls[0][0].url).toBe('test url')
  })
})
