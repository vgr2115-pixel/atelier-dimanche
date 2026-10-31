import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

const asArray = (data) => (Array.isArray(data) ? data : data?.items ?? []);

const makeReference = () =>
  `DIM-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const {
      workshop_slug,
      session_id,
      participants,
      customer_name,
      customer_email,
      customer_phone,
      notes,
    } = body ?? {};

    const seats = Number(participants);
    if (!workshop_slug || !session_id) {
      return Response.json({ error: 'Atelier ou date manquante.' }, { status: 400 });
    }
    if (!String(customer_name ?? '').trim() || !String(customer_email ?? '').trim()) {
      return Response.json({ error: 'Nom et email obligatoires.' }, { status: 400 });
    }
    if (!Number.isInteger(seats) || seats < 1 || seats > 6) {
      return Response.json({ error: 'Nombre de participants invalide.' }, { status: 400 });
    }

    const workshops = asArray(
      await base44.asServiceRole.entities.Workshop.filter({ slug: workshop_slug }),
    );
    const workshop = workshops.find((item) => item.is_active !== false);
    if (!workshop) {
      return Response.json({ error: 'Atelier introuvable.' }, { status: 404 });
    }

    const session = await base44.asServiceRole.entities.WorkshopSession.get(session_id).catch(
      (error) => (error.status === 404 ? null : Promise.reject(error)),
    );
    if (!session || session.workshop_slug !== workshop.slug) {
      return Response.json({ error: 'Date introuvable.' }, { status: 404 });
    }

    const spotsTotal = session.spots_total || 6;
    const spotsTaken = session.spots_taken || 0;
    const left = Math.max(0, spotsTotal - spotsTaken);
    if (left < seats) {
      return Response.json(
        { error: `Il ne reste que ${left} place${left > 1 ? 's' : ''} sur cette date.` },
        { status: 409 },
      );
    }

    const total = (workshop.price ?? 0) * seats;
    const reference = makeReference();

    await base44.asServiceRole.entities.Booking.create({
      reference,
      workshop_slug: workshop.slug,
      workshop_name: workshop.name,
      session_id: session.id,
      session_date: session.date,
      session_time: session.time,
      participants: seats,
      total,
      customer_name: String(customer_name).trim(),
      customer_email: String(customer_email).trim(),
      customer_phone: String(customer_phone ?? '').trim(),
      notes: String(notes ?? '').trim(),
      status: 'demande',
    });

    await base44.asServiceRole.entities.WorkshopSession.update(session.id, {
      spots_taken: spotsTaken + seats,
    });

    return Response.json({
      reference,
      workshop_name: workshop.name,
      session_date: session.date,
      session_time: session.time,
      participants: seats,
      total,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}