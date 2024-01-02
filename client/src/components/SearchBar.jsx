function SearchBar() {
  return (
    <div className="w-full xl:w-3/4 mx-auto rounded-3xl border-2 border-primaryColor flex items-center px-4 py-3 bg-white">
            {/* search input */}
            <input type="text" className="w-full h-full bg-inherit placeholder:text-slate-400" placeholder="Découvrir nos Articles" />
    </div>
  )
}

export default SearchBar
