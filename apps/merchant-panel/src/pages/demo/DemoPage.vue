<script setup lang="ts">
import { ref } from 'vue';
import {
  TrButton,
  TrLabel,
  TrSegmentedControl,
  TrOtpField,
  TrStatus,
  TrTextField,
  type TrButtonSize,
  type TrButtonVariant,
  type TrLabelType,
  type TrSegmentedControlOption,
  type TrStatusType,
} from '@tara/ui';
import TrCircleCheckIcon from '@tara/ui/icons/CircleCheckIcon.vue';
import TrCircleSlashIcon from '@tara/ui/icons/CircleSlashIcon.vue';
import TrDetailsIcon from '@tara/ui/icons/DetailsIcon.vue';

const { t } = useI18n();

const variants: TrButtonVariant[] = ['primary', 'secondary', 'outlined'];
const sizes: TrButtonSize[] = ['small', 'medium', 'large'];

const statusTypes: TrStatusType[] = [
  'neutral',
  'informative',
  'warning',
  'negative',
  'positive',
];

const labelTypes: TrLabelType[] = [
  'neutral',
  'informative',
  'warning',
  'negative',
  'positive',
  'primary',
  'outlined',
];

const segmentValue = ref('monthly');
const segmentOptions: TrSegmentedControlOption[] = [
  { value: 'monthly', label: 'ماهانه' },
  { value: 'weekly', label: 'هفتگی' },
];

const statusIcons: Record<TrStatusType, typeof TrCircleCheckIcon> = {
  neutral: TrDetailsIcon,
  informative: TrDetailsIcon,
  warning: TrDetailsIcon,
  negative: TrCircleSlashIcon,
  positive: TrCircleCheckIcon,
};

const emptyValue = ref('');
const filledValue = ref('قرارداد سازمانی');
const searchValue = ref('');
const errorValue = ref('');
const successValue = ref('قرارداد سازمانی');
const numberValue = ref('09120000000');
const amountValue = ref('1500000');
const limitedValue = ref('تارا');
const buttonValue = ref('');
const ltrValue = ref('IR120540000000000000000000');
const iconValue = ref('');
const actionCount = ref(0);
const otpValue = ref('');
const otpShort = ref('');
const otpError = ref('');
const otpSuccess = ref('123456');
const otpComplete = ref('');
</script>

