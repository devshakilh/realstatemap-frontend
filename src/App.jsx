import HomePage from "./routes/homePage/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import { Layout, RequireAuth } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";
import ErrorElement from "./components/ErrorElement/ErrorElement";
import Chat from "./components/chat/Chat";
import Contact from "./components/Contact/Contact";
import PostEdit from "./components/PostEdit/PostEdit";
import AdminDashboard from "./routes/dashboard/dashboard";
import UpdatePostPage from "./routes/dashboard/post";

function App() {
  
  const router = createBrowserRouter([
    
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorElement />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },
        {
          path:"/posts/:id/edit",
           element: <PostEdit />,
        },
        {
          path: "/posts/:id/edit",
          element: <UpdatePostPage />, // Component for updating a post
        },
        
        {
        path:"/chat/:sellerId",
          element: <Chat />,
          loader: singlePageLoader,
        },

        {
          path: "/login",
          element: <Login />,
        },
       
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/dashboard/profile",
          element: <ProfilePage />,
          loader: profilePageLoader
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
       
        {
          path: "/add-new",
          element: <NewPostPage />,
        },
        {
          path: "/dashboard",
          element: <AdminDashboard />,
        },
        
        
        
       
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
