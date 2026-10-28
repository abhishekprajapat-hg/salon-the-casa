'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { bookingDefaultImg, pad } from '@/lib/data';
import { serviceCategories } from '@/lib/services';
import { hasPhone, hasWhatsApp, telDigits, waLink } from '@/lib/site';
import { Arrow } from '../Icons';

type Form = { service: string; date: string; time: string; name: string; phone: string; notes: string };
type Errors = Partial<Record<keyof Form, string>>;

const bookingServices = serviceCategories.map((c) => ({ slug: c.slug, label: c.name, img: c.img }));

const slots = [
  { label: 'Morning', range: 'before 12' },
  { label: 'Afternoon', range: '12 – 4' },
  { label: 'Evening', range: 'after 4' },
];

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

function validate(f: Form): Errors {
  const e: Errors = {};
  if (!f.service) e.service = 'Choose the service you’d like.';
  if (!f.date) e.date = 'Pick a preferred date.';
  else if (f.date < todayISO()) e.date = 'That date has passed — choose today or later.';
  if (!f.time) e.time = 'Pick a time of day.';
  if (f.name.trim().length < 2) e.name = 'Enter your name.';
  const digits = f.phone.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) e.phone = 'Enter a phone number we can reach you on (7–15 digits).';
  return e;
}

