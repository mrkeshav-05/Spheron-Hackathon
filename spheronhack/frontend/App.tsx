import { ThemeProvider } from "@/components/theme-provider"
import App2 from "./App2"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App2 />
    </ThemeProvider>
  )
}

export default App
