import { t } from './i18n'
export function setMeta(path: string) {
  if (typeof document === 'undefined') return;
  const title = t(`${path}.meta.title`);
  const descr = t(`${path}.meta.descr`);
  if (title && title !== `${path}.meta.title`) document.title = title;
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
  if (descr && descr !== `${path}.meta.descr`) meta.setAttribute('content', descr);
}
