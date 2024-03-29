'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import AnimeCard, { AnimeProp } from "@/components/AnimeCard";
import LoadMoreComponents from "@/components/LoadMore";

import { getAnimationList } from "./action";

const Home = () => {
  const [data, setData] = useState<AnimeProp[]>([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  const loadMore = useCallback(async () => {
    const newData = await getAnimationList(page);
    if (newData.length < 8) {
      return;
    }
    setData(prevData => [...prevData, ...newData]);
    setPage(prevPage => prevPage + 1);
  }, [page]);

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };
    
    const observer = new IntersectionObserver((entities, observer) => {
      const target = entities[0];
      if (target.isIntersecting) {   
        loadMore();
      }
    }, options);

    if (loader.current) {
      observer.observe(loader.current)
    }

    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data.map((item: AnimeProp) => (
          <AnimeCard key={item.id} anime={item}  />
        ))}
      </section>
      <div ref={loader}>
        <LoadMoreComponents />
      </div>
    </main>
  );
}

export default Home;