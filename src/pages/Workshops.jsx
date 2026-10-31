import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Clock, Users, Check, Star, CalendarDays, ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Container from '@/components/site/Container';
import { getUpcomingSessions, getWorkshops } from '@/api/catalog';
import { base44 } from '@/api/base44Client';
import { formatPrice } from '@/lib/format';

const EMPTY_FORM = { name: '', email: '', phone: '', notes: '' };

export default function Workshops() {
  const [searchParams] = useSearchParams();
  const [workshops, setWorkshops] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [selectedSessionId, setSelectedSessionId] = useState('');
  const [participants, setParticipants] = useState(1);
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    let active = true;
    Promise.all([getWorkshops(), getUpcomingSessions(60)]).then(([workshopList, sessionList]) => {
      if (!active) return;
      setWorkshops(workshopList);
      setSessions(sessionList);
      const wantedDate = searchParams.get('date');
      const wantedTime = searchParams.get('heure');
      const match = sessionList.find((session) => session.date === wantedDate && session.time === wantedTime);
      const slug = match?.workshop_slug ?? workshopList[0]?.slug ?? '';
      setSelectedSlug(slug);
      if (match) setSelectedSessionId(match.id);
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const workshop = workshops.find((item) => item.slug === selectedSlug) ?? workshops[0] ?? null;

  const workshopSessions = useMemo(
    () => sessions.filter((session) => session.workshop_slug === (workshop?.slug ?? '')),
    [sessions, workshop],
  );

  useEffect(() => {
    if (!workshopSessions.length) {
      setSelectedSessionId('');
      return;
    }
    if (!workshopSessions.some((session) => session.id === selectedSessionId)) {
      setSelectedSessionId(workshopSessions[0].id);
    }
  }, [workshopSessions, selectedSessionId]);

  const session = workshopSessions.find((item) => item.id === selectedSessionId) ?? null;
  const spotsLeft = session ? Math.max(0, (session.spots_total || 6) - (session.spots_taken || 0)) : 0;
  const total = (workshop?.price ?? 0) * participants;

  const selectWorkshop = (slug) => {
    setSelectedSlug(slug);
    setStatus('idle');
    setConfirmation(null);
    setParticipants(1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!workshop) return;
    if (!session) {
      setError('Choisissez une date d’atelier.');
      return;
    }
    if (!form.name.trim() || !form.email.trim()) {
      setError('Merci d’indiquer votre nom et votre email.');
      return;
    }

    setStatus('submitting');

    try {
      const response = await base44.functions.invoke('bookWorkshop', {
        workshop_slug: workshop.slug,
        session_id: session.id,
        participants,
        customer_name: form.name,
        customer_email: form.email,
        customer_phone: form.phone,
        notes: form.notes,
      });
      const booking = response.data;

      setConfirmation({
        reference: booking.reference,
        session: { date: booking.session_date, time: booking.session_time },
        workshop: { name: booking.workshop_name },
        participants: booking.participants,
        total: booking.total,
        email: form.email,
      });
      setStatus('done');
      setForm(EMPTY_FORM);
      setSessions((prev) =>
        prev.map((item) =>
          item.id === session.id
            ? { ...item, spots_taken: (item.spots_taken || 0) + booking.participants }
            : item,
        ),
      );
    } catch (submitError) {
      setStatus('idle');
      setError(
        submitError?.response?.data?.error ||
          "La réservation n'a pas pu être enregistrée. Réessayez dans un instant.",
      );
    }
  };

  return (
    <div className="bg-cream">
      <Container className="pb-12 pt-14 lg:pt-20">
        <p className="eyebrow text-forest/80">Ateliers création</p>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <h1 className="font-display text-[2.4rem] leading-[1.05] tracking-[-0.02em] text-ink sm:text-[3.4rem]">
            Trois ateliers, deux mains,
            <span className="block italic text-clay">une pièce à vous.</span>
          </h1>
          <p className="max-w-md text-[15px] font-light leading-[1.8] text-ink/60 lg:pb-2">
            En petit comité : découpe, couture sellier, finitions. Tous les outils et le cuir sont
            fournis — vous repartez avec votre pièce. Les séances ont lieu au 23 rue Burdeau, dans
            l’atelier même où sont faites les pièces de la boutique.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.16em] text-ink/40">
          <span className="flex items-center gap-2">
            <Users className="h-3 w-3" strokeWidth={1.4} /> 2 à 4 personnes
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-3 w-3" strokeWidth={1.4} /> 1 h 45 à 3 h
          </span>
          <span className="flex items-center gap-2">
            <Star className="h-3 w-3 fill-sand text-sand" strokeWidth={0} /> Avis reçus à l’atelier
          </span>
        </div>
      </Container>

      <Container className="pb-20 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.92fr] lg:gap-16">
          <div className="space-y-8">
            {workshops.map((item) => {
              const active = item.slug === workshop?.slug;
              const next = sessions.find((entry) => entry.workshop_slug === item.slug);
              return (
                <article
                  key={item.id}
                  className={`grid gap-5 border p-4 transition-colors sm:grid-cols-[190px_1fr] sm:p-5 ${
                    active ? 'border-forest/40 bg-cream' : 'border-ink/10 bg-cream/60'
                  }`}
                >
                  <div className="overflow-hidden bg-linen">
                    <Image src={item.image} alt={item.name} className="aspect-[4/3] w-full sm:aspect-[3/4]" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="font-display text-[22px] leading-tight text-ink">{item.name}</h2>
                      <p className="shrink-0 font-display text-lg text-ink">{formatPrice(item.price)}</p>
                    </div>
                    <p className="mt-2 text-[13px] font-light leading-relaxed text-ink/60">{item.description}</p>
                    <ul className="mt-4 grid gap-1.5 text-[12px] font-light text-ink/55">
                      {(item.includes || []).map((line) => (
                        <li key={line} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest" strokeWidth={1.6} />
                          {line}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-ink/40">
                        {item.duration} · {item.level}
                        {next ? ` · prochaine date le ${new Date(next.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}` : ''}
                      </p>
                      <button
                        type="button"
                        onClick={() => selectWorkshop(item.slug)}
                        className={`inline-flex items-center gap-2 px-5 py-3 text-[10px] uppercase tracking-[0.2em] transition-colors ${
                          active ? 'bg-forest text-cream' : 'border border-ink/20 text-ink hover:bg-ink hover:text-cream'
                        }`}
                      >
                        {active ? 'Atelier sélectionné' : 'Choisir cet atelier'}
                        <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div id="reserver" className="border border-ink/12 bg-cream p-6 sm:p-8">
              {status === 'done' && confirmation ? (
                <div>
                  <p className="eyebrow text-forest">Réservation enregistrée</p>
                  <h2 className="mt-4 font-display text-3xl leading-tight text-ink">À très vite en atelier.</h2>
                  <div className="mt-6 space-y-2 border-y border-ink/10 py-5 text-[13px] font-light text-ink/65">
                    <p className="flex justify-between gap-4">
                      <span className="text-ink/40">Référence</span>
                      <span className="text-ink">{confirmation.reference}</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span className="text-ink/40">Atelier</span>
                      <span className="text-right text-ink">{confirmation.workshop.name}</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span className="text-ink/40">Date</span>
                      <span className="text-ink capitalize">
                        {new Date(confirmation.session.date).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                        })}{' '}
                        · {confirmation.session.time}
                      </span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span className="text-ink/40">Participants</span>
                      <span className="text-ink">{confirmation.participants}</span>
                    </p>
                    <p className="flex justify-between gap-4 pt-2 text-[15px]">
                      <span className="text-ink/40">Total</span>
                      <span className="font-display text-ink">{formatPrice(confirmation.total)}</span>
                    </p>
                  </div>
                  <p className="mt-5 text-[12px] font-light leading-relaxed text-ink/55">
                    Marie vous confirme votre place par email à {confirmation.email} sous 24 h, avec
                    l’adresse exacte et le lien de paiement. Aucun prélèvement n’a lieu sur ce site.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle');
                      setConfirmation(null);
                    }}
                    className="mt-6 w-full border border-ink/20 py-3 text-[10px] uppercase tracking-[0.2em] text-ink hover:bg-ink hover:text-cream"
                  >
                    Réserver une autre date
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <p className="eyebrow text-forest/80">Réserver</p>
                  <h2 className="mt-3 font-display text-[26px] leading-tight text-ink">
                    {workshop ? workshop.name : 'Choisissez un atelier'}
                  </h2>
                  <p className="mt-2 text-[12px] font-light text-ink/50">
                    {workshop ? `${workshop.duration} · ${workshop.participants} · ${formatPrice(workshop.price)} / personne` : ''}
                  </p>

                  <p className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-ink/40">
                    <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.4} /> Dates disponibles
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {workshopSessions.map((entry) => {
                      const left = Math.max(0, (entry.spots_total || 6) - (entry.spots_taken || 0));
                      const isSelected = entry.id === selectedSessionId;
                      const full = left <= 0;
                      return (
                        <button
                          key={entry.id}
                          type="button"
                          disabled={full}
                          onClick={() => setSelectedSessionId(entry.id)}
                          className={`border px-3 py-3 text-left transition-colors ${
                            isSelected
                              ? 'border-forest bg-forest text-cream'
                              : full
                                ? 'cursor-not-allowed border-ink/10 text-ink/25'
                                : 'border-ink/15 text-ink hover:border-ink/40'
                          }`}
                        >
                          <span className="block text-[12px] capitalize">
                            {new Date(entry.date).toLocaleDateString('fr-FR', {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short',
                            })}
                          </span>
                          <span className="mt-0.5 block text-[10px] uppercase tracking-[0.14em] opacity-70">
                            {entry.time} · {full ? 'complet' : `${left} place${left > 1 ? 's' : ''}`}
                          </span>
                        </button>
                      );
                    })}
                    {workshopSessions.length === 0 && (
                      <p className="col-span-2 text-[12px] font-light text-ink/45">
                        Les prochaines dates arrivent. Écrivez-nous pour être prévenu·e.
                      </p>
                    )}
                  </div>
                  <p className="mt-2 text-[10px] font-light leading-relaxed text-ink/40">
                    Calendrier d’exemple pour la maquette — chaque date est confirmée par email.
                  </p>

                  <div className="mt-5">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-ink/40" htmlFor="participants">
                      Participants
                    </label>
                    <select
                      id="participants"
                      value={participants}
                      onChange={(event) => setParticipants(Number(event.target.value))}
                      className="mt-2 w-full border border-ink/15 bg-cream px-3 py-3 text-sm text-ink focus:border-forest focus:outline-none"
                    >
                      {Array.from({ length: Math.max(1, Math.min(6, spotsLeft || 1)) }, (_, index) => index + 1).map(
                        (value) => (
                          <option key={value} value={value}>
                            {value} personne{value > 1 ? 's' : ''}
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  <div className="mt-4 space-y-3">
                    <input
                      type="text"
                      required
                      aria-label="Votre nom"
                      placeholder="Votre nom"
                      value={form.name}
                      onChange={(event) => setForm({ ...form, name: event.target.value })}
                      className="w-full border border-ink/15 bg-cream px-3 py-3 text-sm text-ink placeholder:text-ink/30 focus:border-forest focus:outline-none"
                    />
                    <input
                      type="email"
                      required
                      aria-label="Votre email"
                      placeholder="Votre email"
                      value={form.email}
                      onChange={(event) => setForm({ ...form, email: event.target.value })}
                      className="w-full border border-ink/15 bg-cream px-3 py-3 text-sm text-ink placeholder:text-ink/30 focus:border-forest focus:outline-none"
                    />
                    <input
                      type="tel"
                      aria-label="Téléphone (optionnel)"
                      placeholder="Téléphone (optionnel)"
                      value={form.phone}
                      onChange={(event) => setForm({ ...form, phone: event.target.value })}
                      className="w-full border border-ink/15 bg-cream px-3 py-3 text-sm text-ink placeholder:text-ink/30 focus:border-forest focus:outline-none"
                    />
                    <textarea
                      rows={2}
                      aria-label="Précisions pour la réservation"
                      placeholder="Une date particulière, un cadeau, une question ?"
                      value={form.notes}
                      onChange={(event) => setForm({ ...form, notes: event.target.value })}
                      className="w-full border border-ink/15 bg-cream px-3 py-3 text-sm text-ink placeholder:text-ink/30 focus:border-forest focus:outline-none"
                    />
                  </div>

                  {error && <p className="mt-3 text-[12px] text-destructive">{error}</p>}

                  <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
                    <span className="text-[11px] uppercase tracking-[0.16em] text-ink/40">Total</span>
                    <span className="font-display text-xl text-ink">{formatPrice(total)}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting' || !session}
                    className="mt-4 flex w-full items-center justify-center bg-ink px-6 py-4 text-[11px] uppercase tracking-[0.24em] text-cream transition-colors hover:bg-forest disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {status === 'submitting' ? 'Enregistrement…' : 'Réserver mon atelier'}
                  </button>
                  <p className="mt-3 text-center text-[11px] font-light text-ink/40">
                    Sans paiement immédiat — confirmation par email sous 24 h.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}