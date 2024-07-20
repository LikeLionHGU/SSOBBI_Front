import { atom } from "recoil";

export const priceInputState = atom({
  key: "priceInput",
  default: false,
});

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
  default: null,
});

export const importantIncidentState = atom({
  key: "importantIncident",
  default: "",
});

export const consumptionIndexState = atom({
  key: "consumptionIndex",
  default: [
    {
      id: "0",
      category: "식비",
      consumption: "30,000",
    },
  ],
});
