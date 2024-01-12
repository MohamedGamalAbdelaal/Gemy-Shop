import React from 'react'
import Slider from'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
export default function HomeSlide() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows :false
      };

      return <div>
        
            <div className="products mx-auto w-100 my-4">
            <Slider {...settings}>
            <div>
             <img style={{width:'100%',height:'350px'}} src={require("../../Assets//images/5.jpg")} alt="" />
            </div>
            <div>
            <img style={{width:'100%',height:'350px'}} src={require("../../Assets//images/6.jpg")} alt="" />
            </div>
            <div>
            <img style={{width:'100%',height:'350px'}} src={require("../../Assets//images/3.jpg")} alt="" />
            </div>
            <div>
            <img style={{width:'100%',height:'350px'}} src={require("../../Assets//images/1.jpg")} alt="" />
            </div>
            <div>
            <img style={{width:'100%',height:'350px'}} src={require("../../Assets//images/banner-4.jpeg")} alt="" />
            </div>
            
          </Slider>
            </div>
            
    
        
        </div>
      
    }
  
   

