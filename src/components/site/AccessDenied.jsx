import { useAuth } from '@/lib/AuthContext';
import Container from '@/components/site/Container';
import Cta from '@/components/site/Cta';

export default function AccessDenied() {
  const { user, logout } = useAuth();

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream py-24">
      <Container className="max-w-xl text-center">
        <p className="eyebrow text-clay">Accès restreint</p>
        <h1 className="mt-6 font-heading text-3xl leading-tight text-ink sm:text-4xl">
          Votre demande d’accès est en attente de validation
        </h1>
        <p className="mt-5 text-ink/60 leading-relaxed">
          {user?.email ? `Le compte ${user.email} est enregistré` : 'Votre compte est enregistré'}, mais il n’a pas été
          autorisé par l’atelier. Aucune page du site n’est accessible depuis ce compte tant que l’accès n’a pas été
          accordé.
        </p>
        <div className="mt-9 flex justify-center">
          <Cta variant="outline" onClick={() => logout(true)}>
            Se déconnecter
          </Cta>
        </div>
      </Container>
    </main>
  );
}