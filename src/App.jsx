import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ROUTES from "./Routes/routes";
import MainContext from "./context/context";
import { useEffect, useState } from "react";
import './assets/scss/base/reset.scss';
import Cookies from 'js-cookie'; 
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function App() {
    const [currency, setCurrency] = useState({ name: "USD", value: "$", coefficient: 1 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    const [authToken, setAuthToken] = useState(Cookies.get('auth_token') );
    const router = createBrowserRouter(ROUTES);
    const [UserData, setUserData] = useState({});
    const [Citys, setCitys] = useState([]);
    const [authDropdown, setAuthDropdown] = useState(false)
    useEffect(() => {
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
    const AddWishList = (item) => {
        if (!authToken) {
            alert('Please login first');
            return;
        }
    
        if (!UserData.Wishlists) {
            UserData.Wishlists = [];
        }
    
        const isItemInWishlists = UserData.Wishlists.some(WishlistsItem => WishlistsItem._id === item._id);
    
        if (isItemInWishlists) {
            const updatedWishlists = UserData.Wishlists.filter(WishlistsItem => WishlistsItem._id !== item._id);
            axios.put(`http://localhost:8080/api/users/${UserData._id}`, { Wishlists: updatedWishlists })
                .then((res) => {
                    setUserData(prevState => ({ ...prevState, Wishlists: updatedWishlists }));
                    alert('Removed from Wishlists');
                })
                .catch((err) => {
                    console.error('Error updating Wishlists:', err);
                });
        } else {
            const updatedWishlists = [...UserData.Wishlists, item];
            axios.put(`http://localhost:8080/api/users/${UserData._id}`, { Wishlists: updatedWishlists })
                .then((res) => {
                    setUserData(prevState => ({ ...prevState, Wishlists: updatedWishlists }));
                    alert('Added to Wishlists');
                })
                .catch((err) => {
                    console.error('Error updating Wishlists:', err);
                });
        }
    };
    const isItemInWishList = (id) => {
        if (!UserData.Wishlists) {
            return false;
        }
        return UserData.Wishlists.some(wishlistItem => wishlistItem._id === id);
    };
    
    
    const PriceRefund=(price)=>{
        return [(parseFloat(price)*parseFloat(currency.coefficient)).toFixed(2),currency.value]
    }
    return (
        <MainContext.Provider value={{ data, setData, loading, setLoading, error, setError, currency, setCurrency ,authToken, setAuthToken,UserData, setUserData,Citys, setCitys,PriceRefund,authDropdown, setAuthDropdown,AddWishList,isItemInWishList}}>
            <RouterProvider router={router} />
        </MainContext.Provider>
    );
}

export default App;
