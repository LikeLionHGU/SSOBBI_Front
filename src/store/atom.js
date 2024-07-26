import { atom } from "recoil";

export const emotionComsumptionDataState = atom({
  key: "emotionConsumptionData",
  default: {
    happinessRate: null,
    content: "",
    consumptions: [
      {
        id: "",
        category: "",
        money: "",
      },
    ],
  },
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
});

export const tokenState = atom({
  key: "token",
  default: null,
});
