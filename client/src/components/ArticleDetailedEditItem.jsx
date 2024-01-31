function ArticleDetailedEditItem({
    attr,
    content
}) {
  return (
    <div className='flex gap-6 border-b-2 border-black p-4 text-black my-4'>
    {/* title */}
    <h4 className='font-bold mt-4 text-wrap'>{attr}</h4>
    {/* content */}
    <input type="text" value={content} className='bg-gray p-4 px-6 rounded-2xl shadow-md placeholder:text-slate-300 w-10/12 text-wrap' />
</div>
    
  )
}

export default ArticleDetailedEditItem
