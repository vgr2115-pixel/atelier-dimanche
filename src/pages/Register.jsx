import { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Loader2, ArrowLeft } from "lucide-react";
import AuthLayout, { authInputClass, authLabelClass } from "@/components/AuthLayout";
import AuthNotice from "@/components/auth/AuthNotice";
import { safeReturnTo } from "@/lib/authReturnTo";
import { authErrorMessage } from "@/lib/authMessages";

export default function Register() {
  const [step, setStep] = useState("form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const returnTo = safeReturnTo();

  const submitForm = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Choisissez un mot de passe d’au moins 8 caractères.");
      return;
    }
    if (password !== confirm) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    try {
      await base44.auth.register({ email, password });
      setStep("code");
      setInfo(`Un code à 6 chiffres vient d’être envoyé à ${email}. Il reste valable 10 minutes.`);
    } catch (err) {
      setError(authErrorMessage(err, "La création du compte a échoué. Réessayez dans un instant."));
    } finally {
      setLoading(false);
    }
  };

  const submitCode = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await base44.auth.verifyOtp({ email, otpCode: code.trim() });
      base44.auth.setToken(res.access_token);
      window.location.href = returnTo;
    } catch (err) {
      setError(authErrorMessage(err, "Ce code n’a pas été accepté. Vérifiez-le, ou demandez-en un nouveau."));
      setLoading(false);
    }
  };

  const resendCode = async () => {
    setError("");
    setInfo("");
    try {
      await base44.auth.resendOtp(email);
      setInfo(`Un nouveau code a été envoyé à ${email}.`);
    } catch (err) {
      setError(authErrorMessage(err, "Impossible de renvoyer le code pour le moment."));
    }
  };

  return (
    <AuthLayout
      title={step === "form" ? "Activer mon accès" : "Vérifier mon adresse"}
      subtitle={
        step === "form"
          ? "Réservé à l’atelier. Utilisez l’adresse email invitée par Atelier Dimanche, puis choisissez votre mot de passe."
          : "Saisissez le code à 6 chiffres reçu par email pour activer le compte."
      }
      footer={
        <Link to={"/login"} className="border-b border-ink/30 pb-0.5 text-ink hover:border-ink">
          J’ai déjà un compte — se connecter
        </Link>
      }
    >
      {step === "form" ? (
        <form onSubmit={submitForm} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className={authLabelClass}>
              Adresse email invitée
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
            <Label htmlFor="password" className={authLabelClass}>
              Mot de passe
            </Label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="8 caractères minimum"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={authInputClass}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm" className={authLabelClass}>
              Confirmer le mot de passe
            </Label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <Input
                id="confirm"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
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
                Envoi…
              </>
            ) : (
              "Recevoir mon code"
            )}
          </Button>
        </form>
      ) : (
        <form onSubmit={submitCode} className="space-y-5">
          <AuthNotice tone="success">{info}</AuthNotice>

          <div className="space-y-2">
            <Label htmlFor="code" className={authLabelClass}>
              Code à 6 chiffres
            </Label>
            <Input
              id="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              autoFocus
              placeholder="000000"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              className="h-12 rounded-none border-ink/20 bg-cream text-center text-[20px] tracking-[0.4em] text-ink focus-visible:border-ink focus-visible:ring-forest"
              required
            />
          </div>

          <AuthNotice>{error}</AuthNotice>

          <Button
            type="submit"
            disabled={loading || code.length !== 6}
            className="h-12 w-full rounded-none bg-ink text-[11px] uppercase tracking-[0.22em] text-cream hover:bg-forest"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Vérification…
              </>
            ) : (
              "Activer mon compte"
            )}
          </Button>

          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={resendCode}
              className="text-[11px] font-light text-ink/50 transition-colors hover:text-ink"
            >
              Renvoyer le code
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("form");
                setError("");
                setInfo("");
                setCode("");
              }}
              className="inline-flex items-center gap-1.5 text-[11px] font-light text-ink/50 transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-3 w-3" strokeWidth={1.5} />
              Changer d’adresse
            </button>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}