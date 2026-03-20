import AppRoute from "./routes/AppRoute";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="container">
        <AppRoute />
      </div>
    </ThemeProvider>
  );
}

export default App;