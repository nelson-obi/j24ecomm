import React from "react";

function About() {
  return (
    <div className="bg-[#ccc2]">
      <div className="container-box mb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center justify-center">
          <div>
            <img src="/img/adidas_2.jpg" className="w-full p-5" alt="" />
          </div>
          <div>
            <div className="space-y-4 p-5">
            <h3 className="uppercase font-serif downborder">Welcome to j24 Stores</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut
                assumenda doloremque dolorem. Aut consequuntur nulla doloribus,
                quae aperiam magni sint.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut
                assumenda doloremque dolorem. Aut consequuntur nulla doloribus,
                quae aperiam magni sint.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut
                assumenda doloremque dolorem. Aut consequuntur nulla doloribus,
                quae aperiam magni sint.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
