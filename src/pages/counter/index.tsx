import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { increase, decrease } from '@redux/actions';
import { RootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';

const counter: React.FC = (): ReactElement => {
  const dispatch = useAppDispatch();
  const count = useSelector((state: RootState) => state.counter.count);

  return (
    <div>
      <div>
        <h2>Counter</h2>
        <button type="button" onClick={() => dispatch(increase())}>
          +
        </button>
        <span>{count}</span>
        <button type="button" onClick={() => dispatch(decrease())}>
          -
        </button>
      </div>
      <a href="https://react-redux.js.org/" target="_blank">
        Go To Documentation
      </a>
    </div>
  );
};

export default counter;
