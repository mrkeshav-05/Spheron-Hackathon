import { ThemeProvider } from "@/components/theme-provider"
import App2 from "./App2"
import Signup from "./Signup"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Signup />
    </ThemeProvider>
  )
}

export default App
