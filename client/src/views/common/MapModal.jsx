import React, { useEffect, useState } from 'react'
import TrackingMap from '../maps/TrackingMap'

const MapModal = (open,setMapOpen) => {
    const [height,setHeight] = useState('h-[0px]')
  useEffect(()=>{
    if(open) setHeight('h-[70vh]')
    else setHeight('h-[0px]')
  },[])
  return (
    <div className={height + " max-h-[550px] rounded-2xl shadow-lg flex flex-wrap m-auto  my-4 mb-5 w-10/12 justify-center overflow-hidden relative"}>
        <TrackingMap/>
    </div>
  )
}

export default MapModal