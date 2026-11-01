import { useState } from 'react';
import { MapPin, Clock, Mail, Instagram, Check } from 'lucide-react';
import Container from '@/components/site/Container';
import { base44 } from '@/api/base44Client';
import useDocumentTitle from '@/hooks/useDocumentTitle';

const SUBJECTS = ['Une commande', 'Un atelier', 'Une pièce sur-mesure', 'Autre'];

export default function Contact() {
  useDocumentTitle('Visite & contact — Atelier Dimanche, 23 rue Burdeau, Lyon');
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'Une commande', body: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim() || !form.body.trim()) {
      setError('Merci de renseigner votre nom, votre email et votre message.');
      return;
    }
    setStatus('submitting');
    try {
      await base44.entities.Message.create({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        body: form.body,
      });
      setStatus('done');
      setForm({ name: '', email: '', phone: '', subject: 'Une commande', body: '' });
    } catch (submitError) {
      setStatus('idle');
      setError("Le message n'a pas pu être envoyé. Réessayez dans un instant.");
    }
  };

  return (
    <div className="bg-cream">
      <Container className="pb-20 pt-14 lg:pt-20">
        <p className="eyebrow text-forest/80">Visite &amp; contact</p>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h1 className="font-display text-[2.4rem] leading-[1.06] tracking-[-0.02em] text-ink sm:text-[3.3rem]">
            Un projet, une question,
            <span className="block italic text-clay">une envie de cuir ?</span>
          </h1>
          <p className="max-w-md text-[15px] font-light leading-[1.8] text-ink/60 lg:pb-2">
            Une commande à suivre, un atelier à offrir, une pièce à imaginer ensemble : écrivez à
            l’atelier, la réponse arrive en général sous 24 h.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            {status === 'done' ? (
              <div className="border border-forest/30 bg-cream p-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest/10">
                  <Check className="h-4 w-4 text-forest" strokeWidth={1.8} />
                </div>
                <h2 className="mt-5 font-display text-2xl text-ink">Message reçu, merci.</h2>
                <p className="mt-3 text-[14px] font-light leading-relaxed text-ink/60">
                  L’atelier vous répond par email sous 24 h ouvrées. Pour une urgence, passez à
                  l’atelier-boutique pendant les horaires d’ouverture.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-6 border border-ink/20 px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-ink hover:bg-ink hover:text-cream"
                >
                  Écrire un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
                <input
                  required
                  aria-label="Nom et prénom"
                  placeholder="Nom et prénom"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="w-full border border-ink/15 bg-cream px-3 py-3 text-sm placeholder:text-ink/30 focus:border-forest focus:outline-none"
                />
                <input
                  required
                  type="email"
                  aria-label="Email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  className="w-full border border-ink/15 bg-cream px-3 py-3 text-sm placeholder:text-ink/30 focus:border-forest focus:outline-none"
                />
                <input
                  aria-label="Téléphone (optionnel)"
                  placeholder="Téléphone (optionnel)"
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  className="w-full border border-ink/15 bg-cream px-3 py-3 text-sm placeholder:text-ink/30 focus:border-forest focus:outline-none sm:col-span-2"
                />
                <select
                  aria-label="Sujet du message"
                  value={form.subject}
                  onChange={(event) => setForm({ ...form, subject: event.target.value })}
                  className="w-full border border-ink/15 bg-cream px-3 py-3 text-sm text-ink focus:border-forest focus:outline-none sm:col-span-2"
                >
                  {SUBJECTS.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
                <textarea
                  required
                  rows={6}
                  aria-label="Votre message"
                  placeholder="Votre message"
                  value={form.body}
                  onChange={(event) => setForm({ ...form, body: event.target.value })}
                  className="w-full border border-ink/15 bg-cream px-3 py-3 text-sm placeholder:text-ink/30 focus:border-forest focus:outline-none sm:col-span-2"
                />
                {error && <p className="text-[12px] text-destructive sm:col-span-2">{error}</p>}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="flex items-center justify-center bg-ink px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-cream transition-colors hover:bg-forest disabled:opacity-40 sm:col-span-2"
                >
                  {status === 'submitting' ? 'Envoi…' : 'Envoyer mon message'}
                </button>
              </form>
            )}
          </div>

          <aside className="space-y-8 border-t border-ink/10 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-forest" strokeWidth={1.3} />
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-ink">L’atelier-boutique</p>
                <p className="mt-1 text-[13px] font-light leading-relaxed text-ink/60">
                  23 rue Burdeau, 69001 Lyon
                  <br />
                  <a
                    href="https://maps.google.com/?q=23+rue+Burdeau+69001+Lyon"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block border-b border-ink/25 pb-0.5 text-ink hover:border-forest hover:text-forest"
                  >
                    Voir l’itinéraire
                  </a>
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-forest" strokeWidth={1.3} />
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-ink">Ouverture</p>
                <ul className="mt-1 space-y-0.5 text-[13px] font-light text-ink/60">
                  <li>Mercredi &amp; vendredi : 14h – 19h</li>
                  <li>Jeudi &amp; samedi : 14h – 18h</li>
                  <li className="text-ink/40">Rendez-vous possible à un autre moment</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-forest" strokeWidth={1.3} />
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-ink">Écrire</p>
                <a
                  href="mailto:marie@atelier-dimanche.fr"
                  className="mt-1 inline-block border-b border-ink/25 pb-0.5 text-[13px] font-light text-ink/70 hover:border-forest hover:text-forest"
                >
                  marie@atelier-dimanche.fr
                </a>
              </div>
            </div>

            <div className="flex gap-3">
              <Instagram className="mt-0.5 h-4 w-4 shrink-0 text-forest" strokeWidth={1.3} />
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-ink">Instagram</p>
                <a
                  href="https://www.instagram.com/atelier_dimanche/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block border-b border-ink/25 pb-0.5 text-[13px] font-light text-ink/70 hover:border-forest hover:text-forest"
                >
                  @atelier_dimanche
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}