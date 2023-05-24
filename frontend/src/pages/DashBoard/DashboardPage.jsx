import React from 'react'
import {Link} from "react-router-dom"
const DashboardPage = () => {
  return (
    <div>
    DashboardPage
    <h1> <Link to="/devices"> Goto Devices Page here</Link></h1>
    </div>
  )
}

export default DashboardPage;