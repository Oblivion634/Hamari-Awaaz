import { RouterProvider } from "react-router-dom";
import { myRoutes } from "./routes/Router";
import ChatBot from "./components/ChatBot";
import { Toaster } from "react-hot-toast";


// ==================== APP ROOT ====================
// Provides routes + global chatbot.
// ==================================================

const App = () => {
  return (
    <>
      <RouterProvider router={myRoutes} />
      <Toaster position="top-right" />

      {/* Global AI Assistant */}
      <ChatBot />
    </>
  );
};

export default App;