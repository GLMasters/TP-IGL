import { dummyData } from "../data/dummyData"
import FilterBar from "../components/FilterBar"
import ArticleItem from "../components/ArticleItem"
import { useState } from "react"
import { AiOutlineMenu } from "react-icons/ai";
export default function LandingPage() {
  const [visible,setVisible]=useState(true)
  return (
    <div className="bg-thirdColor lg:grid lg:grid-cols-fluid2 gap-4 py-4 relative">
    {
      visible && <div className="bgGradient1 absolute top-0 h-full w-full left-0 z-10 lg:hidden"></div>
    }
    <AiOutlineMenu onClick={()=>setVisible(true)} size={20} className="absolute top-4 right-3 lg:hidden" />
    
    {/* filter bar */}
    <FilterBar visible={visible} setVisible={setVisible} />
          {/* our serach page */}
         

          <div className="px-4">
              <h3 className="font-Lora italic font-bold text-3xl mb-6">Découvrez nos Articles</h3>
              {/* our list articles */}
              <div className="flex flex-col gap-4">
              {
                dummyData.map((artcl,index)=>(
                  <ArticleItem index={index} {...artcl} key={artcl.id} />
                ))
              }
          </div>
           {/* see more button */}
           <button className="btn1">voir plus</button>
          </div>
         

          
    </div>
  )
}
