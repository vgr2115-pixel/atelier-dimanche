import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

const asArray = (data) => (Array.isArray(data) ? data : data?.items ?? []);

export default function HeaderBanner() {
  const [settings, setSettings] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let active = true;
    base44.entities.SiteSettings.list('created_date', 1)
      .then((data) => {
        if (active) setSettings(asArray(data)[0] ?? null);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const messages = (settings?.banner_messages ?? []).filter((message) => message && message.trim());

  useEffect(() => {
    if (messages.length < 2) return undefined;
    const timer = setInterval(() => setIndex((value) => (value + 1) % messages.length), 6000);
    return () => clearInterval(timer);
  }, [messages.length]);

  if (settings?.banner_enabled !== true || messages.length === 0) return null;

  const message = messages[index % messages.length];
  const linkUrl = settings.banner_link_url?.trim();
  const linkLabel = settings.banner_link_label?.trim() || 'En savoir plus';
  const linkClass = 'border-b border-cream/40 pb-0.5 text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-cream';

  return (
    <div className="bg-forest text-cream">
      <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-center gap-x-3 gap-y-1 px-6 py-2.5 text-center sm:px-10 lg:px-16">
        <p className="text-[10px] uppercase leading-relaxed tracking-[0.16em]">{message}</p>
        {linkUrl &&
          (linkUrl.startsWith('/') ? (
            <Link to={linkUrl} className={linkClass}>
              {linkLabel}
            </Link>
          ) : (
            <a href={linkUrl} target="_blank" rel="noreferrer" className={linkClass}>
              {linkLabel}
            </a>
          ))}
      </div>
    </div>
  );
}