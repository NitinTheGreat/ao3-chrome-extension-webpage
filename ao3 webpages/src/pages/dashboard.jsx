import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
const dashboard = () => {
  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: '50px' }}>
        {/* Your main content goes here */}
      </div>
      <span>
        <h1>Dashboard</h1>
        <h1>Hello</h1>
      </span>
    </div>
  )
}

export default dashboard
