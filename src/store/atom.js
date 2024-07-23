import { atom } from "recoil";

export const emotionComsumptionDataState = atom({
  key: "emotionConsumptionData",
  default: {
    happiness: null,
    emotionIndex: "",
    consumtion: [
      {
        id: "",
        category: "",
        money: "",
      },
    ],
  },
});

export const happinessIndexState = atom({
  key: "happinessIndex",
  default: 0,
});

export const importantIncidentState = atom({
  key: "importantIncident",
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
