import type { Component } from 'vue';

const vectorModules = import.meta.glob('./vector/*.vue', {
  eager: true,
  import: 'default',
}) as Record<string, Component>;

function fileNameFromPath(path: string): string {
  const base = path.split(/[/\\]/).pop() ?? '';
  return base.replace(/\.vue$/i, '');
}

export const emptyVectorNames = Object.keys(vectorModules)
  .map(fileNameFromPath)
  .filter(Boolean);

export type TrEmptyVectorName = string;

export function resolveEmptyVector(name: string | undefined | null): Component | undefined {
  if (!name) return undefined;
  const wanted = name.replace(/\.vue$/i, '');
  const match = Object.entries(vectorModules).find(([path]) => fileNameFromPath(path) === wanted);
  return match?.[1];
}
