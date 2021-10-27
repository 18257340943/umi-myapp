import { useEffect } from 'react';
import styles from './index.less';
import { Button, Input, Spin } from 'antd';
import { connect, Loading, useDispatch, useSelector } from 'umi';

function IndexPage(props: any) {
  const dispatch = useDispatch();
  const {
    data: { name },
    count,
    inputVal,
  } = useSelector((state: any) => {
    console.log(state, 'state');
    return state.global;
  });
  const loading = useSelector(
    (state: any) => state.loading.effects['global/getData'],
  );

  useEffect(() => {
    dispatch({
      type: 'global/getData',
    });
  }, []);
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Spin spinning={loading}>
        <h1>{count}</h1>
      </Spin>
      <h1>{name}</h1>
      <Button onClick={() => dispatch({ type: 'global/addCount' })}>+</Button>
      <Button onClick={() => dispatch({ type: 'global/removeCount' })}>
        -
      </Button>
      <Input
        value={inputVal}
        onChange={(e) =>
          dispatch({
            type: 'global/updateVal',
            payload: e.target.value,
          })
        }
      />
    </div>
  );
}

export default IndexPage;

// export default connect(
//   ({
//     global,
//     loading,
//     index,
//   }: {
//     index: any;
//     global: any;
//     loading: Loading;
//   }) => {
//     return {
//       count: global.count,
//       name: global.data.name,
//       loading: loading.models.index,
//     };
//   },
// )(IndexPage);
