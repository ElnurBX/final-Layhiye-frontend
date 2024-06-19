
import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import MainContext from '../../../context/context'
import { Banner } from '../../../components/sections/Banner/Banner'
import SearchSections from '../../../components/sections/SearchSections/SearchSections'
import SpecialOffer from '../../../components/sections/SpecialOffer/SpecialOffer'
import Destinations from '../../../components/sections/Destinations/Destinations'
    
    const Home = () => {
        const {data,setdata} = useContext(MainContext)
        return (
        <>
                <Helmet>
                    <title>Home</title>
                </Helmet>
                <main>
                    <Banner/>
                    <SearchSections/>
                    <SpecialOffer/>
                    <Destinations/>
                </main>
        </>
        )
    }
    
    export default Home
        