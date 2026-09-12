import type { MessageTree } from '../types';

/** Shared Persian copy. Keep keys stable; apps override via their own trees if needed. */
export const commonFa: MessageTree = {
  common: {
    save: 'ذخیره',
    cancel: 'انصراف',
    confirm: 'تأیید',
    retry: 'تلاش مجدد',
    search: 'جستجو',
    loading: 'در حال بارگذاری…',
    empty: 'موردی یافت نشد',
    prev: 'قبلی',
    next: 'بعدی',
    back: 'بازگشت',
  },
  errors: {
    unexpected: 'بروز خطا، لطفا دوباره امتحان کنید',
    network: 'ارتباط با سرور برقرار نشد',
    permission: 'به سرویس درخواستی دسترسی ندارید',
  },
};
