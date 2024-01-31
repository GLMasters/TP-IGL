import Footer from '../components/Footer';
import ArticleFavoris from '../components/ArticleFavoris';

function Favoris() {
  return (
    <>
      <div className=" bg-thirdColor min-h-screen mt-0">
        <div className="py-16 ">
          <h1 className="font-Lora text-3xl text-black ml-10 md:ml-32 font-semibold">
            Vos articles préférés :
          </h1>
        </div>
        <ArticleFavoris
          title={
            'AI Model for Computer games based on Case BasedReasoning and AI Planning'
          }
          authors={['Vlado Menkovski', 'Dimitrios Metafas']}
          institutions={[
            'Athens Information Technology0.8km Markopoulou Ave.Peania, 19002, Greece',
            'University of Massachusetts Amherst USA',
          ]}
        />
        <ArticleFavoris
          title={
            'AI Model for Computer games based on Case BasedReasoning and AI Planning'
          }
          authors={['Vlado Menkovski', 'Dimitrios Metafas']}
          institutions={[
            'Athens Information Technology0.8km Markopoulou Ave.Peania, 19002, Greece',
            'University of Massachusetts Amherst USA',
          ]}
        />
        <ArticleFavoris
          title={
            'AI Model for Computer games based on Case BasedReasoning and AI Planning'
          }
          authors={['Vlado Menkovski', 'Dimitrios Metafas']}
          institutions={[
            'Athens Information Technology0.8km Markopoulou Ave.Peania, 19002, Greece',
            'University of Massachusetts Amherst USA',
          ]}
        />
      </div>
      <Footer />
    </>
  );
}

export default Favoris;
