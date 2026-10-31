import { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Loader2 } from "lucide-react";
import AuthLayout, { authInputClass, authLabelClass } from "@/components/AuthLayout";
import AuthNotice from "@/components/auth/AuthNotice";
import GoogleIcon from "@/components/GoogleIcon";
import { safeReturnTo } from "@/lib/authReturnTo";
import { authErrorMessage } from "@/lib/authMessages";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // Destination après connexion (le consentement MCP renvoie ici avec returnTo).
  const returnTo = safeReturnTo();
  const query = returnTo !== "/" ? "?returnTo=" + encodeURIComponent(returnTo) : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await base44.auth.loginViaEmailPassword(email, password);
      window.location.href = returnTo;
    } catch (err) {
      setError(authErrorMessage(err, "Connexion impossible pour le moment. Réessayez dans un instant."));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    base44.auth.loginWithProvider("google", returnTo);
  };

  return (
    <AuthLayout
      title="Se connecter"
      subtitle="L’espace privé d’Atelier Dimanche : le catalogue, les ateliers et les demandes reçues. Réservé à l’atelier."
      footer={
        <>
          Pas encore de compte ?{" "}
          <Link to={"/register" + query} className="border-b border-ink/30 pb-0.5 text-ink hover:border-ink">
            Créer un compte
          </Link>
        </>
      }
    >
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

        <div className="space-y-2">
          <div className="flex items-baseline justify-between gap-3">
            <Label htmlFor="password" className={authLabelClass}>
              Mot de passe
            </Label>
            <Link
              to="/forgot-password"
              className="text-[11px] font-light text-ink/50 transition-colors hover:text-ink"
            >
              Oublié ?
            </Link>
          </div>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={authInputClass}
              required
            />
          </div>
        </div>

        <AuthNotice>{error}</AuthNotice>

        <Button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-none bg-ink text-[11px] uppercase tracking-[0.22em] text-cream hover:bg-forest"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connexion…
            </>
          ) : (
            "Entrer"
          )}
        </Button>
      </form>

      <div className="relative my-7">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-ink/12" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-linen px-3 text-[9px] uppercase tracking-[0.22em] text-ink/35">ou</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={handleGoogle}
        className="h-12 w-full rounded-none border-ink/20 bg-transparent text-[11px] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-cream"
      >
        <GoogleIcon className="mr-2 h-4 w-4" />
        Continuer avec Google
      </Button>
    </AuthLayout>
  );
}