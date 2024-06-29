import React, { useContext } from 'react'
import MainContext from '../../../context/context'
import HotelCardV1 from '../../../components/Cards/HotelCardV1/HotelCardV1'

const WishlistPage = () => {
    const  {UserData} = useContext(MainContext)
    console.log(UserData);
    return (
        <main>
            <div className="container">
                <div className="row">
                    {
                        UserData ?
                        <>
                        {
                            UserData.Wishlists ?
                            <>
                                {
                                    UserData.Wishlists.map((item,index)=>{
                                        return(
                                            <div className="col-12 col-md-6 col-lg-4" key={index}>
                                                <HotelCardV1 Hotel={item}   />
                                            </div>
                                        )
                                    })
                                }
                            </>
                            :
                            <>
                                <h2>Your wishlist is empty</h2>
                            </>
                        }
                        </>
                        :
                        <>
                        <h2>Login to see your wishlist</h2>
                        </>
                    }
                </div>
            </div>
        </main>
    )
}

export default WishlistPage