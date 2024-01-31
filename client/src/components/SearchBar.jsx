import { useEffect, useState } from "react"
import addSvg from "../assets/addSvg.svg"
import searchOutline from "../assets/SearchOutline.svg"
import SearchItem from "./SearchItem"



function SearchBar({setFilter}) {

  const [searchKey,setSearchKey]=useState("")
  const [items,setItems]=useState([])
  const removeItem=(key)=>{
    setItems(items.filter(item => item != key))
  }
  const addItemToList=()=>{
    if(!searchKey) return;
    setItems([...items,searchKey]);
    setSearchKey("")
  }

  useEffect(()=>{
    if(items.length){
      setFilter(true)
    }else setFilter(false)
  },[items])

  return (
    <div className="w-full xl:w-3/4 my-10 mx-auto">
    <div className="w-full rounded-3xl border-2 border-primaryColor flex items-center bg-white my-5 relative">
            {/* search input */}
            <input value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} type="text" className="w-full h-full bg-inherit placeholder:text-slate-400 py-4 px-10 rounded-full outline-none" placeholder="Ajoutez quelques choses ..." />
            <img src={addSvg} alt="addSvg" className="absolute right-24 scale-75" onClick={addItemToList} />
            <div className="border-l-2 border-l-primaryColor h-full absolute right-5 flex items-center justify-center pl-5">
                <img src={searchOutline} className="object-cover w-10 h-10" alt="searchOutline" />
            </div>
    </div>
    {/* display items */}
    <div className="flex flex-wrap gap-2">
    {items.length ? items.map(item =>(
      <SearchItem keyword={item} removeItem={removeItem} />
    )) : ""}
    </div>
    </div>
  )
}

export default SearchBar
