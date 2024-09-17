import React from 'react'
import "./ExploreMenu.css" 
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='exploremenu' id='exploremenu'>
        <h1>Explore Our Menu</h1>
        <p  className='exploremenutext'>Choose from a diverse menu feature a delectable array of dishes crafted with the finest ingredients and culinary expertise . Our meal will satisfy your craving and elevate your dining experience, one delicious meal at a time.</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=> {
                return (
                    <div onClick={()=>setCategory(prev=>prev===item.menu_image?"All":item.menu_name)}  key={index} className='explore-menu-list-items'>
                        
                        <img  className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>


                    </div>
                )

            })}
        </div>
            <hr/>
      
    </div>
  )
}

export default ExploreMenu
