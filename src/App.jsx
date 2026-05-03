import { RouterProvider } from "react-router-dom"
import { myRoutes } from "./routes/Router"

// ==================== APP ROOT ====================
// Provides the application route tree to React Router.
// ==================================================

const App = () => {
  return <RouterProvider router={myRoutes} />
}

export default App;
