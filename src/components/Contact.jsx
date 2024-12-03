import React from "react";

function Contact() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-2 mt-12 mb-12">
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126846.01254938768!2d3.28095517273054!3d6.529528727589355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9228fa2a3999%3A0xd7a8324bddbba1f0!2sIkeja%2C%20Lagos!5e0!3m2!1sen!2sng!4v1730104812119!5m2!1sen!2sng"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div>
            <div className="cform">
              <form action="">
                <div className="mb-2">
                  <label htmlFor="">Full Name</label>
                  <input type="text" className="w-full outline-none" name="" id="" />
                </div>
                <div className="mb-2">
                  <label htmlFor="">Subject</label>
                  <input type="text" className="w-full outline-none" name="" id="" />
                </div>
                <div className="mb-2">
                  <label htmlFor="">Email Address</label>
                  <input type="email" className="w-full outline-none" name="" id="" />
                </div>

                <div className="mb-2">
                    <label htmlFor="">Message</label>
                    <textarea name="" className="w-full outline-none" id="" cols="30" rows="10"></textarea>
                </div>

                <div>
                  <button type="submit" className="w-full p-2 bg-purple-300">Send</button>
                </div>
              </form>
            </div>
      </div>
    </div>
  );
}

export default Contact;
