function Spinner() {
  return (
    <div className="fixed inset-0 h-full flex justify-center items-center bgGradient z-10">
        <span className="loading loading-spinner loading-md"></span>
    </div>
  )
}

export default Spinner
