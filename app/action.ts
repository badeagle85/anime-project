"use server";

export const getAnimationList = async (page: number) => {
  const animation = await fetch(`https://shikimori.one/api/animes?page=${page}&limit=8&order=popularity`);
  const data = await animation.json();
  return data;
}