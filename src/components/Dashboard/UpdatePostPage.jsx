import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost } from "../../services/api";
import "./styles/PostUpdate.scss";

const UpdatePostPage = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    // Fetch the post data when the component mounts
    const fetchPost = async () => {
      const response = await getPostById(id);
      setPost(response.data);
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePost(id, post); // Send the updated post data to the server
    navigate(`/posts/${id}`); // Redirect to the post detail page after updating
  };

  return (
    <div className="post-update">
      <h2>Update Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={post.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={post.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default UpdatePostPage;
