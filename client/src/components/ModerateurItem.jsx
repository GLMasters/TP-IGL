import checkSvg from "../assets/checkSvg.svg"
import checkDisabled from "../assets/checkDisabled.svg"
import { useState } from "react"
function ModerateurItem({
    moderatorName,
    moderatorEmail,
    moderatorPhone,
    moderatorAdr
}) {

  const [isChecked,setIsChecked]=useState(false)

  return (
    <>
    <div className="w-full hidden lg:grid lg:grid-cols-5 py-6 border border-b-2 border-t-0 border-r-0 border-l-0 relative">
        <img src={isChecked ? checkSvg : checkDisabled} onClick={()=>setIsChecked(!isChecked)} className="absolute -left-0 w-8 top-[0%] translate-y-[70%]" />
        <h4 className="ml-14 text-black">{moderatorName}</h4>
        <h4 className="text-black">{moderatorEmail}</h4>
        <h4 className="text-black">{moderatorPhone}</h4>
        <h4 className="text-black">{moderatorAdr}</h4>
        {/* Edit button */}
        <button className="bg-seconadryColor px-8 py-3 -mt-2 ml-16 rounded-md w-fit text-white ">Modifier</button>
    </div>
    <div className="w-full flex items-start gap-4 lg:hidden py-6 border border-b-2 border-t-0 border-r-0 border-l-0">
    <img src={isChecked ? checkSvg : checkDisabled} onClick={()=>setIsChecked(!isChecked)} className="w-8" />
    <div className="">
    <h4><span className="font-bold">Nom : </span> {moderatorName}</h4>
    <h4><span className="font-bold">Email: </span>{moderatorEmail}</h4>
    <h4><span className="font-bold">Téléphone : </span>{moderatorPhone}</h4>
    <h4><span className="font-bold">Address : </span>{moderatorAdr}</h4>
    </div>
    {/* Edit button */}
    <button className="bg-seconadryColor px-2 py-3 -mt-2 ml-16 rounded-md w-fit text-white self-center">Modifier</button>
</div>
    </>
  )
}

export default ModerateurItem
