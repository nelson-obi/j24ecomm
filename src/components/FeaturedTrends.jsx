import React from 'react'
import Trending from './Trending'
import Featured from './Featured'

function FeaturedTrends() {
  return (
    <div className="container-box">
        <div className="grid grid-cols-2 items-center justify-between gap-3">
            <div>
                <Trending />
            </div>
            <div>
                <Featured />
            </div>
        </div>
      
    </div>
  )
}

export default FeaturedTrends;
