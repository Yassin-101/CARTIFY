import React, { useEffect, useState } from 'react'

const Text = ({category}) => {
  const [fullText,setFulText] = useState(false)

  useEffect(()=>{
    setFulText(false)
  },[category])

  return (
    <div>
      {category === "women"
      ?
      <div className='pt-10 px-7'>
        <p className='font-semibold text-2xl py-5'>Shop Women Clothing At Cartify</p>
        <p className='text-xl pb-10'>As one of the world's leading shopping destinations, Cartify has everything any fashion-forward women needs in her closet. At Cartify shop the latest women's clothing and fashion products, ranging from shoes and accessories, gym wear, be
          {!fullText && "..."}
          {fullText && (
            <>
             auty, and more. Refresh your wardrobe with exclusive pieces from our clothing collection. Shop casual women's wear and grab your next go-to fashion staples like basic tees, your next favorite pair of jeans, and enhance your makeup and skincare routines with some beauty essentials.
    <p className='text-xl py-5'>With thousands of styles to choose from, shopping at Cartify couldn't be easier. Whether you are looking to make a fashion statement with the latest contemporary pieces, looking for loungewear for a cozy night in, or working up a sweat at the gym, Cartify's edit includes the key pieces you need in your wardrobe. With our assortment of minimalistic pieces and exclusive collections, which includes everything from chic, flowy spring must-haves to consciously curated chic silhouettes, you are certain to find everything you desire. Check out Conscious collection for extravagant yet sustainable garments. Cartify offers women's fashion in a more sustainable way.</p>
   <h5 className='font-bold text-3xl py-3'>A Tailor-Made Shopping Experience</h5>
   <p className='text-xl py-5'>To make your shopping experience a breeze, our various categories allow you to shop by offers, product, edits, and concept, depending on the event or look you are going for. For more refined, classic pieces, why not browse our Modern Classic and Trend line.</p>
    <p className='text-xl pb-5'>Shop our versatile Cartify+ Plus size range of women's clothing and get your wardrobe ready. We have a diverse collection of plus-size basics, trousers, dresses, and sportswear. Browse our latest on-trend plus size dresses ranging from shirt dresses, wrap dresses, and LBD's and discover your next outfit.</p>
   <p className='text-xl pb-5'>Love a good deal? If so, Cartify has you covered. Shop our offers category and discover hundreds of affordable styles on sale! Whether you need a new outfit, or wardrobe revamp you won't feel guilty after getting your shopping fix. Aside from clothing offers, highlight any off-duty outfit with our assorted selection of shoes and accessories. With delicate jewelry, hair accessories, and bags Cartify's range is sure to make any outfit pop. Check out our offers on a wardrobe staple, denim, and add a timeless, iconic flair to your look. High-waisted, skinny, mom jeans, boyfriend jeans, denim jackets, you name it!</p>
    <p className='text-xl pb-5'>Fancy a lie-in? Sleep tight in our range of delicate and comfortable women's nightwear. Ranging from classic pajamas to matching sets for a lazy weekend, you'll be sure to find your essentials in our ladies' sleepwear range. Choose from a range of materials to keep you comfortable, from soft, smooth silk, cool and crisp cotton, or cozy flannel. Why not also browse our range of lingerie for all your lingerie needs. Grab some everyday essential underwear with our multipacks or shop some of our more delicate pieces to boost your confidence, from bodysuits and more.</p>
    <p className='text-xl pb-10'>Shop women's apparel online at Cartify and explore an array of styles and don't forget to download Cartify app for a better shopping experience,</p>
            </>
          )}
        </p>
        <button className='underline cursor-pointer font-bold text-2xl font-[sans] pb-10' onClick={()=>setFulText(!fullText)}>{fullText?"READ LESS":"READ MORE"}</button>
      </div>
        :
        category === "men"
        ?
        <div className='pt-10 px-7'>
          <p className='font-semibold text-2xl py-5'>Men's Fashion at Cartify</p>
          <p className='text-xl pb-10'>Discover men's clothing for the freshest fashion trends right here at Cartify. Whether you are looking for everyday casual wear or garments to throw on for the office, our men’s fashion will keep every man looking his absolute best. Shop our classic yet modern menswear collectio
            {!fullText && "..."}
            {fullText && (
              <>
               n to keep each piece in your wardrobe timeless. We've got a wide selection of men's apparel, ranging from everyday staples like t-shirts, hoodies, trousers and jeans, to tailored blazers and suits.
            <p className='text-xl py-5'>Update your shoe collection with Cartify’s array of shoes, ideal to take you anywhere from the beach to the gym and everywhere in between. Look out for the selection of this seasons styles from trainers, sneakers, boots, and many more for whatever the occasion. Sneakers not your thing? Check out our range of derby shoes, loafers and oxford shoes to compliment your formal attire.</p>
            <p className='text-xl pb-5'>Create your perfect summer wardrobe with Cartify’s latest edit and grab some men’s summer essentials. Whether you’re chilling by the pool or hitting a beach festival, dive into our men’s selection of swimwear. Stay cool in cotton t-shirts, linen shorts and browse through our latest edit. It’s all in the details - Shop Cartify for the best selection of men’s accessories, from elevated essentials to cool graphics, we have it all. Check out our men’s underwear, fun graphic socks, jewellery, bags and seasonal sunglasses to boost any outfit. Why not scroll through our men’s new arrivals to grab more of the good stuff.</p>
            <h5 className='font-semibold py-3 text-2xl'>Styles for any Occasion</h5>
            <p className='text-xl py-5'>If your outerwear needs a refresh, browse through our collection of jackets, coats and long sleeve tops for winter layering to basic tees and vests and everything in between. Cartify’s collection of men’s clothes has all your seasonal needs covered. Why not have fun with your style with one of our graphic hoodies and sweatshirts. Whether you’re representing your favourite sports team, band or movie we’ve got the printed hoodies you need to express your style. Or check out our range of t-shirts and jersey tops to pair with a biker jacket and your favourite go-to jeans for an effortless street style look.</p>
            <p className='text-xl pb-5'>If you want to look fresh while breaking a sweat, we have the perfect collection of sportswear for your fitness needs. Shop our range of running shorts, joggers, tights and padded jackets for your daily outdoor workout. Or make the most out of the athleisure trend and rock these styles daily for the ultimate street style. Pair these looks with our versatile range of sneakers and trainers for even the most high-impact workouts.</p>
               <p className='text-xl pb-10'>At Cartify we recognize they every man wants to look stylish. Stay tuned for our weekly drops of on trend styles and keep an eye out for amazing deals on men’s clothing. We guarantee that you will find what you’re looking for here at Cartify!</p>
              </>
            )}
          </p>
        <button className='underline cursor-pointer font-bold text-2xl font-[sans] pb-10' onClick={()=>setFulText(!fullText)}>{fullText?"READ LESS":"READ MORE"}</button>
        </div>
        :
        <div className='pt-10 px-7'>
          <p className='font-bold text-4xl py-5'>Explore Cartify's fashionable range, specially curated for kids to teenagers.</p>
          <p className='text-[21px] pb-10'>Whether you're seeking trendy styles for your teenager or playful, durable clothing for your growing child, Cartify has everything you need. Discover our collection d
            {!fullText && "..."}
            {fullText && (
              <>
                 esigned to keep your child stylish through every stage of their development.
        <h4 className='text-[39px] font-bold py-5'>Chic Styles for Little Ones</h4>
        <p className='text-xl py-3'>Welcome your little one in style with Cartify's irresistible selection of clothing for kids aged 2 to 8 years. Our adorable pieces, including bodysuits, t-shirts, and leggings, ensure your kid stays snug and cozy.</p>
        <p className='text-xl pb-3'>As your child grows, Cartify continues to cater to their needs. Explore our spring arrivals for children, featuring charming dresses and comfortable cotton pieces. Delight your little girl with dresses, embellished sweatshirts, shoes, and accessories, while boys can enjoy stylish joggers, sweatshirts, and jeans.</p>
        <h5 className='font-bold text-[32px] py-5'>Stylish Picks for the Trendy Kids</h5>
        <p className='text-xl pb-5 pt-1'>Kickstart your child's fashion journey with our stylish pieces designed for enjoyable playdates and get-togethers. Explore our latest collaboration, Cartify x Karolina Kijak, showcasing quirky prints and exotic patterns that will keep your kids looking cool. Whether your child loves Marvel, Disney, or other characters, Cartify has various options.</p>
        <p className='text- pb-3'>With spring in full swing, dress your boy in a classic suit jacket, cotton chinos, and loafers for a cool nautical look. For your girl, a flowy chino dress paired with timeless ballet pumps creates the ultimate spring style.</p>
        <h5 className='font-bold text-[32px] py-5'>Fashion for Teens at Cartify</h5>
        <p className='text-xl pb-5'>Shopping for teens can be challenging, but at Cartify, we stay on top of trends to make your experience hassle-free. Explore our collection for boys and girls aged 8-14, featuring graphic tops, dresses, and accessories for chic girls. Dapper boys can browse our refined occasionwear, trousers, and shoes, ensuring they're ready for any formal occasion, adventure, or school day. Prepare your teens for the school year with our back-to-school collection of stylish uniforms.</p>
        <p className='text-xl pb-10'>Don't miss out on incredible offers! Explore deals at Cartify, ensuring your child's wardrobe stays up-to-date. Enhance your shopping experience by downloading the Cartify app.</p>
        </>
            )}
            </p>
            <button className='underline cursor-pointer font-bold text-2xl font-[sans] pb-10' onClick={()=>setFulText(!fullText)}>{fullText?"READ LESS":"READ MORE"}</button>  
       </div>}
    </div>
  )
}

export default Text
