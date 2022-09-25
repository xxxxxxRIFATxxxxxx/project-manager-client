import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./features/auth/Auth";
import useAuthCheck from "./features/auth/useAuthCheck";
import Projects from "./features/projects/Projects";
import PrivateRoute from "./features/router/PrivateRoute";
import PublicRoute from "./features/router/PublicRoute";
import Teams from "./features/teams/Teams";

export default function App() {
    const authChecked = useAuthCheck();

    // decide what to render
    let content;

    if (!authChecked) {
      content = <div>Checking authentication....</div>
    } 
    
    else {
      content = (
        <DndProvider backend={HTML5Backend}>
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

              <Route
                path="/teams"
                element={
                  <PrivateRoute>
                    <Teams />
                  </PrivateRoute>
                }
              />

              <Route
                path="/projects"
                element={
                  <PrivateRoute>
                    <Projects />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        </DndProvider>
      );
    };

    return content;
};

