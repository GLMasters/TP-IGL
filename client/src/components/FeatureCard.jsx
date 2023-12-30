import { Tilt } from 'react-tilt'
import {motion} from "framer-motion"
import { fadeIn } from '../motion'
function FeatureCard({
    icon,title,desc,index
}) {

    const options={
        perspective:    1000, 
	scale:          1.1,
	speed:          1000, 
	transition:     true, 
    easing:"easeInOut"
    }
  return (
    <motion.div variants={fadeIn("up","spring",0.7,index * 0.3)}>
    <Tilt options={options}>
    <div className="min-w-fit pt-10 pb-5 px-4 rounded-lg shadow-lg bg-white flex flex-col items-center">
    <img className="w-[6rem] rounded-md object-cover" alt={title} src={icon} />
    <h3>{title}</h3>

    <p>{desc}</p>
</div>
    </Tilt>
    </motion.div>
    
  )
}

export default FeatureCard