export default function BookingForm() {
  const [f, setF] = useState<Form>({ service: '', date: '', time: '', name: '', phone: '', notes: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [tried, setTried] = useState(false);
  const [done, setDone] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const formTop = useRef<HTMLDivElement>(null);

  // Pre-fill from links like /book?service=beard&option=Goatee
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const svc = bookingServices.find((s) => s.slug === q.get('service'));
    const option = q.get('option');
    if (svc || option) {
      setF((prev) => ({
        ...prev,
        service: svc ? svc.label : prev.service,
        notes: option && !prev.notes ? `Interested in: ${option}` : prev.notes,
      }));
    }
  }, []);

  const update = (k: keyof Form, v: string) => {
    const nf = { ...f, [k]: v };
    setF(nf);
    setErrors(tried ? validate(nf) : {});
  };

  const fmtDate = f.date
    ? new Date(f.date + 'T12:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
    : '—';
  const svc = bookingServices.find((s) => s.label === f.service);

  const message = useMemo(
    () =>
      [
        'Hello Salon The Casa, I’d like to request an appointment.',
        'Service: ' + (f.service || '-'),
        'Date: ' + fmtDate,
        'Time: ' + (f.time || '-'),
        'Name: ' + f.name.trim(),
        'Phone: ' + f.phone.trim(),
        ...(f.notes.trim() ? ['Notes: ' + f.notes.trim()] : []),
      ].join('\n'),
    [f, fmtDate],
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(f);
    setTried(true);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setShakeKey((k) => k + 1);
      formTop.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    // INTEGRATION POINT: when a booking backend/provider exists, POST the request here
    // and show "confirmed" only after it responds. Until then we hand off via WhatsApp/phone.
    setDone(true);
    formTop.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const errCount = Object.keys(errors).length;

  return (
    <div className="book">
      <div ref={formTop} style={{ scrollMarginTop: 110 }}>
        {!done ? (
          <form className="bk-form" noValidate onSubmit={submit} aria-describedby="form-note">
            {tried && errCount > 0 && (
              <div key={shakeKey} role="alert" className="alert shake">
                Please check the highlighted fields — {errCount} still {errCount === 1 ? 'needs' : 'need'} attention.
              </div>
            )}

            <fieldset className="bk-fs">
              <legend className="bk-legend"><span>STEP 01</span>Choose a service</legend>
              <div className="svc-opts">
                {bookingServices.map((s, i) => (
                  <button key={s.label} type="button" className="slot svc-opt" aria-pressed={f.service === s.label} onClick={() => update('service', s.label)}>
                    <span>{s.label}</span><small>{pad(i)}</small>
                  </button>
                ))}
              </div>
              {errors.service && <p className="err">{errors.service}</p>}
            </fieldset>

            <fieldset className="bk-fs">
              <legend className="bk-legend"><span>STEP 02</span>Preferred date &amp; time</legend>
              <div className="two">
                <div className="field">
                  <label htmlFor="f-date" className="field-lbl">Date</label>
                  <input id="f-date" className="inp" type="date" min={todayISO()} value={f.date} onChange={(e) => update('date', e.target.value)} aria-invalid={!!errors.date} aria-describedby={errors.date ? 'e-date' : undefined} required />
                  {errors.date && <p id="e-date" className="err">{errors.date}</p>}
                </div>
                <div className="field" style={{ gap: 10 }}>
                  <span id="time-l" className="field-lbl">Time of day</span>
                  <div role="group" aria-labelledby="time-l" className="time-grid">
                    {slots.map((t) => (
                      <button key={t.label} type="button" className="slot time-opt" aria-pressed={f.time === t.label} onClick={() => update('time', t.label)}>
                        <b>{t.label}</b><small>{t.range}</small>
                      </button>
                    ))}
                  </div>
                  {errors.time && <p className="err">{errors.time}</p>}
                </div>
              </div>
            </fieldset>

            <fieldset className="bk-fs">
              <legend className="bk-legend"><span>STEP 03</span>Your details</legend>
              <div className="two">
                <div className="field">
                  <label htmlFor="f-name" className="field-lbl">Full name</label>
                  <input id="f-name" className="inp" type="text" autoComplete="name" placeholder="Your name" value={f.name} onChange={(e) => update('name', e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'e-name' : undefined} required />
                  {errors.name && <p id="e-name" className="err">{errors.name}</p>}
                </div>
                <div className="field">
                  <label htmlFor="f-phone" className="field-lbl">Phone number</label>
                  <input id="f-phone" className="inp" type="tel" inputMode="tel" autoComplete="tel" placeholder="Mobile with country code" value={f.phone} onChange={(e) => update('phone', e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'e-phone' : undefined} required />
                  {errors.phone && <p id="e-phone" className="err">{errors.phone}</p>}
                </div>
              </div>
              <div className="field">
                <label htmlFor="f-notes" className="field-lbl">Notes <em>(optional)</em></label>
                <textarea id="f-notes" className="inp" rows={3} placeholder="Current length, a reference cut, beard goals, a preferred barber…" value={f.notes} onChange={(e) => update('notes', e.target.value)} />
              </div>
            </fieldset>

            <p className="form-note-m">This is a request, not a confirmed booking — the salon will get back to you to confirm.</p>
            <div className="submit-row">
              <button type="submit" className="btn btn-dark btn-xl">Request appointment <Arrow /></button>
              <p id="form-note" className="form-note">This is a request, not a confirmed booking. The salon will get back to you to confirm.</p>
            </div>
          </form>
        ) : (
          <div role="status" className="done fade">
            <div className="done-tag">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M12 7v5l3 2M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z" /></svg>
              Request ready — not yet confirmed
            </div>
            <h2 className="serif">Almost there, {f.name.trim().split(/\s+/)[0] || 'friend'}.</h2>
            <p>
              {hasWhatsApp
                ? 'Nothing has been booked yet. Send this request on WhatsApp and the salon will reply to confirm your slot.'
                : 'Nothing has been booked or sent yet — online booking isn’t connected. Please call or message the salon with these details to confirm.'}
            </p>
            <dl>
              <div><dt>Service</dt><dd>{f.service}</dd></div>
              <div><dt>Date</dt><dd>{fmtDate}</dd></div>
              <div><dt>Time</dt><dd>{f.time}</dd></div>
            </dl>
            <div className="done-actions">
              {hasWhatsApp && (
                <a className="btn btn-dark" href={waLink(message)} target="_blank" rel="noopener" style={{ gap: 12 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" /></svg>
                  Send on WhatsApp
                </a>
              )}
              {hasPhone && <a className="btn btn-outline-dark" href={'tel:' + telDigits}>Call the salon</a>}
              <button type="button" className="btn btn-outline-soft" onClick={() => setDone(false)}>Edit request</button>
            </div>
            {!hasWhatsApp && !hasPhone && (
              <p className="no-channel">Setup needed: no WhatsApp number or phone is configured yet, so this request can’t be sent. Add them in <code>lib/site.ts</code>.</p>
            )}
          </div>
        )}
      </div>

      <aside className="book-aside" aria-label="Your request">
        <div className="aside-k">Your request</div>
        <div className="aside-rows">
          <div className="aside-row"><span>Service</span><span>{f.service || '—'}</span></div>
          <div className="aside-row"><span>Date</span><span>{fmtDate}</span></div>
          <div className="aside-row"><span>Time</span><span>{f.time || '—'}</span></div>
        </div>
        <div className="aside-img"><Image key={svc?.img ?? 'default'} className="fade" src={svc?.img ?? bookingDefaultImg} alt="" fill sizes="(max-width: 960px) 100vw, 30vw" /></div>
        <p className="aside-p">Prefer to talk? <a className="ul gold" href="#contact">Call or message the salon</a>.</p>
      </aside>
    </div>
  );
}
