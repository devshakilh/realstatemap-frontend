import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import "./postEdit.scss";

function PostEdit() {
  const post = useLoaderData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: post.title,
    price: post.price,
    address: post.address,
    desc: post.postDetail.desc,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await apiRequest.put(`/posts/${post.id}`, formData);
      alert("Post updated successfully!");
      navigate(`/posts/${post.id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update post.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await apiRequest.delete(`/posts/${post.id}`);
        alert("Post deleted successfully!");
        navigate("/posts");
      } catch (err) {
        console.error(err);
        alert("Failed to delete post.");
      }
    }
  };

  return (
    <div className="postEdit">
      <h1>Edit Post</h1>
      <form>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
          ></textarea>
        </label>
      </form>
      <div className="buttons">
        <button onClick={handleUpdate}>Update Post</button>
        <button className="delete" onClick={handleDelete}>
          Delete Post
        </button>
      </div>
    </div>
  );
}

export default PostEdit;
