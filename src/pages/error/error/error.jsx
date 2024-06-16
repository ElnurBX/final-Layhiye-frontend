
    import React, { useContext } from 'react'
    import { Helmet } from 'react-helmet'
    import MainContext from '../../../context/context'
    
    const Error = () => {
        const {data,setdata} = useContext(MainContext)
        return (
        <>
                <Helmet>
                    <title>Error</title>
                </Helmet>
                <div>Error page
                </div>
        </>
        )
    }
    
    export default Error
        