
import React from 'react'
import { Helmet } from 'react-helmet'

import { Banner } from '../../../components/sections/Banner/Banner'
import SearchSections from '../../../components/sections/SearchSections/SearchSections'
import SpecialOffer from '../../../components/sections/SpecialOffer/SpecialOffer'
import Destinations from '../../../components/sections/Destinations/Destinations'
import PlanYourNextStaycation from '../../../components/sections/PlanYourNextStaycation/PlanYourNextStaycation'
import Recommended from '../../../components/sections/Recommended/Recommended'
import Subscribe from '../../../components/sections/Subscribe/Subscribe'
    
    const Home = () => {

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
                    <PlanYourNextStaycation/>
                    <Recommended/>
                    <Subscribe/>
                </main>
        </>
        )
    }
    
    export default Home
        