import { authSaga } from './model/sagas';
import { actions, name, reducer } from './model/slice';
import { selectors } from './selectors';

export { SigninForm } from './ui/signin-form';

export const AuthFeature = {
  sagas: {
    init: authSaga,
  },
  reducer: { [name]: reducer },
  actions,
  selectors,
};
