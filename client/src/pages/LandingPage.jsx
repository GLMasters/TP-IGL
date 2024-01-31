import { dummyData } from '../data/dummyData';
import FilterBar from '../components/FilterBar';
import ArticleItem from '../components/ArticleItem';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';

export default function LandingPage() {
  const [visible, setVisible] = useState(false);
  const [filterMode, setFilterMode] = useState(false);
  return (
    <div className="bg-thirdColor py-4 absolute -z-10 w-full top-0 bottom-0 lg:h-screen">
      {visible && (
        <div
          className="bgGradient1 absolute top-0 h-full w-full left-0 z-10"
          onClick={() => setVisible(false)}
        />
      )}

      {/* <AiOutlineMenu onClick={()=>setVisible(true)} size={20} className="absolute top-4 right-3 lg:hidden" /> */}

      {/* filter bar */}
      {filterMode && <FilterBar visible={visible} setVisible={setVisible} />}

      <div className="container w-full mx-auto mt-28">
        {/* our seaach page */}
        <SearchBar setFilter={setFilterMode} />
        {filterMode ? (
          <button
            onClick={() => setVisible(true)}
            className="filterBtn bg-primaryColor text-white py-3 px-4 pr-8 text-lg shadow-lg ml-4"
          >
            Filter
          </button>
        ) : (
          <h3 className="font-Lora italic font-bold text-3xl mb-6 ml-4">
            Découvrez nos Articles
          </h3>
        )}

        {/* our list articles */}
        <div className="flex flex-col gap-4 lg:max-h-[60vh] lg:overflow-x-hidden lg:overflow-y-scroll scrollbar1 px-3">
          {dummyData.map((artcl, index) => (
            <ArticleItem index={index} {...artcl} key={artcl.id} />
          ))}
        </div>
        {/* see more button */}
        <div className="flex justify-center">
          <button className="btn1 pl-3 pr-6 text-white py-3 lg:hidden">
            voir plus
          </button>
        </div>
      </div>
    </div>
  );
}
