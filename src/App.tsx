import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MainLayout from "./components/main-components/MainLayout";
import { ThemeProvider } from "./utils/theme-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BusinessName from "./form/BusinessName";
import FormTemplate from "./components/main-components/FormTemplate";

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
              <FormTemplate progress={10} title="Business Information">
                <BusinessName />
              </FormTemplate>
            }
          />
          {/* Add more routes for other form steps here */}
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
