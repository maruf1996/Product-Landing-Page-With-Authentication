
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";
import routes from "./routes/routes";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster></Toaster>
    </AuthProvider>
  );
}

export default App;
