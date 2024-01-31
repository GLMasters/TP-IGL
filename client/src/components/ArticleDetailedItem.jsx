import React from 'react'

function ArticleDetailedItem({
    title,content
}) {
  return (
    <div className='flex gap-6 border-b-2 border-black p-4 text-black'>
            {/* title */}
            <h4 className='font-bold mt-4'>{title}</h4>
            {/* content */}
            <div className='bg-gray p-4 px-6 rounded-2xl shadow-md text-wrap'>
                {content}
            </div>
    </div>
  )
}

export default ArticleDetailedItem
