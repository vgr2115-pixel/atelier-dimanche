import { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Loader2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import AuthLayout, { authInputClass, authLabelClass } from "@/components/AuthLayout";
import AuthNotice from "@/components/auth/AuthNotice";
import GoogleIcon from "@/components/GoogleIcon";
import { safeReturnTo } from "@/lib/authReturnTo";
import { authErrorMessage } from "@/lib/authMessages";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const returnTo = safeReturnTo();
  const query = returnTo !== "/" ? "?returnTo=" + encodeURIComponent(returnTo) : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    if (password !== confirmPassword) {
      setError("Les deux mots de passe ne correspondent pas. Vérifiez votre saisie.");
      return;
    }
    setLoading(true);
    try {
      await base44.auth.register({ email, password });
      setShowOtp(true);
    } catch (err) {
      setError(authErrorMessage(err, "La création du compte a échoué. Réessayez dans un instant."));
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setError("");
    setNotice("");
    setLoading(true);
    try {
      const result = await base44.auth.verifyOtp({ email, otpCode });
      if (result?.access_token) {
        base44.auth.setToken(result.access_token);
      }
      window.location.href = returnTo;
    } catch (err) {
      setError(
        authErrorMessage(
          err,
          "Ce code n’est pas valide. Vérifiez les 6 chiffres reçus par email, il reste valable 10 minutes.",
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setNotice("");
    try {
      await base44.auth.resendOtp(email);
      setNotice(`Un nouveau code vient d’être envoyé à ${email}.`);
    } catch (err) {
      setError(authErrorMessage(err, "L’envoi du code a échoué. Réessayez dans un instant."));
    }
  };

  const handleGoogle = () => {
    base44.auth.loginWithProvider("google", returnTo);
  };

  if (showOtp) {
    return (
      <AuthLayout
        title="Vérifions votre email"
        subtitle={`Un code à 6 chiffres vient de partir vers ${email}. Il reste valable 10 minutes.`}
        footer={
          <button type="button" onClick={() => setShowOtp(false)} className="text-ink/60 underline-offset-4 hover:text-ink hover:underline">
            Modifier l’adresse email
          </button>
        }
      >
        <AuthNotice>{error}</AuthNotice>
        <AuthNotice tone="success">{notice}</AuthNotice>

        <div className="flex justify-center">
          <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode} autoFocus autoComplete="one-time-code">
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          type="button"
          onClick={handleVerify}
          disabled={loading || otpCode.length < 6}
          className="mt-7 h-12 w-full rounded-none bg-ink text-[11px] uppercase tracking-[0.22em] text-cream hover:bg-forest"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Vérification…
            </>
          ) : (
            "Valider mon compte"
          )}
        </Button>

        <p className="mt-5 text-center text-[12px] font-light text-ink/50">
          Rien reçu ?{" "}
          <button type="button" onClick={handleResend} className="border-b border-ink/30 pb-0.5 text-ink hover:border-ink">
            Renvoyer le code
          </button>
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Créer un compte"
      subtitle="Les comptes sont validés par l’atelier avant de donner accès à l’espace de gestion."
      footer={
        <>
          Vous avez déjà un compte ?{" "}
          <Link to={"/login" + query} className="border-b border-ink/30 pb-0.5 text-ink hover:border-ink">
            Se connecter
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
              placeholder="vous@exemple.fr"
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              Création…
            </>
          ) : (
            "Créer mon compte"
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