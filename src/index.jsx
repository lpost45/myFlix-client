import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view.jsx";

import Container from "react-bootstrap/Container"

// Import statement to indicate that you need to bundle './index.scss'
import "./index.scss";

// Main component (will eventually use all the other)
const MyFlixApplicaton = () => {
    return (
        <Container>
            <MainView />
        </Container>
    );    
};

// Finds the root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplicaton />);