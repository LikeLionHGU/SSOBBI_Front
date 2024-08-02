import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "localStorage", //원하는 key 값 입력
  storage: localStorage,
});

export const happinessRateState = atom({
  key: "happinessRate",
  default: 0,
});

export const contentState = atom({
  key: "content",
  default: "",
});

export const consumptionIndexState = atom({
  key: "consumptionIndex",
  default: [],
});

export const UserTokenState = atom({
  key: "userToken",
  default: { isLoggedIn: false },
  effects_UNSTABLE: [persistAtom],
});

export const tokenState = atom({
  key: "token",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const userData = atom({
  key: "userData",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const firstCategoryState = atom({
  key: "firstCategory",
  default: [],
});
