export const initialState = {
  userValue: {
    userName: '',
    password: '',
    email: '',
    birthday: '',
    phoneNumber: '',
  },
  message: {
    userName: '',
    password: '',
    passwordCheck: '',
    email: '',
    birthday: '',
    phoneNumber: '',
  },
  correct: {
    userName: false,
    password: false,
    passwordCheck: false,
    email: false,
    birthday: false,
    phoneNumber: false,
  },
};

// 회원 가입쪽에서 여러 상태값을 중앙 집중화 해서 처리할 리듀서 함수.
// state: 최신의 상태값이 전달.
// action.type: 어떠한 상태값을 변경하는지에 대한 값.
// action.key: 입력창이 어디인지.
// action.value: 입력값이 무엇인지.
export const userInfoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_VALUE':
      return {
        ...state,
        userValue: {
          ...state.userValue,
          [action.key]: action.value,
        },
      };
    case 'SET_MESSAGE':
      return {
        ...state,
        message: {
          ...state.message,
          [action.key]: action.value,
        },
      };
    case 'SET_CORRECT':
      return {
        ...state,
        correct: {
          ...state.correct,
          [action.key]: action.value,
        },
      };
    default:
      return state;
  }
};
