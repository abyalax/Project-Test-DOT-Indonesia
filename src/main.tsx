import './index.css'
import { RouterProvider } from "react-router";
import ReactDOM from 'react-dom/client'
import router from './routes'
import { AuthProvider } from './context/auth';

const root = document.getElementById("root") as HTMLDivElement;

ReactDOM.createRoot(root).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
