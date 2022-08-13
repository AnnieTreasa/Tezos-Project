import { Link } from 'react-router-dom';

const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list">
      {blogs.map(blog => (
        <div className="blog-preview" key={blog.id} >
          <Link to={`/blogs/${blog.id}`}>
            <h2>UUID : {blog.uuid}</h2>
            <p>EmailID : {blog.email}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BlogList;