<template>
  <div>
    <h1 class="m-2xs text-heading-lg">{{ t('layout.nav.demo') }}</h1>

    <p class="mb-6 text-sm opacity-70">TrTextField demo</p>
    <section class="mb-12 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
      <div class="flex flex-col gap-2">
        <span class="text-xs opacity-60 mb-md">default + floating label</span>
        <TrTextField v-model="emptyValue" name="title" placeholder="عنوان قرارداد" />
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-xs opacity-60 mb-md">filled</span>
        <TrTextField v-model="filledValue" name="filled" placeholder="عنوان قرارداد" />
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-xs opacity-60 mb-md">placeholder only (no floating label)</span>
        <TrTextField v-model="searchValue" :label="false" placeholder="جستجو" />
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-xs opacity-60 mb-md">disabled</span>
        <TrTextField model-value="غیرفعال" placeholder="عنوان" disabled />
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-xs opacity-60 mb-md">loading</span>
        <TrTextField placeholder="عنوان قرارداد" loading />
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-xs opacity-60 mb-md">error helper</span>
        <TrTextField
          v-model="errorValue"
          placeholder="کد ملی"
          is-number
          :helper="{ type: 'error', message: 'کد ملی را وارد کنید' }"
        />
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-xs opacity-60 mb-md">success helper</span>
        <TrTextField
          v-model="successValue"
          placeholder="عنوان قرارداد"
          :helper="{ type: 'success', message: 'عنوان معتبر است' }"
        />
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-xs opacity-60 mb-md">info helper</span>
        <TrTextField
          v-model="numberValue"
          placeholder="شماره موبایل"
          is-number
          :helper="{ type: 'info', message: 'با صفر شروع شود' }"
        />
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-xs opacity-60 mb-md">maxLength counter</span>
        <TrTextField v-model="limitedValue" placeholder="نام کوتاه" :max-length="12" />
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-xs opacity-60 mb-md">isNumber</span>
        <TrTextField v-model="numberValue" placeholder="شماره موبایل" is-number />
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-xs opacity-60 mb-md">amount + unit + words on focus</span>
        <TrTextField
          v-model="amountValue"
          placeholder="مبلغ"
          amount
          dir="ltr"
          unit="ریال"
        />
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-xs opacity-60 mb-md">dir=ltr (IBAN)</span>
        <TrTextField v-model="ltrValue" placeholder="شماره شبا" dir="ltr" />
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-xs opacity-60 mb-md">before / after icons</span>
        <TrTextField
          v-model="iconValue"
          placeholder="جستجو"
          :before-icon="TrDetailsIcon"
          :after-icon="TrCircleSlashIcon"
          action-aria-label="پاک کردن جستجو"
          @action="actionCount += 1"
        />
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-xs opacity-60 mb-md">inline button (clicked: {{ actionCount }})</span>
        <TrTextField
          v-model="buttonValue"
          placeholder="کد تایید"
          button="ارسال"
          :max-length="6"
          is-number
          @action="actionCount += 1"
        />
      </div>
    </section>

    <p class="mb-6 text-sm opacity-70">TrOtpField demo</p>
    <section class="mb-12 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
      <div class="flex flex-col gap-2">
        <span class="text-xs opacity-60 mb-md">default 6 digits ({{ otpValue || 'empty' }})</span>
        <TrOtpField v-model="otpValue" name="otp" aria-label="کد تایید" @complete="otpComplete = $event" />
        <span v-if="otpComplete" class="text-xs opacity-60">complete: {{ otpComplete }}</span>
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-xs opacity-60 mb-md">4 digits</span>
        <TrOtpField v-model="otpShort" :code-length="4" aria-label="کد ۴ رقمی" />
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-xs opacity-60 mb-md">error helper</span>
        <TrOtpField
          v-model="otpError"
          aria-label="کد تایید"
          :helper="{ type: 'error', message: 'کد وارد شده صحیح نیست' }"
        />
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-xs opacity-60 mb-md">success helper</span>
        <TrOtpField
          v-model="otpSuccess"
          aria-label="کد تایید"
          :helper="{ type: 'success', message: 'کد معتبر است' }"
        />
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-xs opacity-60 mb-md">disabled</span>
        <TrOtpField model-value="123456" disabled aria-label="کد تایید" />
      </div>
    </section>

    <p class="mb-6 text-sm opacity-70">TrButton demo</p>

    <section v-for="variant in variants" :key="variant" class="mb-10">
      <h2 class="mb-3 text-lg font-semibold">{{ variant }}</h2>

      <div v-for="size in sizes" :key="size" class="mb-4 flex flex-wrap items-center gap-2">
        <span class="w-20 text-xs opacity-60">{{ size }}</span>
        <TrButton :variant="variant" :size="size" text="دکمه" />
        <TrButton :variant="variant" :size="size" text="دکمه" selected />
        <TrButton :variant="variant" :size="size" text="دکمه" loading />
        <TrButton :variant="variant" :size="size" text="دکمه" disabled />
        <TrButton :variant="variant" :size="size" text="دکمه">
          <template #before-icon>
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="2" />
            </svg>
          </template>
        </TrButton>
        <TrButton :variant="variant" :size="size" text="دکمه">
          <template #after-icon>
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M4 8h8M8 4l4 4-4 4" stroke="currentColor" stroke-width="2" fill="none" />
            </svg>
          </template>
        </TrButton>
        <TrButton :variant="variant" :size="size" :aria-label="`${variant} ${size} icon`">
          <template #icon>
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <circle cx="8" cy="8" r="5" />
            </svg>
          </template>
        </TrButton>
      </div>
    </section>

    <p class="mb-6 text-sm opacity-70">TrSegmentedControl demo</p>
    <section class="mb-10">
      <TrSegmentedControl
        v-model="segmentValue"
        :options="segmentOptions"
        label="بازه زمانی"
      />
    </section>

    <p class="mb-6 text-sm opacity-70">TrLabel demo</p>
    <section class="mb-10 flex flex-wrap items-center gap-3">
      <TrLabel v-for="type in labelTypes" :key="type" :type="type" :text="type" />
      <TrLabel type="positive" size="medium" radius="full" text="medium" />
      <TrLabel type="neutral" :text="0" />
    </section>

    <p class="mb-6 text-sm opacity-70">TrStatus demo</p>
    <section v-for="type in statusTypes" :key="type" class="mb-8">
      <h2 class="mb-3 text-lg font-semibold">{{ type }}</h2>
      <div class="flex flex-wrap items-center gap-3">
        <TrStatus :type="type" text="وضعیت" />
        <TrStatus :type="type" text="وضعیت" dot />
        <TrStatus :type="type" text="وضعیت" :icon="statusIcons[type]" />
        <TrStatus :type="type" text="وضعیت" :icon="statusIcons[type]" dot />
        <TrStatus :type="type" :icon="statusIcons[type]" />
        <TrStatus :type="type" dot />
      </div>
    </section>
  </div>
</template>
