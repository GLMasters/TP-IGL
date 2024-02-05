import { IoIosCheckmarkCircle } from "react-icons/io";
import { Link } from "react-router-dom";
function SuccessMessage({
  message,
  link,
  isOkBtn
}) {
  return (
    <div className='max-w-md w-full rounded-md shadow-lg bg-white flex flex-col gap-8 items-center p-4'>
            <IoIosCheckmarkCircle className="text-seconadryColor" size={100} />
            <h3 className="font-bold text-slate-700">Vérified</h3>
            <h5>{message}</h5>
            <Link to={link} className="shadow-md bg-seconadryColor text-white font-bold px-4 py-3">{isOkBtn ? "Ok" : "continuer"}</Link>
    </div>
  )
}

export default SuccessMessage
