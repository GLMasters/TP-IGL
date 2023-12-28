import homeImage from "../assets/home-image.svg"
function HomeScreen() {
  return (
    <div className="container mx-auto w-full px-3 pt-20 lg:pt-6 max-h-screen flex flex-wrap items-center bg-white min-h-screen">
    {/* left side */}
    <div className="flex-fluid ml-4 mb-10">
        <h3 className="font-bold">Trouvez Vos Articles en Un Clin d'OEil!</h3>
        <div className="my-8 mb-4">
        <h1 className="font-extrabold">DocLib</h1>
        <p className="text-black w-3/5 my-6">la bibliothèque numérique qui simplifie la recherche d'articles. Explorez une collection diversifiée d'articles scientifiques, d'actualités, de revues spécialisées et bien plus encore, le tout à portée de clic.</p>
        </div>
        <button className="hidden md:block Btn1 px-3 py-5 text-2xl shadow-lg text-white w-3/5 bg-primaryColor my-8">Découvrir la collection</button>
    </div>
        {/* right side */}
        <div className="flex-fluid flex flex-col items-center">
        <div className="w-[17rem] lg:w-[30rem] xl:w-[35rem] mx-auto">
        <img src={homeImage} alt="background" className="w-[100%] xl:scale-75 object-cover" />
        </div>
                
                <button className="Btn2 w-10/12 my-4 py-4 text-white md:hidden bg-seconadryColor">Découvrir la collection</button>
        </div>
        
    </div>
  )
}

export default HomeScreen
