import React from 'react'
import Slider from'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
export default function HomeSlide() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows :false
      };

      return <div>
        <div className="row gx-0 m-4">
            <div className="col-sm-9">
            <Slider {...settings}>
            <div>
             <img style={{width:'100%',height:'350px'}} src={require("../../Assets//images/grocery-banner-2.jpeg")} alt="" />
            </div>
            <div>
            <img style={{width:'100%',height:'350px'}} src={require("../../Assets//images/blog-img-2.jpeg")} alt="" />
            </div>
            <div>
            <img style={{width:'100%',height:'350px'}} src={require("../../Assets//images/grocery-banner.png")} alt="" />
            </div>
            <div>
            <img style={{width:'100%',height:'350px'}} src={require("../../Assets//images/blog-img-1.jpeg")} alt="" />
            </div>
            <div>
            <img style={{width:'100%',height:'350px'}} src={require("../../Assets//images/banner-4.jpeg")} alt="" />
            </div>
            
          </Slider>
            </div>
            <div className="col-sm-3">
                <img style={{width:'100%', height:'175px'}} src={require('../../Assets/images/slider-image-2.jpeg')} alt="" />
                <img style={{width:'100%', height:'175px'}} src={require('../../Assets/images/slider-image-1.jpeg')} alt="" />
            </div>
        </div>
        
        </div>
      
    }
  
   

