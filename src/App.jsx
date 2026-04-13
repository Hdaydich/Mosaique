import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { ThemeLayout } from "./pages/ThemeLayout/ThemeLayout";
import { Reading } from "./features/reading/pages/Reading/Reading";
import { Logic } from "./features/games/pages/Logic/Logic";
import { Parent } from "./features/users/pages/Parent/Parent";
import { NotFound } from "./pages/NotFound/NotFound";
import { Auth } from "./features/users/pages/Auth/Auth";
import { ScrollToTop } from "./shared/components/ScrollToTop/ScrollToTop";
import { StoryPage } from "./features/reading/pages/StoryPage/StoryPage";
import { Learning } from "./features/learning/pages/Learning/Learning";
import { LearnChoice } from "./features/learning/components/LearnChoice/LearnChoice";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<ThemeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Authentification" element={<Auth />} />
          <Route path="/Parent" element={<Parent />} />
          <Route path="/Reading" element={<Reading />} />
          <Route path="/story/:source/:id" element={<StoryPage />} />
          <Route path="/SpecificLearn" element={<Learning />} />
          <Route path="/learn/:type" element={<LearnChoice />} />
          <Route path="/Logic" element={<Logic />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
