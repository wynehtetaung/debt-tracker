import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ItemList from "./pages/ItemList";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/list",
    element: <ItemList />,
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
