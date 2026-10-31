import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/format';
import { getUpcomingSessions } from '@/api/catalog';

export default function BookingCard() {
  const [sessions, setSessions] = useState([]);
  const [workshop, setWorkshop] = useState(null);

  useEffect(() => {
    let active = true;
    getUpcomingSessions(60).then((all) => {
      if (!active) return;
      const belt = all.filter((session) => session.workshop_slug === 'atelier-ceinture').slice(0, 3);
      setSessions((belt.length ? belt : all).slice(0, 3));
      setWorkshop(all[0] ?? null);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="lg:sticky lg:top-28">
      <div className="border border-ink/12 bg-cream p-7 shadow-[0_24px_60px_-40px_rgba(26,26,26,0.5)] sm:p-9">
        <p className="eyebrow text-forest/80">Atelier de fabrication</p>
        <h3 className="mt-4 font-display text-[26px] leading-[1.15] text-ink sm:text-[30px]">
          Créez votre propre ceinture en 3 h
        </h3>
        <p className="mt-3 text-[13px] font-light leading-relaxed text-ink/55">
          Découpe, perçage, couture sellier et finition des tranches. Vous repartez avec votre
          ceinture, à votre taille.
        </p>

        <div className="mt-5 flex items-center gap-3">
          <div className="flex items-center gap-0.5">
            {[0, 1, 2, 3, 4].map((star) => (
              <Star key={star} className="h-3 w-3 fill-sand text-sand" strokeWidth={0} />
            ))}
          </div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-ink/45">Ateliers en petit comité</p>
        </div>

        <div className="mt-6 flex items-baseline justify-between border-y border-ink/10 py-4">
          <p className="font-display text-2xl text-ink">{formatPrice(95)}</p>
          <p className="text-[11px] uppercase tracking-[0.14em] text-ink/45">2 personnes max · 3 h</p>
        </div>

        <p className="mt-6 text-[10px] uppercase tracking-[0.22em] text-ink/40">Prochaines dates</p>
        <ul className="mt-3 divide-y divide-ink/10">
          {sessions.length === 0 && (
            <li className="py-3 text-[13px] font-light text-ink/40">Dates communiquées très vite par email.</li>
          )}
          {sessions.map((session) => (
            <li key={session.id}>
              <Link
                to={`/ateliers?date=${session.date}&heure=${session.time}`}
                className="group flex items-center justify-between gap-3 py-3 transition-colors hover:text-clay"
              >
                <span className="text-[13px] capitalize text-ink/80">
                  {new Date(session.date).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                </span>
                <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-ink/40">
                  {session.time}
                  <ArrowRight
                    className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    strokeWidth={1.5}
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/ateliers"
          className="mt-7 flex w-full items-center justify-center bg-forest px-6 py-4 text-[11px] uppercase tracking-[0.24em] text-cream transition-colors duration-300 hover:bg-ink"
        >
          Réserver mon atelier
        </Link>
        <p className="mt-4 text-center text-[11px] font-light text-ink/40">
          Bon cadeau disponible · valable 12 mois
        </p>
        {workshop && (
          <p className="mt-1 text-center text-[10px] uppercase tracking-[0.16em] text-ink/25">
            Prochaine session confirmée
          </p>
        )}
      </div>

      <Link
        to="/ateliers"
        className="mt-5 flex items-center justify-between border-b border-ink/20 pb-2 text-[11px] uppercase tracking-[0.2em] text-ink/60 transition-colors hover:border-ink hover:text-ink"
      >
        Voir tous les ateliers
        <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.4} />
      </Link>
    </div>
  );
}