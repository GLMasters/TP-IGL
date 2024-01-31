import ArticleDetailedItem from '../components/ArticleDetailedItem';
function ArticlesScreen() {
  return (
    <div className="container px-20 w-full mx-auto mt-10 flex flex-col gap-4">
      {/* title */}
      <ArticleDetailedItem
        title={"Titre d'article "}
        content={
          'AI Model for Computer games based on Case BasedReasoning and AI Planning'
        }
      />
      {/* Auteurs */}
      <ArticleDetailedItem
        title={'Auteurs'}
        content={'Vlado Menkovski, Dimitrios Metafas'}
      />
      {/* institutions */}
      <ArticleDetailedItem
        title={'Institutions'}
        content={['CSE Club', 'ESI Algeries']}
      />
      {/* Résume */}
      <ArticleDetailedItem
        title={'Résumé'}
        content={
          'Making efficient AI models for games with imperfectselected by finding similarities to cases in the CBR database. Thestrategies are formed by a set of desired goals. The AI planning is responsible for creating a plan to reach these goals. The plan is basically a set of moves that brings the player to this goal. By'
        }
      />
      {/* les mots clés */}
      <ArticleDetailedItem
        title="les mots clés"
        content={'Game AI, Case Based Reasoning, AI Planning, Game Trees'}
      />
      {/* references */}
      <ArticleDetailedItem
        title="Références"
        content="[1] Minimax. Wikipedia. [Online] [Cited: April 23, 2008.]http://en.wikipedia.org/wiki/Minimax.[2] Von Neumann, J: Zur theorie der gesellschaftsspiele Math."
      />
      {/* text intégral */}
      <ArticleDetailedItem
        title="Text intégral"
        content="Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl. urabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl. Rorem "
      />
      {/* lien pdf */}
      <ArticleDetailedItem title="Lien Pdf" content="Lien PDF" />

      <button className="bg-primaryColor px-6 py-3 rounded-md shadow-lg w-fit text-white mx-auto my-10 cursor-pointer">
        Télécharger
      </button>
    </div>
  );
}

export default ArticlesScreen;
