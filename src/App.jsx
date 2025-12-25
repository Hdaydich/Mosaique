import { Routes, Route } from "react-router-dom";
import { Home } from "./shared/pages/Home/Home";
import { ThemeLayout } from "./shared/pages/ThemeLayout/ThemeLayout";
import { Reading } from "./reading/pages/Reading/Reading";
import { Logic } from "./games/pages/Logic/Logic";
import { SpecificLearn } from "./games/pages/SpecificLearn/SpecificLearn";
import { Parent } from "./users/pages/Parent/Parent";
import { NotFound } from "./shared/pages/NotFound/NotFound";
import { Auth } from "./users/pages/Auth/Auth";
import { ScrollToTop } from "./shared/components/ScrollToTop/ScrollToTop";
import { StoryPage } from "./reading/pages/StoryPage/StoryPage";
import { Learning } from "./Learning/pages/Learning/Learning";

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
          <Route path="/Logic" element={<SpecificLearn />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
