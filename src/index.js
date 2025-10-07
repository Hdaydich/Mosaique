import ReactDOM from "react-dom/client";
import App from './App';
import { Logic } from './pages/Logic/Logic';
import { Parent } from './pages/Parent/Parent';
import { Reading } from './pages/Reading/Reading';
import { SpecificLearn } from './pages/SpecificLearn/SpecificLearn';
import { NotFound } from './pages/NotFound/NotFound';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import "./index.css";
import { ShapeGame } from "./pages/ShapeGame/ShapeGame";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/Logic" element={<Logic />}>
          </Route>
          <Route path="/Parent" element={<Parent />} />
          <Route path="/Reading" element={<Reading />} />
          <Route path="/SpecificLearn" element={<SpecificLearn />} >
          </Route>
          
             <Route path="ShapeGame" element={<ShapeGame />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
