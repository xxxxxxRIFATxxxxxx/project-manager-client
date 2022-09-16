import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./features/auth/Auth";
import useAuthCheck from "./features/auth/useAuthCheck";
import PublicRoute from "./features/router/PublicRoute";

export default function App() {
    const authChecked = useAuthCheck();

    // decide what to render
    let content;

    if (!authChecked) {
      content = <div>Checking authentication....</div>
    } 
    
    else {
      content = (
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Auth />
                </PublicRoute>
              }
            />
          </Routes>
        </Router>
      );
    };

    return content;
};

