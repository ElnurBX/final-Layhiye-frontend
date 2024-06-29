import React, { useContext } from 'react'
import ProfileUpload from '../../../components/ProfileUpload/ProfileUpload '
import MainContext from '../../../context/context'

const ClientDashboard = () => {
    const {UserData} = useContext(MainContext)
  return (
    <main>
        <ProfileUpload userId={UserData._id} />
    </main>
  )
}

export default ClientDashboard