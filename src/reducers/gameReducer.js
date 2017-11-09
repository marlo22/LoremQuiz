import { Map } from "immutable";

import {
  ACCEPT_ANSWER,
  ADD_TO_USED_QUESTIONS,
  CHANGE_CATEGORIES,
  CHANGE_CHEAT_ACTIVE,
  CHANGE_PLAYER_NAME,
  CHANGE_SUBMIT_SCORES,
  CHANGE_BUGS_REPORTING,
  CHANGE_SUBMIT_SCORE_STATUS,
  CORRECT_ANSWER,
  GAME_OVER,
  GET_QUESTION,
  INCORRECT_ANSWER,
  LOAD_CATEGORIES,
  LOCK_ANSWERS,
  NEXT_LEVEL,
  NEXT_QUESTION,
  NOT_ENOUGH_MONEY,
  RESET_GAME,
  SELECT_ANSWER,
  SUBMIT_SCORE,
  TIME_IS_UP,
  TIPS_EXTRA_CHANCE,
  TIPS_SWAP_QUESTION,
  TIPS_ELLIMINATE_ANSWER,
  TIPS_FREEZE_TIME,
  RESET_ROUND_STATE,
  UPDATE_TIMER
} from "../consts/actionConsts.js";

import {
  LIFES_NUMBER,
  EXTRA_CHANCE_COST,
  SWAP_QUESTION_COST,
  ELLIMINATE_1_ANSWER_COST,
  ELLIMINATE_2_ANSWERS_COST,
  FREEZE_TIME_COST,
  LEVEL_1_ANSWER_TIME,
  LEVEL_2_ANSWER_TIME,
  LEVEL_3_ANSWER_TIME,
  LEVEL_4_ANSWER_TIME,
  LEVEL_5_ANSWER_TIME,
  LEVEL_1_CORRECT,
  LEVEL_2_CORRECT,
  LEVEL_3_CORRECT,
  LEVEL_4_CORRECT,
  LEVEL_5_CORRECT
} from "../consts/rulesConsts.js";

const initialState = Map({
  playerName: "Gracz",
  categories: null,
  cash: 0,
  usedQuestions: Map({
    // "sport": [1,2,40]
  }),
  tips: Map({
    extraChance: Map({
      used: false,
      cost: EXTRA_CHANCE_COST,
    }),
    swapQuestion: Map({
      used: false,
      cost: SWAP_QUESTION_COST,
    }),
    elliminate1answer: Map({
      used: false,
      cost: ELLIMINATE_1_ANSWER_COST,
    }),
    elliminate2answers: Map({
      used: false,
      cost: ELLIMINATE_2_ANSWERS_COST,
    }),
    freezeTime: Map({
      used: false,
      cost: FREEZE_TIME_COST,
    })
  }),
  notEnoughMoney: false,
  levelNumber: 1,
  questionNumber: 1,
  questionSet: Map({
    question: "",
    answers: ["", "", "", ""],
    correct: ""
  }),
  selectedAnswer: null,
  lockedAnswers: false,
  highlightCorrect: false,
  answerAccepted: false,
  frozenTime: false,
  timeIsUp: false,
  gameEnd: false,
  lifes: LIFES_NUMBER,
  timer: LEVEL_1_ANSWER_TIME,
  stats: Map({
    correct: 0,
    incorrect: 0,
    tipsCounter: 0
  }),
  cheatActive: false,
  submitScores: false,
  bugsReporting: true,
  /*
   -1 - error
    0 - null
    1 - sending
    2 - sent
  */
  sendScoreStatus: 0
})

