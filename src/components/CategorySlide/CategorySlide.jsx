import axios from 'axios';
import React from 'react'
import { ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import Slider from 'react-slick';

export default function CategorySlide() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows :false,
        
      };
      function getAllCategory(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      }
      const {data,isLoading}=useQuery('categorySlider',getAllCategory,{refetchOnMount:false})
      if(isLoading){
        return<>
        <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
        </>
      }
      return <div>
        
            
            <Slider {...settings}>
            {data?.data.data.map(function(category,indx){
               return <div key={indx} className="m-4">
                <img style={{width:'100%',height:'200px'}} src={category.image} alt="" />
              <h6 className="p-2">{category.name}</h6>
               </div>
            })}
            
          </Slider>
            </div>
            
        
      
}
