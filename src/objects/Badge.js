export const TIER_1_MAX_SCORE = 50;
export const TIER_2_MAX_SCORE = 200;
export const TIER_3_MAX_SCORE = 500;

export const TIER_1_NAME = "New Lettuce";
export const TIER_2_NAME = "Common carrot";
export const TIER_3_NAME = "Mighty burger";
export const TIER_4_NAME = "Fearsome chicken";

export let score = 0;
export let name = "";

export const setBadge = newScore => {
  score = newScore;
  if (score <= TIER_1_MAX_SCORE) {
    name = TIER_1_NAME;
  } else if (score <= TIER_2_MAX_SCORE) {
    name = TIER_2_NAME;
  } else if (score <= TIER_3_MAX_SCORE) {
    name = TIER_3_NAME;
  } else {
    name = TIER_4_NAME;
  }
  return name;
};
