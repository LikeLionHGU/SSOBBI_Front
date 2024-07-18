import { atom } from "recoil";

export const priceInputState = atom({
  key: "priceInput",
  default: false,
});

export const UserTokenState = atom({
  key: "userToken",
  default: { isLoggedIn: false },
});
