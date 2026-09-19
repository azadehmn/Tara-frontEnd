import { ref } from 'vue';
import { ApiError } from '@shared/api/errors/api-error';
import { clearTokens, saveTokens } from '@shared/auth/token-storage';
import { getUserAuthorities, loginBackoffice } from '../api/login.api';
import type { LoginBackofficeResponse, LoginPayload } from '../model/login';
import { loginSession } from '../model/login-session';

export function useLogin() {
  const pending = ref(false);
  const error = ref<ApiError | null>(null);
  const login = ref<LoginBackofficeResponse | null>(null);
  const authorities = ref<unknown>(null);

  async function submit(payload: LoginPayload): Promise<boolean> {
    pending.value = true;
    error.value = null;
    login.value = null;
    authorities.value = null;

    try {
      clearTokens();
      const result = await loginBackoffice({
        ...payload,
        principal: payload.principal.trim(),
      });

      saveTokens(result.accessCode, result.refresh);

      const grants = await getUserAuthorities(result.userId);

      login.value = result;
      authorities.value = grants;
      loginSession.login = result;
      loginSession.authorities = grants;

      return true;
    } catch (cause) {
      error.value = cause instanceof ApiError ? cause : new ApiError(String(cause));
      return false;
    } finally {
      pending.value = false;
    }
  }

  return { pending, error, login, authorities, submit };
}
