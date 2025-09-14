import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
   <>
    <div className='text-black px-12 py-16 max-w-[1900px] grid grid-cols-1 md:grid-cols-4 text-md'>
      <div>
        <h3 className='font-semibold mb-4'>SHOP</h3>
        <ul className='space-y-2'>
          <li><Link to="/women">WOMEN</Link></li>
          <li><Link to="/men">MEN</Link></li>
          <li><Link to="/kid">KIDS</Link></li>
        </ul>
      </div>

      <div>
        <h3 className='font-semibold mb-4'>CORPORATE INFO</h3>
        <ul className='uppercase cursor-pointer space-y-2'>
          <li>About Cartify group</li>
          <li>delivery information</li>
          <li>terms & conditions of sale</li>
          <li>website terms & condition</li>
          <li>privacy policy</li>
          <li>returns & refunds</li>
          <li>sustainability</li>
        </ul>
      </div>

      <div>
        <h3 className='uppercase font-semibold mb-4'>help</h3>
        <ul className='uppercase space-y-2 cursor-pointer'>
          <li>help center</li>
          <li>connect via whatsapp</li>
          <li>sitemap</li>
          <li>store locator</li>
          <li>buy now,pay later</li>
          <li>membership</li>
          <li>giftcards</li>
        </ul>
      </div>

      <div>
        <p>Become a member today and get exclusive benifits!</p>
        <div>
          <input type='email' placeholder='Enter your email address' className='border border-[#e4e4e4] outline-none px-4 py-3 text-md flex-grow'/>
          <button className='bg-black text-white py-3 px-4 text-lg font-bold cursor-pointer'>SIGN UP</button>
        </div>
      </div>
    </div>

<div className='px-12 my-10'>
<span className='uppercase underline text-2xl cursor-pointer hover:text-gray-400'>customer service</span>
<p className='text-lg font-medium'>We are open Saturday to Thursday 9 am to 10 pm & Friday 1 pm to 10 pm (GMT+4).</p>
</div>
   </>
  
  )
}

export default Footer
