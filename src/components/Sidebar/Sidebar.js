import React from 'react'
import productTypes from "./data"
import {FaAngleRight} from 'react-icons/fa'
import { useGlobalContext } from '../../context'
//uses global context and data file to iterate through the data for the sidebar links
export const Sidebar = () => {
    const {setCatalogueType} = useGlobalContext();
    return (
        <aside className="sideNav">
            {productTypes.map((item, index)=>{//array maps the categories of products
                const {Category, subCat} = item;
                return(
                    <div key={index} className="categoryContainer">
                        <h3>{Category}</h3>
                        {subCat.map((item,index)=>{//array maps the types of products within the categories
                            const {name} = item;
                            return(
                                <button key={index} value={name} onClick={(e)=>setCatalogueType(e.target.value)}> {/*sets the state based on what button the user clicks*/}
                                    <FaAngleRight/> {name}
                                </button>
                            )
                        })}
                    
                    </div>
                    
                )
            })}
        </aside>
    )
}

export default Sidebar