import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Providers from "./pages/Providers";
import Clients from "./pages/Clients";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div id="App">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Navigate to="/providers" replace />} />
              <Route path="/error" element={<ErrorPage />} />
              <Route path="/providers" element={<Providers />} />
              <Route path="/clients" element={<Clients />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
