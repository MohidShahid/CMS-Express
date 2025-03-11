import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Signup from "./Components/Signup.jsx";
import Login from "./Components/Login.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Front from "./Components/Front.jsx";
import AuthLayout from "./Components/AuthLayout.jsx";
import store from "./store/store.js";
import Post from "./Components/Post.jsx";
import { Provider } from "react-redux";
import UserPosts from "./pages/UserPosts.jsx";
import PostEditor from "./pages/PostEditor.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path  : "/",
        element : <Home />,
        children : [
          {
            path : "/",
            element : (<AuthLayout authentication={false}>
              <Front/>
            </AuthLayout>)
          },
          {
            path : "/post/:id",
            element : (<AuthLayout authentication={true}>
              <Post />
            </AuthLayout>)
          },
          {
            path : "/user-posts",
            element : (<AuthLayout authentication={true}>
              <UserPosts />
            </AuthLayout>)
          },
          {
            path : "/edit-post/:id",
            element : (<AuthLayout authentication={true}>
              <PostEditor />
            </AuthLayout>)
          }
        ]
      },
      {
        path: "/register",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path : "/dashboard",
        element : <Dashboard />
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider >
);
