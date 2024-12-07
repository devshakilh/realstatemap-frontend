import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useEffect, useState } from "react";
import { getPosts, deletePost, updatePost } from "../../services/api";
import "./styles/PostTable.scss";

const PostTable = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await getPosts();
    setPosts(response.data);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (confirmed) {
      await deletePost(id);
      fetchPosts(); // Refresh the post list after deletion
    }
  };

  const handleUpdate = (id) => {
    // Navigate to the Update page with the post ID
    navigate(`/posts/${id}/edit`);
  };

  return (
    <div className="post-table">
      <h2>Post Management</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.price}</td>
              <td>
                <button onClick={() => handleUpdate(post.id)} className="btn update-btn">Update</button>
                <button onClick={() => handleDelete(post.id)} className="btn delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostTable;
