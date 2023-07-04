import React from 'react'
import { useClicksStore } from "../store/store"

const Stats = () => {
  const clicks = useClicksStore((state) => state.clicks)
  return (
    <div className='stats'>Clicks: {clicks}</div>
  )
}

export default Stats