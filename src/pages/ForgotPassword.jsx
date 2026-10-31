import { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Loader2 } from "lucide-react";
import AuthLayout, { authInputClass, authLabelClass } from "@/components/AuthLayout";
import AuthNotice from "@/components/auth/AuthNotice";
import { authErrorMessage } from "@/lib/authMessages";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await base44.auth.resetPasswordRequest(email);
      setSent(true);
    } catch (err) {
      // On garde la même réponse qu'un envoi réussi : impossible de deviner qui a un compte.
      setSent(true);
      setError("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Mot de passe oublié"
      subtitle="Indiquez l’adresse email de votre compte : vous recevrez un lien pour choisir un nouveau mot de passe."
      footer={
        <Link to="/login" className="border-b border-ink/30 pb-0.5 text-ink hover:border-ink">
          Revenir à la connexion
        </Link>
      }
    >
      {sent ? (
        <div className="space-y-4">
          <AuthNotice tone="success">
            Si un compte existe pour {email}, un lien vient de lui être envoyé. Pensez à regarder les
            indésirables. Le lien ne fonctionne qu’une fois.
          </AuthNotice>
          <p className="text-[12px] font-light leading-relaxed text-ink/55">
            Rien reçu au bout de quelques minutes ? Vérifiez l’adresse saisie, puis recommencez.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className={authLabelClass}>
              Adresse email
            </Label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                autoFocus
                placeholder="marie@atelier-dimanche.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={authInputClass}
                required
              />
            </div>
          </div>

          <AuthNotice>{error && authErrorMessage(error, error)}</AuthNotice>

          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-none bg-ink text-[11px] uppercase tracking-[0.22em] text-cream hover:bg-forest"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi…
              </>
            ) : (
              "Recevoir le lien"
            )}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}