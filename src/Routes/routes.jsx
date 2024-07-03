
import AdminRoot from "../pages/admin/AdminRoot"
import Dashboard from "../pages/admin/dashboard/dashboard"
import Add from "../pages/admin/add/add"
import Error from "../pages/error/error/error"
import SiteRoot from "../pages/site/SiteRoot"
import Home from "../pages/site/home/home"
import ClientRoot from "../pages/client/ClientRoot"
import ClientDashboard from "../pages/client/dashboard/Dashboard"
import Test from "../pages/site/test/Test"
import AboutPage from "../pages/site/AboutPage/AboutPage"
import ContactPage from "../pages/site/ContactPage/ContactPage"
import LocalExpert from "../pages/site/LocalExpert/LocalExpert"
import Register from "../pages/site/Register/Register"
import WishlistPage from "../pages/client/WishlistPage/WishlistPage"
import VerifyPage from "../pages/site/VerifyPage/VerifyPage"
import CityDetailsPage from "../pages/site/detailsPages/City/CityDetailsPage"
import HotelDetailsPage from "../pages/site/detailsPages/Hotel/HotelDetailsPage"
import RoomDetailsPage from "../pages/site/detailsPages/Room/RoomDetailsPage"
import Search from "../pages/site/Search/Search"
import Checkout from "../pages/site/Checkout/Checkout"
import History from "../pages/client/History/History"

const ROUTES =[
    {
        path:"/",
        element:<SiteRoot/>,
        children:[
            {
                path:"",
                element:<Home/>
            },{
                path:"about",
                element:<AboutPage/>
            },
            {
                path:"contact",
                element:<ContactPage/>
            }
            ,{
                path:"/localexpert",
                element:<LocalExpert/>
            },{
                path:"/Register",
                element:<Register/>
            }
            ,
            {
                path:"/test",
                element:<Test/>
            },
            {
                path:"/details/city/:id",
                element:<CityDetailsPage/>
            },{
                path:"/details/hotel/:id",
                element: <HotelDetailsPage/>
            }
            ,
            {
                path:"/VerifyPage/:token",
                element:<VerifyPage/>
            },
            {
                path:"/details/hotel/:hotelId/room/:roomId",
                element:<RoomDetailsPage/>
            }
            ,
            {
                path:"/search",
                element:<Search/>
            },
            {
                path:"/search/:country",
                element:<Search/>
            },
            {
                path:"/Checkout",
                element:<Checkout/>
            }
        ]
    },{
        path:"/client",
        element: <ClientRoot/>,
        children:[
            {
                path:"dashboard",
                element:<ClientDashboard/>
            },
            {
                path:"orderHistory",
                element:<History/>
            },
            {
                path:"wishlist"
                ,element:<WishlistPage/>
            }
        ]
    },
    {
        path:"/admin",
        element: <AdminRoot/>,
        children:[
            {
                path:"",
                element:<Dashboard/>
            },
            {
                path:"add",
                element:<Add/>
            }
        ]
    }
    ,    {
        path:"*",
        element:<Error/>,
        
    },
]
export default ROUTES;