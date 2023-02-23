export const LoginState = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  RESET_PASSWORD: 'RESET_PASSWORD',
  MOBILE: 'MOBILE',
  QR_CODE: 'QR_CODE'
}
const currentState = ref(LoginStateEnum.LOGIN)

export function useLoginState () {
  function setLoginState (state) {
    currentState.value = state
  }

  const getLoginState = computed(() => currentState.value)

  function handleBackLogin () {
    setLoginState(LoginStateEnum.LOGIN)
  }

  return { setLoginState, getLoginState, handleBackLogin }
}
