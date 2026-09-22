<script setup lang="ts">
import taraLogo from '@assets/images/logo-persion.svg';

const { t } = useI18n();
</script>

<template>
  <section class="search-ads-banner" :aria-label="t('ads.search.banner.aria')">
    <div class="search-ads-banner__glow" aria-hidden="true" />
    <div class="search-ads-banner__glow search-ads-banner__glow--alt" aria-hidden="true" />

    <div class="search-ads-banner__copy">
      <div class="search-ads-banner__brand">
        <span class="search-ads-banner__logo-wrap">
          <img :src="taraLogo" :alt="t('auth.login.logoAlt')" width="50" height="47" />
        </span>
        <span class="search-ads-banner__product">Search Ads</span>
      </div>
      <h2 class="search-ads-banner__headline">{{ t('ads.search.banner.headline') }}</h2>
      <p class="search-ads-banner__text">{{ t('ads.search.banner.body') }}</p>
    </div>

    <div class="search-ads-banner__stage" aria-hidden="true">
      <p class="search-ads-banner__stage-label">{{ t('ads.search.banner.stageLabel') }}</p>
      <ul class="search-ads-banner__results">
        <li class="search-ads-banner__result is-sponsored">
          <span class="search-ads-banner__rank">۱</span>
          <span class="search-ads-banner__badge">Ad</span>
          <span class="search-ads-banner__result-title">{{ t('ads.search.banner.resultSponsored') }}</span>
        </li>
        <li class="search-ads-banner__result">
          <span class="search-ads-banner__rank">۲</span>
          <span class="search-ads-banner__result-title">{{ t('ads.search.banner.resultOrganic') }}</span>
        </li>
        <li class="search-ads-banner__result">
          <span class="search-ads-banner__rank">۳</span>
          <span class="search-ads-banner__result-title">{{ t('ads.search.banner.resultOrganicAlt') }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.search-ads-banner {
  position: relative;
  display: grid;
  overflow: hidden;
  isolation: isolate;
  gap: 1.5rem;
  border-radius: 0.5rem;
  padding: 1.5rem 1.75rem;
  color: #fff;
  background:
    radial-gradient(120% 140% at 100% 0%, rgba(230, 0, 126, 0.55) 0%, transparent 52%),
    linear-gradient(125deg, #101c99 0%, #1423bd 48%, #5b0d7a 100%);
}

@media (min-width: 768px) {
  .search-ads-banner {
    grid-template-columns: minmax(0, 1.15fr) minmax(16rem, 0.85fr);
    align-items: center;
    min-height: 15.5rem;
    padding: 1.75rem 2rem;
  }
}

.search-ads-banner__glow {
  position: absolute;
  z-index: -1;
  width: 14rem;
  height: 14rem;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(230, 0, 126, 0.45) 0%, transparent 70%);
  animation: search-ads-float 8s ease-in-out infinite;
  inset-inline-end: -3rem;
  top: -4rem;
}

.search-ads-banner__glow--alt {
  width: 10rem;
  height: 10rem;
  background: radial-gradient(circle, rgba(115, 128, 232, 0.5) 0%, transparent 70%);
  animation-delay: -3s;
  inset-inline-start: -2rem;
  top: auto;
  bottom: -3rem;
}

.search-ads-banner__copy {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.search-ads-banner__brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.search-ads-banner__logo-wrap {
  display: inline-flex;
  height: 2.75rem;
  width: 2.75rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 8px 24px rgba(10, 16, 64, 0.25);
}

.search-ads-banner__logo-wrap img {
  height: 1.75rem;
  width: auto;
}

.search-ads-banner__product {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.12);
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.search-ads-banner__headline {
  margin: 0;
  max-width: 28rem;
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.7;
}

.search-ads-banner__text {
  margin: 0;
  max-width: 32rem;
  font-size: 0.875rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.86);
}

.search-ads-banner__stage {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(8, 12, 48, 0.28);
  padding: 1rem;
  backdrop-filter: blur(10px);
}

.search-ads-banner__stage-label {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.72);
}

.search-ads-banner__results {
  display: flex;
  margin: 0;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0;
  list-style: none;
}

.search-ads-banner__result {
  display: flex;
  min-height: 2.5rem;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 0.75rem;
  animation: search-ads-rise 4.8s ease-in-out infinite;
}

.search-ads-banner__result:nth-child(2) {
  animation-delay: 0.35s;
  opacity: 0.78;
}

.search-ads-banner__result:nth-child(3) {
  animation-delay: 0.7s;
  opacity: 0.55;
}

.search-ads-banner__result.is-sponsored {
  background: rgba(255, 255, 255, 0.18);
  box-shadow: 0 0 0 1px rgba(230, 0, 126, 0.45);
}

.search-ads-banner__rank {
  display: inline-flex;
  width: 1.25rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.7);
}

.search-ads-banner__badge {
  flex-shrink: 0;
  border-radius: 0.25rem;
  background: #e6007e;
  padding: 0.1rem 0.4rem;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.search-ads-banner__result-title {
  overflow: hidden;
  font-size: 0.75rem;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@keyframes search-ads-float {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(-1.25rem, 1rem, 0) scale(1.08);
  }
}

@keyframes search-ads-rise {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .search-ads-banner__glow,
  .search-ads-banner__result {
    animation: none;
  }
}
</style>
