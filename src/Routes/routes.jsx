
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
            ,
            {
                path:"/test",
                element:<Test/>
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
                element:<Dashboard/>
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