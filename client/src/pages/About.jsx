import aboutSvg1 from "../assets/aboutSvg1.svg"
import aboutSvg2 from "../assets/aboutSvg2.svg"
import {TeamFeatues} from "../data/index"
import FeatureCard from "../components/FeatureCard"
import {motion} from "framer-motion"
import {stagger,fadeIn,textVariant} from "../motion/index"
export default function About() {
  return (
    <div className="w-full">

            {/* section 1 */}
            <motion.div variants={stagger("childrenBefore")} initial={"hidden"} whileInView={"show"} viewport={{
                margin:"-100px",
                once:true,
            }} className="min-h-screen bg-seconadryColor px-6 flex flex-wrap-reverse justify-center gap-[4rem]">
                    <motion.div variants={fadeIn("right","spring",0.75,0.1)} className="w-[40rem] h-[40rem] flex-fluid1 order-1">
                            <img src={aboutSvg1} alt="aboutSvg1" className="w-full object-cover" />
                    </motion.div>
                    <motion.div variants={textVariant(0.3)} className="flex-fluid1 text-white order-2 max-w-[40rem] mt-16">
                            <h2 className="mb-5">Qu'est ce que <span className="text-primaryColor font-bold">DocLib</span> ?</h2>
                            <p className="text-lg">DocLib représente bien plus qu'une simple plateforme de recherche d'articles scientifiques. C'est votre passerelle vers une vaste bibliothèque numérique d'informations académiques. Explorez une multitude de sujets et de domaines spécifiques sans contrainte.
                            Trouvez, importez et plongez-vous dans le savoir scientifique à travers une interface conviviale. DocLib simplifie la recherche et l'accès à une variété de textes académiques, vous offrant une expérience enrichissante pour explorer le monde de la science, sans abonnement ni limitation.</p>
                    </motion.div>
            </motion.div>

            {/* section 2 */}

            <motion.div variants={stagger("childrenBefore")} initial={"hidden"} whileInView={"show"} viewport={{
                margin:"-120px",
                once:true,
            }} className="bg-white px-6 flex flex-wrap justify-center gap-[4rem] pt-20">
                    <motion.div variants={textVariant(0.2)} className="flex-fluid1 text-white max-w-[40rem] mt-16">
                            <h2 className="mb-5 text-seconadryColor">Notre équipe</h2>
                            <p className="text-lg text-black">Notre équipe chez DocLib, composée de cinq passionnés dévoués, s'unit pour offrir une expérience de recherche d'articles scientifiques exceptionnelle. Chacun apporte une expertise unique, du développement web à la conception graphique, pour créer une plateforme répondant précisément à vos besoins académiques. Avec notre engagement pour l'excellence, nous vous offrons une expérience de recherche inégalée grâce à la diversité et à la passion de notre équipe.</p>
                    </motion.div>
                    <motion.div variants={fadeIn("up","spring",0.9,0.3)} className="w-[40rem] h-[40rem] flex-fluid1">
                            <img src={aboutSvg2} alt="aboutSvg2" className="w-full object-cover" />
                    </motion.div>
            </motion.div>

            {/* section 3 */}
            <motion.div variants={stagger("chidrenBefore")} initial={"hidden"} whileInView={"show"} viewport={{
                margin:"-100px",
                once:true,
            }} className="bg-primaryColor p-20 grid grid-cols-fluid gap-10">
                    {
                        TeamFeatues.map((feature,index)=><FeatureCard key={index} {...feature} />)
                    }
            </motion.div>

            {/* Faq */}
            <motion.div variants={stagger("chidrenBefore")} initial={"hidden"} whileInView={"show"} viewport={{
                margin:"-100px",
                once:true,
            }} className="bg-white container px-8 flex flex-col items-center my-10">
                        <h2 className="uppercase text-seconadryColor font-bold">
                            FAQ
                        </h2>
                        <motion.div variants={textVariant(0.1)} className="w-10/12 text-start my-8">
                            <h3 className="text-seconadryColor">Comment puis-je utiliser DocLib ?</h3>
                            <p className="text-lg">DocLib est une plateforme gratuite qui vous permet d'accéder à une vaste sélection d'articles scientifiques. Il vous suffit de vous inscrire sur notre site pour commencer à explorer notre bibliothèque et à rechercher des articles selon vos intérêts académiques.</p>
                        </motion.div>
                        <motion.div variants={textVariant(0.4)} className="w-10/12 text-start my-8">
                            <h3 className="text-seconadryColor">Où puis-je trouver des documents sur DocLib ?</h3>
                            <p className="text-lg">Vous pouvez trouver une variété d'articles scientifiques en utilisant notre fonction de recherche sur le site DocLib. Explorez notre collection pour découvrir des articles adaptés à votre domaine d'études ou d'intérêt.</p>
                        </motion.div>
                        <motion.div variants={textVariant(0.8)} className="w-10/12 text-start my-8">
                            <h3 className="text-seconadryColor">Quelles sont les fonctionnalités disponibles sur DocLib ?</h3>
                            <p className="text-lg">DocLib offre une interface conviviale pour explorer et lire des articles scientifiques. Vous pouvez utiliser notre fonction de recherche avancée, marquer vos articles préférés et accéder à du contenu hors ligne via notre site web.</p>
                        </motion.div>
                        <motion.div variants={textVariant(1.2)} className="w-10/12 text-start my-8">
                            <h3 className="text-seconadryColor">Comment accéder à DocLib hors ligne ?</h3>
                            <p className="text-lg">DocLib vous permet de télécharger des articles pour une consultation hors ligne. Une fois téléchargés via notre site, vous pourrez les lire même lorsque vous n'êtes pas connecté à Internet.</p>
                        </motion.div>
                        <motion.div variants={textVariant(1.6)} className="w-10/12 text-start my-8">
                            <h3 className="text-seconadryColor">Est-ce que DocLib propose des abonnements payants ?</h3>
                            <p className="text-lg">Pour le moment non, DocLib est entièrement gratuit. Vous pouvez accéder à notre bibliothèque complète et utiliser toutes nos fonctionnalités sans aucun coût ni abonnement.</p>
                        </motion.div>
            </motion.div>
    </div>
  )
}
