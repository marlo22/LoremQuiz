//Game Rules consts
export const QUESTION_AT_LEVEL_NUMBER = 5;
export const LEVELS_NUMBER = 5;
export const MAX_QUESTIONS_STEPS = QUESTION_AT_LEVEL_NUMBER * LEVELS_NUMBER;
export const LIFES_NUMBER = 3;

//Points
export const LEVEL_1_CORRECT = 10;
export const LEVEL_2_CORRECT = 20;
export const LEVEL_3_CORRECT = 30;
export const LEVEL_4_CORRECT = 40;
export const LEVEL_5_CORRECT = 50;
export const TOTAL_POINTS = (LEVEL_1_CORRECT * QUESTION_AT_LEVEL_NUMBER) + (LEVEL_2_CORRECT * QUESTION_AT_LEVEL_NUMBER) + (LEVEL_3_CORRECT * QUESTION_AT_LEVEL_NUMBER) + (LEVEL_4_CORRECT * QUESTION_AT_LEVEL_NUMBER) + (LEVEL_5_CORRECT * QUESTION_AT_LEVEL_NUMBER);

//Time to answer
export const LEVEL_1_ANSWER_TIME = 20;
export const LEVEL_2_ANSWER_TIME = 30;
export const LEVEL_3_ANSWER_TIME = 60;
export const LEVEL_4_ANSWER_TIME = 60;
export const LEVEL_5_ANSWER_TIME = -1;

//Tips const
export const EXTRA_CHANCE_COST = 50;
export const SWAP_QUESTION_COST = 25;
export const ELLIMINATE_1_ANSWER_COST = 5;
export const ELLIMINATE_2_ANSWERS_COST = 10;
export const FREEZE_TIME_COST = 5;
