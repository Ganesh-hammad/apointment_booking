import React from 'react'
import Headers from '../components/Header.jsx'
import SpecialityMenu from '../components/SpecialityMenu.jsx'
import TopDoctors from './TopDoctors.jsx'
import Banner from '../components/Banner.jsx'
const Home = () => {
  return (
    <div>
      <Headers/>
      <SpecialityMenu/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Home