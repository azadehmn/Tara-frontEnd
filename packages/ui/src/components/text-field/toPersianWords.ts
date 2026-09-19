const DELIMITER = ' و ';
const ZERO = 'صفر';
const NEGATIVE = 'منفی ';
const ONES = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
const TEENS = [
  'ده',
  'یازده',
  'دوازده',
  'سیزده',
  'چهارده',
  'پانزده',
  'شانزده',
  'هفده',
  'هجده',
  'نوزده',
  'بیست',
];
const TENS = ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'نود'];
const HUNDREDS = [
  '',
  'یکصد',
  'دویست',
  'سیصد',
  'چهارصد',
  'پانصد',
  'ششصد',
  'هفتصد',
  'هشتصد',
  'نهصد',
];
const SCALES = [
  '',
  ' هزار',
  ' میلیون',
  ' میلیارد',
  ' بیلیون',
  ' بیلیارد',
  ' تریلیون',
  ' تریلیارد',
];

function threeDigitToWords(value: number): string {
  if (value === 0) return '';
  if (value < 10) return ONES[value] ?? '';
  if (value <= 20) return TEENS[value - 10] ?? '';
  if (value < 100) {
    const one = value % 10;
    const ten = (value - one) / 10;
    return one > 0 ? `${TENS[ten]}${DELIMITER}${ONES[one]}` : (TENS[ten] ?? '');
  }

  const one = value % 10;
  const hundred = Math.floor(value / 100);
  const ten = Math.floor((value - hundred * 100 - one) / 10);
  const parts = [HUNDREDS[hundred]];
  const rest = ten * 10 + one;

  if (rest === 0) return parts.join(DELIMITER);
  if (rest < 10) parts.push(ONES[rest]);
  else if (rest <= 20) parts.push(TEENS[rest - 10]);
  else {
    parts.push(TENS[ten]);
    if (one > 0) parts.push(ONES[one]);
  }

  return parts.filter(Boolean).join(DELIMITER);
}

/** Convert an integer (or numeric string) to Persian words. */
export function toPersianWords(input: number | string): string {
  if (typeof input === 'number' && !Number.isFinite(input)) return ZERO;

  const raw = String(input).trim().replaceAll(',', '');
  const negative = raw.startsWith('-');
  const integerPart = raw.replace(/^[+-]/, '').split('.')[0] ?? '';
  const digits = integerPart.replace(/\D/g, '');
  if (!digits || /^0+$/.test(digits)) return ZERO;

  const integer = digits.replace(/^0+/, '');
  if (integer.length > 24) return 'خارج از محدوده';

  const padded = integer.padStart(Math.ceil(integer.length / 3) * 3, '0');
  const groups = padded.match(/.{1,3}/g) ?? [];
  const parts: string[] = [];

  groups.forEach((group, index) => {
    const words = threeDigitToWords(Number.parseInt(group, 10));
    if (!words) return;
    const scale = SCALES[groups.length - (index + 1)] ?? '';
    parts.push(`${words}${scale}`);
  });

  const result = parts.join(DELIMITER);
  return `${negative ? NEGATIVE : ''}${result}`;
}
