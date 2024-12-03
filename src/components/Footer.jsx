import React from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';
// npm i react-icons react-router-dom
function Footer() {
  return (
    <div className='bg-purple-500 p-3'>
        <div className="grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-2">
            <div className='p-3'>
                <h4  className='text-white'>J24 Stores</h4>
                <p>... shop with us</p>
            </div>
            <div className='p-3'>
                <h4  className='text-white'>Quick Links</h4>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="">About</Link></li>
                    <li><Link to="/products">Product</Link></li>
                    <li><Link to="">Contact</Link></li>
                    <li><Link to="">FAQ</Link></li>
                </ul>
            </div>
            <div className='p-3'>
                <h4 className='text-white'>Social Handles</h4>
                <ul className='flex flex-wrap justify-start items-center gap-3'>
                    <li><Link to=""><FaWhatsapp /> </Link></li>
                    <li><Link to=""><FaFacebookF /> </Link></li>
                    <li><Link to=""><FaTwitter /> </Link></li>
                    <li><Link to=""><FaInstagram /> </Link></li>
                </ul>
            </div>
        </div>
        <div className='p-3 border-t-2 border-black text-center capitalize'>
            Team J24 | &copy; 2024 | All rights reserved
        </div>
    </div>
  )
}

export default Footer
