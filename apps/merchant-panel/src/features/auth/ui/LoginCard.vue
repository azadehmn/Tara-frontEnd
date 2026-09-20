<template>
  <AuthShell>
    <img :src="taraLogo" :alt="t('auth.login.logoAlt')" class="mb-xl h-8 w-auto self-start" />

    <h1 class="text-heading-lg text-text dark:text-text-dark">
      {{ t('auth.login.title') }}
    </h1>
    <p class="mt-2xs text-body-sm text-text-soft dark:text-text-dark-soft">
      {{ t('auth.login.description') }}
    </p>

    <form class="mt-xl flex flex-col gap-lg" @submit.prevent="handleSubmit">
      <TrTextField
        ref="principalField"
        v-model="form.principal"
        name="username"
        autocomplete="username"
        :placeholder="t('auth.login.username')"
        @autofill="principalAutofilled = true"
      />
      <TrTextField
        ref="passwordField"
        v-model="form.password"
        name="password"
        :type="passwordType"
        autocomplete="current-password"
        :placeholder="t('auth.login.password')"
        @autofill="passwordAutofilled = true"
        :action-aria-label="
          isPasswordVisible ? t('auth.login.hidePassword') : t('auth.login.showPassword')
        "
        @action="isPasswordVisible = !isPasswordVisible"
      >
        <template #after>
          <svg v-if="isPasswordVisible" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 3l18 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            <path
              d="M10.5 10.7A3 3 0 0 0 13.3 13.5M9.9 5.2A10.8 10.8 0 0 1 12 5c6 0 10 7 10 7a18.4 18.4 0 0 1-4.1 4.7M6.1 6.4A18.5 18.5 0 0 0 2 12s4 7 10 7c1.4 0 2.7-.3 3.9-.8"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </template>
      </TrTextField>

      <p
        v-if="error"
        class="m-0 text-body-sm text-text-danger dark:text-text-dark-danger"
        role="alert"
      >
        {{ error.message }}
      </p>
      <TrButton
        class="w-full"
        html-type="submit"
        size="large"
        :loading="pending"
        :disabled="!canSubmit"
        :text="t('auth.login.submit')"
      />
    </form>
  </AuthShell>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { TrButton, TrTextField } from '@tara/ui';
import taraLogo from '@assets/images/logo-persion.svg';
import { useLogin } from '../composables/use-login';
import type { LoginPayload } from '../model/login';
import AuthShell from './AuthShell.vue';

type TextFieldExpose = {
  nativeValue: () => string;
};

const { t } = useI18n();
const router = useRouter();
const { pending, error, submit } = useLogin();

const form = reactive<LoginPayload>({
  principal: '',
  password: '',
});
const principalField = ref<TextFieldExpose | null>(null);
const passwordField = ref<TextFieldExpose | null>(null);
const principalAutofilled = ref(false);
const passwordAutofilled = ref(false);
const isPasswordVisible = ref(false);
const passwordType = computed(() => (isPasswordVisible.value ? 'text' : 'password'));
const canSubmit = computed(
  () =>
    (Boolean(form.principal.trim()) || principalAutofilled.value) &&
    (Boolean(form.password.trim()) || passwordAutofilled.value),
);

function readField(field: TextFieldExpose | null, fallback: string) {
  return field?.nativeValue().trim() || fallback.trim();
}

async function handleSubmit() {
  const principal = readField(principalField.value, form.principal);
  const password = readField(passwordField.value, form.password);
  if (!principal || !password) return;

  form.principal = principal;
  form.password = password;

  const result = await submit(form);
  if (!result) return;

  await router.push(result.twofactorActive ? { name: 'otp' } : { name: 'dashboard' });
}
</script>
