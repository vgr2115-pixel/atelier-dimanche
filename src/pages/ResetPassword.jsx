import { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Loader2 } from "lucide-react";
import AuthLayout, { authInputClass, authLabelClass } from "@/components/AuthLayout";
import AuthNotice from "@/components/auth/AuthNotice";
import { authErrorMessage } from "@/lib/authMessages";

export default function ResetPassword() {
  const token = new URLSearchParams(window.location.search).get("token") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
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
      await base44.auth.resetPassword({ resetToken: token, newPassword: password });
      setDone(true);
    } catch (err) {
      setError(
        authErrorMessage(
          err,
          "Ce lien n’a pas pu être utilisé : il a peut-être expiré. Demandez-en un nouveau.",
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Nouveau mot de passe"
      subtitle="Choisissez le mot de passe qui accompagnera votre compte Atelier Dimanche."
      footer={
        <Link to="/login" className="border-b border-ink/30 pb-0.5 text-ink hover:border-ink">
          Revenir à la connexion
        </Link>
      }
    >
      {done ? (
        <div className="space-y-5">
          <AuthNotice tone="success">Votre mot de passe est enregistré.</AuthNotice>
          <Button
            type="button"
            onClick={() => {
              window.location.href = "/login";
            }}
            className="h-12 w-full rounded-none bg-ink text-[11px] uppercase tracking-[0.22em] text-cream hover:bg-forest"
          >
            Se connecter
          </Button>
        </div>
      ) : !token ? (
        <div className="space-y-4">
          <AuthNotice>
            Ce lien est incomplet ou a expiré. Demandez un nouveau lien depuis la page « Mot de passe
            oublié ».
          </AuthNotice>
          <Link
            to="/forgot-password"
            className="inline-block border-b border-ink/30 pb-0.5 text-[12px] text-ink hover:border-ink"
          >
            Demander un nouveau lien
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="password" className={authLabelClass}>
              Nouveau mot de passe
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
                autoFocus
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
                Enregistrement…
              </>
            ) : (
              "Enregistrer le mot de passe"
            )}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}