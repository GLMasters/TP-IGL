import { MdClose } from "react-icons/md";

function SearchItem({
    keyword,
    removeItem
}) {
  return (
    <div className="p-4 rounded-md shadow-lg bg-seconadryColor text-white flex items-center gap-4">
      {keyword}
      <MdClose color="#C77DFA" className="bg-white rounded-full" onClick={()=>removeItem(keyword)} />
    </div>
  )
}

export default SearchItem
