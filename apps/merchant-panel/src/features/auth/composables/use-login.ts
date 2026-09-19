import { ref } from 'vue';
import { ApiError } from '@shared/api/errors/api-error';
import { clearTokens, saveTokens } from '@shared/auth/token-storage';
import { getUserAuthorities, loginBackoffice } from '../api/login.api';
import { loginSession } from '../model/login-session';
import type { LoginBackofficeResponse } from '../model/login';

export function useLogin() {
  const pending = ref(false);
  const error = ref<ApiError | null>(null);
  const login = ref<LoginBackofficeResponse | null>(null);
  const authorities = ref<unknown>(null);

  async function submit(principal: string, password: string): Promise<boolean> {
    pending.value = true;
    error.value = null;
    login.value = null;
    authorities.value = null;

    try {
      clearTokens();
      const result = await loginBackoffice({
        principal: principal.trim(),
        password,
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
