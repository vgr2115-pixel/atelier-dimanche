import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShieldCheck } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Container from '@/components/site/Container';
import { useCart } from '@/components/cart/CartContext';
import { base44 } from '@/api/base44Client';
import { formatPrice } from '@/lib/format';

export default function Cart() {
  const { items, subtotal, setQuantity, removeItem, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    postal_code: '',
    city: '',
    notes: '',
  });
  const [gift, setGift] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 6.9;
  const total = subtotal + shipping;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!items.length) return;
    if (!form.name.trim() || !form.email.trim() || !form.address.trim() || !form.city.trim()) {
      setError('Merci de compléter vos coordonnées de livraison.');
      return;
    }

    setStatus('submitting');
    const reference = `CMD-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    try {
      await base44.entities.Order.create({
        reference,
        customer_name: form.name,
        customer_email: form.email,
        customer_phone: form.phone,
        address: form.address,
        postal_code: form.postal_code,
        city: form.city,
        items: items.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal,
        shipping,
        total,
        gift,
        notes: form.notes,
        status: 'recue',
      });
      clear();
      navigate(`/commande/confirmation?ref=${reference}`);
    } catch (submitError) {
      setStatus('idle');
      setError("La commande n'a pas pu être enregistrée. Réessayez dans un instant.");
    }
  };

  if (!items.length) {
    return (
      <Container className="py-28 text-center lg:py-36">
        <p className="eyebrow text-forest/80">Panier</p>
        <h1 className="mt-4 font-display text-[2.2rem] leading-tight text-ink sm:text-4xl">Votre panier est vide</h1>
        <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-ink/55">
          Les pièces de l’atelier sont uniques : quand elles partent, elles ne reviennent pas. Jetez
          un œil à la collection du moment.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/boutique"
            className="inline-flex bg-ink px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-cream hover:bg-forest"
          >
            Voir la collection
          </Link>
          <Link
            to="/ateliers"
            className="inline-flex border border-ink/20 px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-ink hover:bg-ink hover:text-cream"
          >
            Réserver un atelier
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div className="bg-cream">
      <Container className="pb-20 pt-14 lg:pt-20">
        <p className="eyebrow text-forest/80">Panier</p>
        <h1 className="mt-4 font-display text-[2.2rem] leading-tight text-ink sm:text-[3rem]">Votre commande</h1>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-5">
                  <div className="h-28 w-24 shrink-0 overflow-hidden bg-linen">
                    <Image src={item.image} alt={item.name} className="h-full w-full" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link to={`/produit/${item.slug ?? item.id}`} className="font-display text-[17px] text-ink hover:text-clay">
                          {item.name}
                        </Link>
                        <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-ink/40">{item.meta}</p>
                      </div>
                      <p className="text-sm text-ink">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex items-center border border-ink/15">
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-2 text-ink/60 hover:text-ink"
                          aria-label="Diminuer"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-7 text-center text-xs">{item.quantity}</span>
                        {item.quantity < (item.max ?? 1) && (
                          <button
                            type="button"
                            onClick={() => setQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 text-ink/60 hover:text-ink"
                            aria-label="Augmenter"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-ink/35 hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.3} /> Retirer
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <form onSubmit={handleSubmit} className="mt-10">
              <p className="eyebrow text-forest/80">Coordonnées</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <input
                  required
                  placeholder="Nom et prénom"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="w-full border border-ink/15 bg-cream px-3 py-3 text-sm placeholder:text-ink/30 focus:border-forest focus:outline-none"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  className="w-full border border-ink/15 bg-cream px-3 py-3 text-sm placeholder:text-ink/30 focus:border-forest focus:outline-none"
                />
                <input
                  placeholder="Téléphone"
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  className="w-full border border-ink/15 bg-cream px-3 py-3 text-sm placeholder:text-ink/30 focus:border-forest focus:outline-none sm:col-span-2"
                />
                <input
                  required
                  placeholder="Adresse"
                  value={form.address}
                  onChange={(event) => setForm({ ...form, address: event.target.value })}
                  className="w-full border border-ink/15 bg-cream px-3 py-3 text-sm placeholder:text-ink/30 focus:border-forest focus:outline-none sm:col-span-2"
                />
                <input
                  placeholder="Code postal"
                  value={form.postal_code}
                  onChange={(event) => setForm({ ...form, postal_code: event.target.value })}
                  className="w-full border border-ink/15 bg-cream px-3 py-3 text-sm placeholder:text-ink/30 focus:border-forest focus:outline-none"
                />
                <input
                  required
                  placeholder="Ville"
                  value={form.city}
                  onChange={(event) => setForm({ ...form, city: event.target.value })}
                  className="w-full border border-ink/15 bg-cream px-3 py-3 text-sm placeholder:text-ink/30 focus:border-forest focus:outline-none"
                />
                <textarea
                  rows={3}
                  placeholder="Un mot pour Marie (emballage cadeau, retrait à l’atelier…)"
                  value={form.notes}
                  onChange={(event) => setForm({ ...form, notes: event.target.value })}
                  className="w-full border border-ink/15 bg-cream px-3 py-3 text-sm placeholder:text-ink/30 focus:border-forest focus:outline-none sm:col-span-2"
                />
              </div>

              <label className="mt-4 flex items-center gap-3 text-[12px] font-light text-ink/60">
                <input
                  type="checkbox"
                  checked={gift}
                  onChange={(event) => setGift(event.target.checked)}
                  className="h-4 w-4 accent-forest"
                />
                Emballage cadeau et mot manuscrit (offert)
              </label>

              {error && <p className="mt-4 text-[12px] text-destructive">{error}</p>}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-6 flex w-full items-center justify-center bg-ink px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-cream transition-colors hover:bg-forest disabled:opacity-40"
              >
                {status === 'submitting' ? 'Enregistrement…' : 'Valider ma commande'}
              </button>
            </form>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-ink/12 bg-linen/60 p-6 sm:p-8">
              <p className="eyebrow text-forest/80">Récapitulatif</p>
              <div className="mt-5 space-y-2 text-[13px] font-light text-ink/65">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span className="text-ink">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span className="text-ink">{shipping === 0 ? 'Offerte' : formatPrice(shipping)}</span>
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between border-t border-ink/15 pt-4">
                <span className="text-[11px] uppercase tracking-[0.16em] text-ink/50">Total</span>
                <span className="font-display text-2xl text-ink">{formatPrice(total)}</span>
              </div>

              <div className="mt-6 space-y-3 text-[12px] font-light leading-relaxed text-ink/55">
                <p className="flex gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-forest" strokeWidth={1.3} />
                  Commande enregistrée, puis lien de paiement sécurisé envoyé par email sous 24 h.
                </p>
                <p>
                  Retrait gratuit à l’atelier-boutique — 23 rue Burdeau, Lyon 1ᵉʳ — sur simple demande.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}