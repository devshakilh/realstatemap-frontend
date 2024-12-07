import { Link, useNavigate } from "react-router-dom";
import "./card.scss";

function Card({ item, isLoading }) {
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate(`/chat/${item?.sellerId}`, {
      state: { sellerName: item?.sellerName, postTitle: item?.title },
    });
  };

  if (isLoading) {
    // Skeleton Loader
    return (
      <div className="card skeleton">
        <div className="imageContainer skeleton-image"></div>
        <div className="textContainer">
          <div className="skeleton-title"></div>
          <div className="skeleton-location"></div>
          <div className="skeleton-detail"></div>
          <div className="skeleton-price"></div>
          <div className="bottom">
            <div className="features">
              <div className="feature skeleton-detail"></div>
              <div className="feature skeleton-detail"></div>
            </div>
            <div className="icons">
              <div className="icon skeleton-image"></div>
              <div className="icon skeleton-image"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="card">
        <p className="notFound">Not Found</p>
      </div>
    );
  }

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt={item.title} />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="" />
            </div>
            <div className="icon" onClick={handleChatClick}>
              <img src="/chat.png" alt="Chat" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
