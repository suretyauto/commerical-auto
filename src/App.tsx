import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MainLayout from "./components/main-components/MainLayout";
import { ThemeProvider } from "./utils/theme-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BusinessName from "./form/BusinessName";
import FormTemplate from "./components/main-components/FormTemplate";
import BusinessAddress from "./form/BusinessAddress";
import YearStarted from "./form/YearStarted";
import EINNumber from "./form/EIN";
import PersonalDetails from "./form/PersonalDetails";
import SorryPage from "./pages/Sorry";
import ThankYouPage from "./pages/ThankYou";

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        stacked={true}
        closeOnClick={true}
        theme="colored"
      />

      <ThemeProvider>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <LandingPage />
              </MainLayout>
            }
          />
          <Route
            path="/business-name"
            element={
              <FormTemplate progress={20} title="Business Information">
                <BusinessName />
              </FormTemplate>
            }
          />

          <Route
            path="/address"
            element={
              <FormTemplate progress={40} title="Business Address">
                <BusinessAddress />
              </FormTemplate>
            }
          />
          <Route
            path="/year-started"
            element={
              <FormTemplate progress={60} title="Year Started">
                <YearStarted />
              </FormTemplate>
            }
          />
          <Route
            path="/ein"
            element={
              <FormTemplate progress={80} title="EIN Number">
                <EINNumber />
              </FormTemplate>
            }
          />

          <Route
            path="/personal-details"
            element={
              <FormTemplate progress={99} title="More About You">
                <PersonalDetails />
              </FormTemplate>
            }
          />

          <Route
            path="/sorry"
            element={
              <MainLayout>
                <SorryPage />
              </MainLayout>
            }
          />

          <Route
            path="/thank-you"
            element={
              <MainLayout>
                <ThankYouPage />
              </MainLayout>
            }
          />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
