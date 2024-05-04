import './App.css'
import Header from "./components/Header.tsx";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes/router.tsx"

function App() {
  return (
    <>
        <Header></Header>
        <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
