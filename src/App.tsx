import ContextProvider from "./context/Context"
import Swiper from "./components/Swiper"

function App() {
  return (
    <ContextProvider>
       <Swiper />
    </ContextProvider>
  )
}

export default App

