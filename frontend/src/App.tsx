import './App.css'
import Header from "./components/Header.tsx";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes/router.tsx"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';

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

// ReactDOM.render(
//   <React.StrictMode>
//     <IntlProvider locale="en">
//       <App />
//     </IntlProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

export default App
