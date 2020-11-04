import React from 'react'
import { Redirect } from 'react-router-dom'
import Header from '../layout/Header'
import Footer from '../layout/Footer'

const PublicRoute = props => {
  if (props.isAuthenticated) return <Redirect to="/home" />;
  return (
    <>
      <Header {...props} />
      <div className='public-content'>{props.children}</div>
      <Footer />
    </>
  )
}

export default PublicRoute
