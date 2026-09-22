export type FaqSection = 'faq' | 'videos' | 'support';

export type FaqItemGroup = 'questions' | 'videos' | 'support';

export type FaqItemDef = {
  id: string;
  section: FaqSection;
  group: FaqItemGroup;
};

export const faqItems: FaqItemDef[] = [
  { id: 'q1', section: 'faq', group: 'questions' },
  { id: 'q2', section: 'faq', group: 'questions' },
  { id: 'q3', section: 'faq', group: 'questions' },
  { id: 'q4', section: 'faq', group: 'questions' },
  { id: 'q5', section: 'faq', group: 'questions' },
  { id: 'q6', section: 'faq', group: 'questions' },
  { id: 'q7', section: 'faq', group: 'questions' },
  { id: 'q8', section: 'faq', group: 'questions' },
  { id: 'q9', section: 'faq', group: 'questions' },
  { id: 'q10', section: 'faq', group: 'questions' },
  { id: 'q11', section: 'faq', group: 'questions' },
  { id: 'q12', section: 'faq', group: 'questions' },
  { id: 'q13', section: 'faq', group: 'questions' },
  { id: 'q14', section: 'faq', group: 'questions' },
  { id: 'q15', section: 'faq', group: 'questions' },
  { id: 'q16', section: 'faq', group: 'questions' },
  { id: 'v1', section: 'videos', group: 'videos' },
  { id: 'v2', section: 'videos', group: 'videos' },
  { id: 'v3', section: 'videos', group: 'videos' },
  { id: 'v4', section: 'videos', group: 'videos' },
  { id: 'v5', section: 'videos', group: 'videos' },
  { id: 's1', section: 'support', group: 'support' },
  { id: 's2', section: 'support', group: 'support' },
  { id: 's3', section: 'support', group: 'support' },
];

export function faqItemQuestionKey(item: FaqItemDef) {
  return `faq.items.${item.group}.${item.id}.question`;
}

export function faqItemAnswerKey(item: FaqItemDef) {
  return `faq.items.${item.group}.${item.id}.answer`;
}
