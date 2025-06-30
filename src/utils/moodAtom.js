import { atom } from "jotai";

export const moodAtom = atom({
  name: "sad",
  src: "/Question-mark.png",
  value: "4icXG0elrBxzTn5jSfJy1w",
});

export const trackAtom = atom(null);
export const playlistAtom = atom([]);
export const playAtom = atom(false);
export const durationAtom = atom(0);
