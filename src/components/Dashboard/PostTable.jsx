import  { useEffect, useState } from "react";
import { getPosts, deletePost, updatePost } from "../../services/api";

import "./styles/PostTable.scss";

const PostTable = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await getPosts();
    setPosts(response.data);
  };

  const handleDelete = async (id) => {
    await deletePost(id);
    fetchPosts();
  };

  const handleUpdate = async (id) => {
    const updatedData = { title: "Updated Title" }; // Example data
    await updatePost(id, updatedData);
    fetchPosts();
  };

  return (
    <div className="post-table">
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
                <button onClick={() => handleUpdate(post.id)}>Update</button>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostTable;
