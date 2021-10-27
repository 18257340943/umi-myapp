const mockApi = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          name: 'renzejun',
          age: 18,
        },
      });
    }, 3000);
  });

const mockApi2 = (age) => {
  console.log(age, 'age');
  return Promise.resolve({ code: 200, data: age });
};

const GlobalModel = {
  namespace: 'global',
  state: {
    inputVal: '',
    count: 0,
    clientWidth: 0,
    data: {},
  },
  effects: {
    *getData(_, { call, put, select }) {
      const { data } = yield call(mockApi);
      const { age } = data;
      const { data: data2 } = yield call(mockApi2, age);
      console.log(data, data2, 'data2');
      yield put({
        type: 'initData',
        payload: data,
        stateName: 'data',
      });
    },
    *addCount({ payload = 1 }, { call, put, select }) {
      const { count } = yield select((state) => state.global);
      yield put({
        type: 'initData',
        payload: count + payload,
        stateName: 'count',
      });
    },
    *removeCount({ payload = 1 }, { call, put, select }) {
      const { count } = yield select((state) => state.global);
      yield put({
        type: 'initData',
        payload: count - payload,
        stateName: 'count',
      });
    },
    *updateVal({ payload }, { put }) {
      yield put({
        type: 'initData',
        payload: payload,
        stateName: 'inputVal',
      });
    },
    *resetCount() {},
  },
  reducers: {
    initData(state, action) {
      return {
        ...state,
        [action.stateName]: action.payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // 这里的方法名可以随便命名，当监听有变化的时候就会依次执行这的变化,这里的dispatch和history和之前说的是一样的
      window.onresize = () => {
        console.log(document.body.clientWidth, 'document.body.clientWidth');
        //这里表示的当浏览器的页面的大小变化时就会触发里面的dispatch方法，这里的save就是reducers中的方法名
        // dispatch({ type: 'initData' });
      };
    },
  },
};
export default GlobalModel;
