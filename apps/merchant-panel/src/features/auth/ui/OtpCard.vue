<template>
  <AuthShell>
    <img :src="taraLogo" :alt="t('auth.login.logoAlt')" class="mb-xl h-8 w-auto self-start" />

    <h1 class="text-heading-lg text-text dark:text-text-dark">
      {{ t('auth.otp.title') }}
    </h1>
    <p class="mt-2xs text-body-sm text-text-soft dark:text-text-dark-soft">
      {{ t('auth.otp.description', { userId }) }}
    </p>

    <form class="mt-xl flex flex-col gap-lg" @submit.prevent="handleSubmit">
      <TrOtpField
        v-model="otp"
        name="otp"
        auto-focus
        dir="ltr"
        :code-length="6"
        :disabled="pending"
        :aria-label="t('auth.otp.title')"
        :helper="otpHelper"
        @complete="handleComplete"
      />

      <TrButton
        class="w-full"
        html-type="submit"
        size="large"
        :loading="pending"
        :disabled="otp.length < 6"
        :text="t('auth.otp.submit')"
      />

      <button
        type="button"
        class="inline-flex items-center gap-2xs self-start text-body-sm text-primary disabled:cursor-not-allowed disabled:opacity-50 dark:text-primary-dark"
        :disabled="pending"
        @click="editNumber"
      >
        <EditIcon class="size-4" />
        {{ t('auth.otp.editNumber') }}
      </button>
    </form>
  </AuthShell>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { TrButton, TrOtpField } from '@tara/ui';
import EditIcon from '@tara/ui/icons/EditIcon.vue';
import taraLogo from '@assets/images/logo-persion.svg';
import { clearTokens } from '@shared/auth/token-storage';
import { useVerifyOtp } from '../composables/use-verify-otp';
import { clearLoginSession, loginSession } from '../model/login-session';
import AuthShell from './AuthShell.vue';

const { t } = useI18n();
const router = useRouter();
const { pending, error, submit } = useVerifyOtp();

const otp = ref('');
const userId = computed(() => loginSession.login?.userId ?? '');
const otpHelper = computed(() =>
  error.value ? { type: 'error' as const, message: error.value.message } : undefined,
);

async function handleComplete(code: string) {
  otp.value = code;
  await handleSubmit();
}

async function handleSubmit() {
  if (otp.value.length < 6 || pending.value) return;

  const ok = await submit(otp.value);
  if (ok) await router.push({ name: 'dashboard' });
}

function editNumber() {
  clearTokens();
  clearLoginSession();
  void router.push({ name: 'login' });
}
</script>
