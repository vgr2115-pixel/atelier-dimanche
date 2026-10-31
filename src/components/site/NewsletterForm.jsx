import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus('submitting');
    try {
      await base44.entities.Subscriber.create({ email, source: 'site' });
      setStatus('done');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <p className="flex items-center gap-2 text-[13px] font-light text-sand">
        <Check className="h-4 w-4" strokeWidth={1.6} /> Merci — vous serez prévenu·e des nouvelles pièces.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center border-b border-cream/25 pb-2">
      <input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Votre email"
        className="w-full bg-transparent text-[13px] font-light text-cream placeholder:text-cream/35 focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        aria-label="S’inscrire à la newsletter"
        className="ml-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-cream/70 transition-colors hover:text-sand disabled:opacity-40"
      >
        {status === 'submitting' ? 'Envoi…' : 'S’inscrire'}
        <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.4} />
      </button>
    </form>
  );
}