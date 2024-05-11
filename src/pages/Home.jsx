import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <h1>Automatcher</h1>
      <Link to='/recommended'>View Recommended Scholarships</Link>
    </div>
  )
}

export default Home