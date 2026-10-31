import { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import AuthLayout, { authInputClass, authLabelClass } from "@/components/AuthLayout";
import AuthNotice from "@/components/auth/AuthNotice";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await base44.auth.resetPasswordRequest(email);
    } catch {
      // On affiche toujours la même confirmation, par discrétion.
    } finally {
      setLoading(false);
      setSent(true);
    }
  };

  return (
    <AuthLayout
      title="Mot de passe oublié"
      subtitle="Indiquez l’adresse email de votre compte : vous recevrez un lien pour choisir un nouveau mot de passe."
      footer={
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-ink/60 transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3 w-3" strokeWidth={1.6} />
          Revenir à la connexion
        </Link>
      }
    >
      {sent ? (
        <AuthNotice tone="success">
          Si un compte existe avec cette adresse, vous recevrez un lien de réinitialisation dans les
          prochaines minutes. Pensez à regarder les indésirables.
        </AuthNotice>
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