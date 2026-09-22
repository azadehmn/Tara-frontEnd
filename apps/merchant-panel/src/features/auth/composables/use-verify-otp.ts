import { ref } from 'vue';
import { ApiError } from '@shared/api/errors/api-error';
import { saveTokens } from '@shared/auth/tokens';
import { useAppLoading } from '@shared/lib';
import { verifyLogin } from '../api/login.api';
import { loginSession } from '../model/login-session';
import { useAuthoritiesStore } from '../store/authorities.store';
import { useUserStore } from '../store/user.store';

export function useVerifyOtp() {
  const pending = ref(false);
  const error = ref<ApiError | null>(null);
  const authoritiesStore = useAuthoritiesStore();
  const userStore = useUserStore();
  const { show: showAppLoading, hide: hideAppLoading } = useAppLoading();

  async function submit(otp: string): Promise<boolean> {
    pending.value = true;
    error.value = null;

    try {
      const result = await verifyLogin({ token: otp });
      saveTokens(result.accessToken, result.refreshToken);

      if (loginSession.login) loginSession.login.twofactorActive = false;

      showAppLoading();
      try {
        await Promise.all([authoritiesStore.fetch(), userStore.fetch()]);
      } catch (cause) {
        hideAppLoading();
        throw cause;
      }

      return true;
    } catch (cause) {
      error.value = cause instanceof ApiError ? cause : new ApiError(String(cause));
      return false;
    } finally {
      pending.value = false;
    }
  }

  return { pending, error, submit };
}
