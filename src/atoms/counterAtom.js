import { atom } from "recoil";

export const counterAtom = atom({
  key: "counterAtom", // state를 구분하는 역할
  default: 0, // state의 초기값
});
