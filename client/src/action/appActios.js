export const SET_APP_IS_LOADING = "app/setIsLoading";

export function setIsLoading(value) {
  return {
    type: SET_APP_IS_LOADING,
    payload: value,
  };
}
