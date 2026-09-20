import { ref } from 'vue';
import { ApiError } from '@shared/api/errors/api-error';
import { clearTokens, saveTokens, setPendingTokens } from '@shared/auth/token-storage';
import { useAppLoading } from '@shared/lib';
import { getUserAuthorities, loginBackoffice } from '../api/login.api';
import type { LoginBackofficeResponse, LoginPayload } from '../model/login';
import type { UserAuthoritiesResponse } from '../model/authority';
import { clearLoginSession, loginSession } from '../model/login-session';

export function useLogin() {
  const pending = ref(false);
  const error = ref<ApiError | null>(null);
  const login = ref<LoginBackofficeResponse | null>(null);
  const authorities = ref<UserAuthoritiesResponse | null>(null);
  const { show: showAppLoading, hide: hideAppLoading } = useAppLoading();

  async function submit(payload: LoginPayload): Promise<LoginBackofficeResponse | null> {
    pending.value = true;
    error.value = null;
    login.value = null;
    authorities.value = null;
    clearTokens();
    clearLoginSession();
    let overlayShown = false;

    try {
      const result = await loginBackoffice({
        ...payload,
        principal: payload.principal.trim(),
      });

      login.value = result;
      loginSession.login = result;
      loginSession.authorities = null;

      if (result.twofactorActive) {
        setPendingTokens(result.accessCode, result.refresh);
        return result;
      }

      saveTokens(result.accessCode, result.refresh);
      overlayShown = true;
      showAppLoading();
      const grants = await getUserAuthorities(result.userId);
      authorities.value = grants;
      loginSession.authorities = grants;

      return result;
    } catch (cause) {
      if (overlayShown) hideAppLoading();
      error.value = cause instanceof ApiError ? cause : new ApiError(String(cause));
      return null;
    } finally {
      pending.value = false;
    }
  }

  return { pending, error, login, authorities, submit };
}
