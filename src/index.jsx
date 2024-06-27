import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view.jsx";

import "bootstrap/dist/css/bootstrap.min.css";

// Import statement to indicate that you need to bundle './index.scss'
import "./index.scss";

// Main component (will eventually use all the other)
const MyFlixApplicaton = () => {
    return <MainView />;
};

// Finds the root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplicaton />);