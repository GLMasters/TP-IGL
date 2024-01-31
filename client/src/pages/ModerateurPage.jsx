import ModeratorArticle from "../components/ModeratorArticle"
import Footer from '../components/Footer';
function ModerateurPage() {
  return (
    <>
    <div className="container w-full mx-auto px-8 py-20">
            <div className="flex justify-end gap-4">
                    <button className="px-5 py-3 bg-primaryColor rounded-md text-white">Accepter</button>
                    <button className="px-5 py-3 bg-gray border rounded-md">Supprimer</button>
            </div>
            {/* listing artcs */}
            <div className="">
                <div className="grid grid-cols-3">
                    <h4 className="ml-14 font-semibold text-black">Titre d'article</h4>
                    <h4 className="font-semibold text-black">Auteurs</h4>
                </div>
                <ModeratorArticle articleTitle={"AI Model for Computer games based on Case BaseReasoning and AI Planning"} auteurs={["sami,lahcen"]} />
                <ModeratorArticle articleTitle={"AI Model for Computer games based on Case BaseReasoning and AI Planning"} auteurs={["sami,lahcen"]} />
            </div>
    </div>
    <Footer />
    </>
  )
}

export default ModerateurPage
