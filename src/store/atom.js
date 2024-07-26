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
  default: [
    // {
    //   id: "1",
    //   category: "식비",
    //   consumption: "30,000",
    // },
    // {
    //   id: "2",
    //   category: "교통비",
    //   consumption: "3,000",
    // },
  ],
});

export const UserTokenState = atom({
  key: "userToken",
  default: { isLoggedIn: false },
});

export const tokenState = atom({
  key: "token",
  default: null,
});
