import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ROUTES from "./Routes/routes";
import MainContext from "./context/context";
import { useEffect, useState } from "react";
import './assets/scss/base/reset.scss';
import Cookies from 'js-cookie'; 
import axios from "axios";
import { jwtDecode } from "jwt-decode";
function App() {
    const [currency, setCurrency] = useState(localStorage.getItem("currency") ||{ currency: "USD", symbol: "$", coefficient: 1 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    const [authToken, setAuthToken] = useState(Cookies.get('auth_token') );
    const router = createBrowserRouter(ROUTES);
    const [UserData, setUserData] = useState({});
    useEffect(() => {
        console.log(authToken);
        if(!authToken){
            return
        }

        const ID = jwtDecode(authToken)

        axios.get(`http://localhost:8080/api/users/${ID.userId}`).then((res) => {
            setUserData(res.data)
        }
        
        ).catch((err) => {
            console.log(err)
        })
    },[authToken])

    return (
        <MainContext.Provider value={{ data, setData, loading, setLoading, error, setError, currency, setCurrency ,authToken, setAuthToken,UserData, setUserData}}>
            <RouterProvider router={router} />
        </MainContext.Provider>
    );
}

export default App;
