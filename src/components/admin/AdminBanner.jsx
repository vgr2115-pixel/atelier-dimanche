import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import AdminField from '@/components/admin/AdminField';
import { inputClass } from '@/components/admin/formUtils';

const asArray = (data) => (Array.isArray(data) ? data : data?.items ?? []);

const emptyForm = { enabled: false, messages: '', linkLabel: '', linkUrl: '' };

export default function AdminBanner() {
  const [settingsId, setSettingsId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    base44.entities.SiteSettings.list('created_date', 1).then((data) => {
      const current = asArray(data)[0];
      if (!current) return;
      setSettingsId(current.id);
      setForm({
        enabled: current.banner_enabled === true,
        messages: (current.banner_messages ?? []).join('\n'),
        linkLabel: current.banner_link_label ?? '',
        linkUrl: current.banner_link_url ?? '',
      });
    });
  }, []);

  const set = (key, value) => {
    setSaved(false);
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const save = async () => {
    setSaving(true);
    const payload = {
      banner_enabled: form.enabled,
      banner_messages: form.messages.split('\n').map((line) => line.trim()).filter(Boolean),
      banner_link_label: form.linkLabel.trim(),
      banner_link_url: form.linkUrl.trim(),
    };
    if (settingsId) {
      await base44.entities.SiteSettings.update(settingsId, payload);
    } else {
      const created = await base44.entities.SiteSettings.create({ journal_enabled: true, ...payload });
      setSettingsId(created.id);
    }
    setSaving(false);
    setSaved(true);
  };

  const previewMessages = form.messages.split('\n').map((line) => line.trim()).filter(Boolean);

  return (
    <div className="max-w-[720px]">
      <div className="mb-8 flex items-center justify-between gap-4 border border-ink/15 bg-linen/40 px-5 py-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-ink">Bandeau d’en-tête</p>
          <p className="mt-1.5 text-[12px] font-light leading-relaxed text-ink/50">
            {form.enabled
              ? 'Visible en haut de toutes les pages.'
              : 'Masqué. Les messages restent enregistrés.'}
          </p>
        </div>
        <label className="flex shrink-0 items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-ink/70">
          <Switch checked={form.enabled} onCheckedChange={(value) => set('enabled', value)} />
          {form.enabled ? 'Affiché' : 'Masqué'}
        </label>
      </div>

      <div className="space-y-5">
        <AdminField
          label="Messages"
          hint="Un message par ligne. S’ils sont plusieurs, ils défilent l’un après l’autre."
        >
          <Textarea
            aria-label="Messages du bandeau"
            rows={4}
            value={form.messages}
            onChange={(event) => set('messages', event.target.value)}
            className={inputClass}
            placeholder={'Commandes de Noël : dernières pièces en stock\nRetrait gratuit à l’atelier, 23 rue Burdeau'}
          />
        </AdminField>

        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Texte du lien" hint="Facultatif.">
            <Input
              aria-label="Texte du lien du bandeau"
              value={form.linkLabel}
              onChange={(event) => set('linkLabel', event.target.value)}
              className={inputClass}
              placeholder="Voir la boutique"
            />
          </AdminField>
          <AdminField label="Adresse du lien" hint="Chemin interne (/boutique) ou adresse complète.">
            <Input
              aria-label="Adresse du lien du bandeau"
              value={form.linkUrl}
              onChange={(event) => set('linkUrl', event.target.value)}
              className={inputClass}
              placeholder="/boutique"
            />
          </AdminField>
        </div>

        {previewMessages.length > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-ink/40">Aperçu</p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-forest px-5 py-2.5 text-center text-cream">
              <p className="text-[10px] uppercase leading-relaxed tracking-[0.16em]">
                {previewMessages[0]}
              </p>
              {form.linkUrl.trim() && (
                <span className="border-b border-cream/40 pb-0.5 text-[10px] uppercase tracking-[0.16em]">
                  {form.linkLabel.trim() || 'En savoir plus'}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 pt-1">
          <Button
            type="button"
            onClick={save}
            disabled={saving}
            className="rounded-none bg-ink text-[11px] uppercase tracking-[0.2em] text-cream hover:bg-forest"
          >
            {saving ? 'Enregistrement…' : 'Enregistrer'}
          </Button>
          {saved && (
            <span className="text-[11px] uppercase tracking-[0.16em] text-forest/80">
              Bandeau mis à jour
            </span>
          )}
        </div>
      </div>
    </div>
  );
}