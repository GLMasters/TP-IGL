export const textVariant=(delay)=>{
    return {
    hidden:{
        y:10,
        opacity:0
    },
    show:{
        y:0,
        opacity:1
    },
    transition: {
        type: "spring",
        duration: 0.9,
        delay: delay,
      }

    }
}

export const fadeIn=(direction,type,duration,delay)=>{
    return {
        hidden: {
        x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
        y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
        opacity: 0,
    },
    show:{
        x:0,
        y:0,
        opacity:1,
        transition:{
            type:type,
            duration:duration,
            ease:"easeOut",
            delay:delay
        }
    }
    }
}

export const stagger=(staggetChildren,delay)=>{
    return {
        hidden:{},
        show:{
            transition:{
                staggetChildren:staggetChildren,
                delayChildren : delay || 0.2
            }
        }
    }
}