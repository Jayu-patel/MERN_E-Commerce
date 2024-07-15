import { Outlet, ScrollRestoration } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import Navigation2 from "./pages/Auth/Navigation2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ScrollRestoration
            getKey={(location, matches) => {
            return location.pathname;
        }} 
      />
      <ToastContainer />
      <Navigation />
      <Navigation2 />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
};

export default App;