const gameReducer = (state = initialState, action) => {

  function setQuestionTimerValue(level) {
    switch(level) {
      case 1:
        return LEVEL_1_ANSWER_TIME;
      case 2:
        return LEVEL_2_ANSWER_TIME;
      case 3:
        return LEVEL_3_ANSWER_TIME;
      case 4:
        return LEVEL_4_ANSWER_TIME;
      case 5:
        return LEVEL_5_ANSWER_TIME;
      default:
        return LEVEL_1_ANSWER_TIME;
    }
  }

  function correctAnswerNumberPoints(level) {
    switch(level) {
      case 1:
        return LEVEL_1_CORRECT;
      case 2:
        return LEVEL_2_CORRECT;
      case 3:
        return LEVEL_3_CORRECT;
      case 4:
        return LEVEL_4_CORRECT;
      case 5:
        return LEVEL_5_CORRECT;
      default:
        return LEVEL_1_CORRECT;
    }
  }

  switch(action.type) {

    case GET_QUESTION:
      return state.set("questionSet", Map({...action.question}));

    case ADD_TO_USED_QUESTIONS:
      return state.set("usedQuestions", Map({...action.usedQuestions}));

    case LOAD_CATEGORIES:
      return state.merge({
        categories: Map({...action.categories}),
        availableCategories: [...action.availableCategories]
      })

    case SELECT_ANSWER:
      return state.set("selectedAnswer", action.answer);

    case LOCK_ANSWERS:
      return state.set("lockedAnswers", true);

    case ACCEPT_ANSWER:
      return state.merge({
        answerAccepted: true,
        frozenTime: true
      })

    case RESET_ROUND_STATE:
      return state.merge({
        answerAccepted: false,
        frozenTime: false,
        lockedAnswers: false,
        highlightCorrect: false,
        selectedAnswer: null,
        timeIsUp: false,
        timer: setQuestionTimerValue(state.get("levelNumber"))
      })

    /*
      1. Increase level number
      2. Reset tips status
    */
    case NEXT_LEVEL:
      return state.merge({
        levelNumber: action.levelNumber,
        tips: Map({
          extraChance: Map({
            used: false,
            cost: EXTRA_CHANCE_COST,
          }),
          swapQuestion: Map({
            used: false,
            cost: SWAP_QUESTION_COST,
          }),
          elliminate1answer: Map({
            used: false,
            cost: ELLIMINATE_1_ANSWER_COST,
          }),
          elliminate2answers: Map({
            used: false,
            cost: ELLIMINATE_2_ANSWERS_COST,
          }),
          freezeTime: Map({
            used: false,
            cost: FREEZE_TIME_COST,
          })
        }),
        usedQuestions: Map({}),
      })

    case NEXT_QUESTION:
      return state.set("questionNumber", action.questionNumber)

    case TIME_IS_UP:
      return state.set("timeIsUp", true);

    case UPDATE_TIMER:
      return state.set("timer", action.value);

    /*
      1. Increase cash account
      2. Tell the component to highlight correct answer
      3. Increase number of correct answers in stats
    */
    case CORRECT_ANSWER:
      return state.merge({
        cash: state.get("cash") + correctAnswerNumberPoints(state.get("levelNumber")),
        highlightCorrect: true,
        stats: {
          correct: state.get("stats").get("correct") + 1,
          incorrect: state.get("stats").get("incorrect"),
          tipsCounter: state.get("stats").get("tipsCounter")
        }
      });

    /*
      1. Tell the component to highlight correct answer
      2. Decrease number of lifes
      3. Increase number of incorrect answers in stats
    */
    case INCORRECT_ANSWER:
      return state.merge({
        highlightCorrect: true,
        lifes: state.get("lifes") - 1,
        stats: {
          correct: state.get("stats").get("correct"),
          incorrect: state.get("stats").get("incorrect") + 1,
          tipsCounter: state.get("stats").get("tipsCounter")
        }
      });

    case NOT_ENOUGH_MONEY:
      return state.set("notEnoughMoney", action.status);

    case TIPS_EXTRA_CHANCE:
      let extraChanceCost = state.get("tips").get("extraChance").get("cost");

      return state.merge({
        cash: state.get("cash") - extraChanceCost,
        lifes: state.get("lifes") + 1,
        tips: state.get("tips").merge({
          extraChance: Map({
            used: true,
            cost: extraChanceCost
          })
        }),
        stats: Map({
          correct: state.get("stats").get("correct"),
          incorrect: state.get("stats").get("incorrect"),
          tipsCounter: state.get("stats").get("tipsCounter") + 1
        })
      })

    case TIPS_SWAP_QUESTION:
      let swapQuestionCost = state.get("tips").get("swapQuestion").get("cost");

      return state.merge({
        cash: state.get("cash") - swapQuestionCost,
        tips: state.get("tips").merge({
          swapQuestion: Map({
            used: true,
            cost: swapQuestionCost
          })
        }),
        stats: Map({
          correct: state.get("stats").get("correct"),
          incorrect: state.get("stats").get("incorrect"),
          tipsCounter: state.get("stats").get("tipsCounter") + 1
        })
      })

    case TIPS_ELLIMINATE_ANSWER:
      function drawIndex(answersLength, correctIndex, amount) {
        let indexArr = [];
        let i;

        for(i = 0; i < answersLength; i++) {
          if(i !== correctIndex) {
            indexArr.push(i);
          }
        }

        let randomIndex = Math.floor(Math.random() * indexArr.length);

        switch(amount) {
          case 1:
            return indexArr[randomIndex];

          case 2:
            //Array copy
            let indexArr2 = indexArr.slice();

            indexArr2.splice(randomIndex, 1);
            let randomIndex2 = Math.floor(Math.random() * indexArr2.length);

            return [indexArr[randomIndex], indexArr2[randomIndex2]];

          default:
            return indexArr[randomIndex];
        }
      }

      let amount = action.amount;
      let elliminate1AnswerCost = state.get("tips").get("elliminate1answer").get("cost");
      let elliminate2AnswersCost = state.get("tips").get("elliminate2answers").get("cost");

      let questionSet = state.get("questionSet");
      let answers = questionSet.get("answers").slice();
      let answersLength = answers.length;
      let correctIndex = answers.indexOf(questionSet.get("correct"));
      let randomIndex = drawIndex(answersLength, correctIndex, amount);

      switch(amount) {
        case 1:
          answers[randomIndex] = "";

        case 2:
          answers[randomIndex[0]] = "";
          answers[randomIndex[1]] = "";

        default:
          answers[randomIndex] = "";
      }

      return state.merge({
        cash: action.amount === 2? state.get("cash") - elliminate2AnswersCost : state.get("cash") - elliminate1AnswerCost,
        questionSet: Map({
          question: questionSet.get("question"),
          answers,
          correct: questionSet.get("correct")
        }),
        tips: state.get("tips").merge({
          elliminate1answer: Map({
            used: true,
            cost: elliminate1AnswerCost
          }),
          elliminate2answers: Map({
            used: true,
            cost: elliminate2AnswersCost
          })
        }),
        stats: Map({
          correct: state.get("stats").get("correct"),
          incorrect: state.get("stats").get("incorrect"),
          tipsCounter: state.get("stats").get("tipsCounter") + 1
        })
      })

    case TIPS_FREEZE_TIME:
      let freezeTimeCost = state.get("tips").get("freezeTime").get("cost");

      return state.merge({
        frozenTime: true,
        cash: state.get("cash") - freezeTimeCost,
        tips: state.get("tips").merge({
          freezeTime: Map({
            used: true,
            cost: freezeTimeCost
          })
        }),
        stats: Map({
          correct: state.get("stats").get("correct"),
          incorrect: state.get("stats").get("incorrect"),
          tipsCounter: state.get("stats").get("tipsCounter") + 1
        })
      })

    case GAME_OVER:
      return state.merge({
        frozenTime: true,
        gameEnd: true,
      });

    case CHANGE_PLAYER_NAME:
      return state.set("playerName", action.name);

    case CHANGE_CATEGORIES:
      return state.set("categories", action.categories);

    case CHANGE_CHEAT_ACTIVE:
      return state.set("cheatActive", action.value);

    case CHANGE_SUBMIT_SCORES:
      return state.set("submitScores", action.value);

    case CHANGE_BUGS_REPORTING:
      return state.set("bugsReporting", action.value);

    case CHANGE_SUBMIT_SCORE_STATUS:
      return state.set("sendScoreStatus", action.code)

    case RESET_GAME:
      let tipsObj = {},
          initialTips = initialState.get("tips");

      initialTips.mapKeys((key, val) => {
        tipsObj[key] = {};

        initialTips.get(key).mapKeys((key2, val2) => {
          tipsObj[key][key2] = val2;
        })
      });

      let initState = {
        cash: initialState.get("cash"),
        usedQuestions: initialState.get("usedQuestions").toObject(),
        tips: {...tipsObj},
        notEnoughMoney: initialState.get("notEnoughMoney"),
        levelNumber: initialState.get("levelNumber"),
        questionNumber: initialState.get("questionNumber"),
        questionSet: Map({
          question: "",
          answers: ["", "", "", ""],
          correct: ""
        }),
        selectedAnswer: initialState.get("selectedAnswer"),
        lockedAnswers: initialState.get("lockedAnswers"),
        highlightCorrect: initialState.get("highlightCorrect"),
        answersAccepted: initialState.get("answersAccepted"),
        timeIsUp: initialState.get("timeIsUp"),
        gameEnd: initialState.get("gameEnd"),
        lifes: initialState.get("lifes"),
        timer: initialState.get("timer"),
        stats: initialState.get("stats").toObject(),
      };

      return state.merge({
        ...initState
      });

    case SUBMIT_SCORE:
      return state;

    default:
      return state;

  }
}

export default gameReducer;
