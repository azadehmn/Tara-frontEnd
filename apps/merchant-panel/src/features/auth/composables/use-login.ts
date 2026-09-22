import { ref } from 'vue';
import { ApiError } from '@shared/api/errors/api-error';
import { saveUserId, clearAuthStorage } from '@shared/auth/auth-storage';
import { saveTokens, setPendingTokens } from '@shared/auth/tokens';
import { useAppLoading } from '@shared/lib';
import { loginBackoffice } from '../api/login.api';
import { clearLoginSession, loginSession } from '../model/login-session';
import type { LoginBackofficeResponse, LoginPayload } from '../model/login';
import { useAuthoritiesStore } from '../store/authorities.store';
import { useUserStore } from '../store/user.store';

export function useLogin() {
  const pending = ref(false);
  const error = ref<ApiError | null>(null);
  const login = ref<LoginBackofficeResponse | null>(null);
  const authoritiesStore = useAuthoritiesStore();
  const userStore = useUserStore();
  const { show: showAppLoading, hide: hideAppLoading } = useAppLoading();

  async function submit(payload: LoginPayload): Promise<LoginBackofficeResponse | null> {
    pending.value = true;
    error.value = null;
    login.value = null;
    clearAuthStorage();
    clearLoginSession();

    try {
      const result = await loginBackoffice({
        ...payload,
        principal: payload.principal.trim(),
      });

      login.value = result;
      loginSession.login = result;
      saveUserId(result.userId);

      if (result.twofactorActive) {
        setPendingTokens(result.accessCode, result.refresh);
        return result;
      }

      saveTokens(result.accessCode, result.refresh);
      showAppLoading();
      try {
        await Promise.all([authoritiesStore.fetch(), userStore.fetch()]);
      } catch (cause) {
        hideAppLoading();
        throw cause;
      }

      return result;
    } catch (cause) {
      error.value = cause instanceof ApiError ? cause : new ApiError(String(cause));
      return null;
    } finally {
      pending.value = false;
    }
  }

  return { pending, error, login, submit };
}
