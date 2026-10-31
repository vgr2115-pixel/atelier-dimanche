import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Loader2 } from "lucide-react";
import AuthLayout, { authInputClass, authLabelClass } from "@/components/AuthLayout";
import AuthNotice from "@/components/auth/AuthNotice";
import { authErrorMessage } from "@/lib/authMessages";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("Les deux mots de passe ne correspondent pas. Vérifiez votre saisie.");
      return;
    }
    setLoading(true);
    try {
      await base44.auth.resetPassword({ resetToken, newPassword });
      window.location.href = "/login";
    } catch (err) {
      setError(
        authErrorMessage(
          err,
          "Le mot de passe n’a pas pu être modifié. Le lien a peut-être expiré : demandez-en un nouveau.",
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  if (!resetToken) {
    return (
      <AuthLayout
        title="Lien incomplet"
        subtitle="Ce lien de réinitialisation est incomplet ou a déjà servi. Demandez-en un nouveau, il reste valable une heure."
        footer={
          <Link to="/forgot-password" className="border-b border-ink/30 pb-0.5 text-ink hover:border-ink">
            Demander un nouveau lien
          </Link>
        }
      >
        <AuthNotice>
          Ouvrez le lien directement depuis l’email reçu : il contient un jeton qui n’a pas été
          transmis ici.
        </AuthNotice>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Nouveau mot de passe"
      subtitle="Choisissez un mot de passe d’au moins 8 caractères, que vous n’utilisez nulle part ailleurs."
      footer={
        <Link to="/login" className="text-ink/60 hover:text-ink">
          Revenir à la connexion
        </Link>
      }
    >
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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
              Enregistrement…
            </>
          ) : (
            "Enregistrer le mot de passe"
          )}
        </Button>
      </form>
    </AuthLayout>
  );
}