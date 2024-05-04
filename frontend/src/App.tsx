import './App.css'
import Header from "./components/Header.tsx";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes/router.tsx"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

function App() {
    const queryClient = new QueryClient();
  return (
    <>
        <QueryClientProvider client={queryClient}>
            <Header></Header>
            <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
    </>
  )
}

export default App
