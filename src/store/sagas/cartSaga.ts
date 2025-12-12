import { takeEvery, put, all } from 'redux-saga/effects';
import { api } from '../api';

// Fetch cart after item is added
function* fetchCartAfterAdd() {
  try {
    // Use api.endpoints.getCart.initiate to trigger a refetch
    yield put(
      api.endpoints.getCart.initiate(undefined, { forceRefetch: true }),
    );
  } catch (error) {
    console.error('Error invalidating cart:', error);
  }
}

// Watch for successful addToCart mutations
function* watchAddToCart() {
  yield takeEvery(api.endpoints.addToCart.matchFulfilled, fetchCartAfterAdd);
}

export default function* cartSaga() {
  yield all([watchAddToCart()]);
}
