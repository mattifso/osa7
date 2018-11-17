import React from 'react'

const getLink = (blog) => '/blogs/' + blog._id

const Blog = ({ blog }) => (
  <div>
    <a href={getLink(blog)}>{blog.title} {blog.author}</a>
  </div>
)

export default Blog