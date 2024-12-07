import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LogOut } from "lucide-react";

function ProfilePage() {
  const data = useLoaderData();
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const { myListings, myChats } = data;

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
        
          <div className="userInfoPage">
            <div className="title">
              <h1>User Information</h1>
              <Link to="/profile/update">
                <button className="updateBtn">Update Profile</button>
              </Link>
            </div>

            <div className="info">

              
              <div className="avatarContainer">
                <img
                  src={currentUser.avatar || "noavatar.jpg"}
                  alt="Avatar"
                  className="avatar"
                />
                <span className="detail">
                 <b className={`roleBadge ${currentUser.role.toLowerCase()}`}>
                    {currentUser.role}
                  </b>
                </span>
              </div>

              <div className="userDetails">
                <span className="detail">
                  Username: <b>{currentUser.username}</b>
                </span>
                <span className="detail">
                  E-mail: <b>{currentUser.email}</b>
                </span>
               
              </div>

              <button onClick={handleLogout} className="logoutBtn">
                <LogOut />
              </button>
            </div>
          </div>

          <div className="title">
            {(currentUser.role === "admin" || currentUser.role === "super admin") && (
              <h1>My List</h1>
            )}

            {(currentUser.role === "admin" || currentUser.role === "super admin") && (
              <Link to="/add-new">
                <button className="createBtn">Create New Post</button>
              </Link>
            )}
          </div>

          {/* User Posts List */}
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) =>
                postResponse?.data?.userPosts?.length > 0 ? (
                  <List posts={postResponse.data.userPosts} />
                ) : (
                  <p className="found-p">No posts found.</p>
                )
              }
            </Await>
          </Suspense>

          {/* Saved Posts List */}
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) =>
                postResponse?.data?.savedPosts?.length > 0 ? (
                  <List posts={postResponse.data.savedPosts} />
                ) : (
                  <p className="found-p">No saved posts.</p>
                )
              }
            </Await>
          </Suspense>
        </div>
      </div>

      {/* My Listings and Chats */}
      <div className="chatContainer">
        <div className="wrapper">
          {myListings && (
            <div className="myListings">
              <h2>My Listings</h2>
              <List data={myListings} />
            </div>
          )}
          {myChats && (
            <div className="myChats">
              <h2>My Chats</h2>
              {myChats.map((chat) => (
                <Chat key={chat.id} chat={chat} />
              ))}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}

export default ProfilePage;
