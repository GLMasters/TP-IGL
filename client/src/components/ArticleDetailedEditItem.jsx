import {useState} from "react"
function ArticleDetailedEditItem({
    attr,
    setFormData,
    formData,
    name,
    content
}) {

  return (
    <div className='flex gap-6 border-b-2 border-black p-4 text-black my-4'>
    {/* title */}
    <h4 className='font-bold mt-4 text-wrap'>{attr}</h4>
    {/* content */}
    {(attr == "Titre d'article" || attr == "Auteurs" || attr=="Institutions") ? <input type="text" value={content} onChange={(e)=>setFormData({...formData,name:e.target.value})} className='bg-gray p-4 px-6 rounded-2xl shadow-md placeholder:text-slate-300 w-10/12 text-wrap' /> : <textarea rows={10} type="text" onChange={(e)=>setFormData(e.target.value)} className='bg-gray p-4 px-6 rounded-2xl shadow-md placeholder:text-slate-300 w-10/12 text-wrap' />}
</div>
    
  )
}

export default ArticleDetailedEditItem
