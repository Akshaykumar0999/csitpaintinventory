import React, {useContext} from 'react';
import Header from '../Header'
import './index.css'
import { NavMenuContext } from '../../Context/navMenuContext';
import Navbar from '../Navbar';

const Dashboard = () => {
    const data = useContext(NavMenuContext)
    return (
      <div className="main-container-card">
        {data.openNav && <Navbar />}
        <div
          className="headers-section-main-card"
          style={{
            background: data.theme && "#212631",
            color: data.theme && "#fff",
          }}
        >
          <Header />
          <main className="content-main-container">
            <div
              className="dashboard-header-card-container"
              style={{
                background: data.theme && "#6b7785",
                color: data.theme && "#fff",
              }}
            >
              <p style={{ marginBottom: "0px" }}>Home / Dashboard</p>
            </div>
            <div className='mt-5'>Dashboard is Comming Soon</div>
          </main>
        </div>
      </div>
    );
}

export default Dashboard