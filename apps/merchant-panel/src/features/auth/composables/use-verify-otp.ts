import { ref } from 'vue';
import { ApiError } from '@shared/api/errors/api-error';
import { saveTokens } from '@shared/auth/token-storage';
import { useAppLoading } from '@shared/lib';
import { getUserAuthorities, verifyLogin } from '../api/login.api';
import { loginSession } from '../model/login-session';

export function useVerifyOtp() {
  const pending = ref(false);
  const error = ref<ApiError | null>(null);
  const { show: showAppLoading, hide: hideAppLoading } = useAppLoading();

  async function submit(otp: string): Promise<boolean> {
    pending.value = true;
    error.value = null;
    let overlayShown = false;

    try {
      const result = await verifyLogin({ token: otp });
      overlayShown = true;
      showAppLoading();
      saveTokens(result.accessToken, result.refreshToken);

      if (loginSession.login) loginSession.login.twofactorActive = false;

      const userId = loginSession.login?.userId;
      if (userId != null) {
        const grants = await getUserAuthorities(userId);
        loginSession.authorities = grants;
      }

      return true;
    } catch (cause) {
      if (overlayShown) hideAppLoading();
      error.value = cause instanceof ApiError ? cause : new ApiError(String(cause));
      return false;
    } finally {
      pending.value = false;
    }
  }

  return { pending, error, submit };
}
