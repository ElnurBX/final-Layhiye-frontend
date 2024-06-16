import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ROUTES from "./Routes/routes";
import MainContext from "./context/context";
import { useState } from "react";
import './assets/scss/base/reset.scss';

function App() {
    const [currency, setCurrency] = useState(localStorage.getItem("currency") ||{ currency: "USD", symbol: "$", coefficient: 1 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    const router = createBrowserRouter(ROUTES);

    return (
        <MainContext.Provider value={{ data, setData, loading, setLoading, error, setError, currency, setCurrency }}>
            <RouterProvider router={router} />
        </MainContext.Provider>
    );
}

export default App;
