<script setup lang="ts">
const weights = [
  { className: 'font-thin', label: 'Thin' },
  { className: 'font-ultraLight', label: 'UltraLight' },
  { className: 'font-light', label: 'Light' },
  { className: 'font-regular', label: 'Regular' },
  { className: 'font-medium', label: 'Medium' },
  { className: 'font-demiBold', label: 'DemiBold' },
  { className: 'font-bold', label: 'Bold' },
  { className: 'font-extraBold', label: 'ExtraBold' },
  { className: 'font-black', label: 'Black' },
  { className: 'font-extraBlack', label: 'ExtraBlack' },
  { className: 'font-heavy', label: 'Heavy' },
] as const;

const sample = 'پذیرندگان تارا ۱۲۳۴۵۶۷۸۹۰ — IRANYekanX FaNum';
const latinDigits = '0123456789';
const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
</script>

<template>
  <div class="flex flex-col gap-lg p-md">
    <header class="flex flex-col gap-2xs">
      <h1 class="text-heading-lg">نمونه وزن فونت</h1>
      <p class="text-body-md font-regular">
        پیش‌فرض صفحه Regular و خانواده FaNum است. اعداد انگلیسی و فارسی هر دو با
        <code dir="ltr">font-fanum</code>
        هستند.
      </p>
    </header>

    <section class="flex flex-col gap-sm">
      <h2 class="text-heading-md">اعداد</h2>
      <code class="text-caption-regular opacity-70" dir="ltr">font-fanum</code>
      <p class="font-fanum text-heading-lg">
        انگلیسی: {{ latinDigits }}
      </p>
      <p class="font-fanum text-heading-lg">
        فارسی: {{ persianDigits }}
      </p>
    </section>

    <ul class="flex flex-col gap-md">
      <li
        v-for="weight in weights"
        :key="weight.className"
        class="flex flex-col gap-2xs border-b border-outlined-border pb-sm"
      >
        <code class="text-caption-regular opacity-70" dir="ltr">{{ weight.className }}</code>
        <p :class="['text-heading-lg', weight.className]">{{ sample }}</p>
        <p :class="['text-body-md', weight.className]">{{ weight.label }} — {{ sample }}</p>
      </li>
    </ul>
  </div>
</template>
