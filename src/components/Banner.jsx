import React from 'react';

function Banner() {
  return (
    <div className="container-box">
        <div className="banner grid grid-cols-1 items-center uppercase gap-3 md:grid-cols-2 bg-purple-100">
            <div className="banner-img">
                <img src="/img/adidas_1.jpg" className="w-full" alt="" />
            </div>
            <div className="banner-text space-y-3 font-serif block">
                  <h2>welcome to J24 stores</h2>
                  <h2>Get your designer shoes here!.. </h2>
            </div>
        </div>
    </div>
  )
}

export default Banner;

