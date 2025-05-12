import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { App } from "./App";
import { ProjectForm } from "./components/Project/ProjectForm.tsx";
import { ProjectList } from "./components/Project/ProjectList.tsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { TaskList } from "./components/Tasks/TaskList.tsx";

const router = createHashRouter(
  [
    {
      path: "/",
      element: (
        <Provider store={store}>
          <App />
        </Provider>
      ),
    },
    { path: "/new", 
      element: <ProjectForm /> 
    },
    {
      path: "/projects/",
      element: <ProjectList />,
    },
    {
      path: "/projects/:id",
      element: <TaskList />,
    },
  ],

  // { basename: "/todo-list" }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
