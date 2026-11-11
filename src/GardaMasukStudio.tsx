import React, { useState } from 'react';

type ViewState = 'LANDING' | 'LOGIN' | 'OTP_VERIFY';

type SubscriptionPackage = {
  id: string;
  name: string;
  badge: string;
  price: string;
  credits: string;
  features: string[];
  accent: string;
  featured?: boolean;
};

const SUBSCRIPTION_PACKAGES: SubscriptionPackage[] = [
  {
    id: 'plan_free',
    name: 'Paket Free',
    badge: 'GRATIS RESMI',
    price: 'Rp 0',
    credits: '250 Kredit AI',
    features: [
      '1 Proyek Film Aktif Mandiri',
      'Gratis 5x Musik Prosedural Harian',
      'Retensi Audio 48 Jam & Ekspor Mandiri',
      '10 Master Karakter & 10 Master Lokasi',
      'Ekspor .rara Portabel (Penyimpanan Lokal)',
    ],
    accent: 'border-slate-700 bg-slate-950/40',
  },
  {
    id: 'plan_creator',
    name: 'Paket Creator',
    badge: 'KREATOR INDIVIDU',
    price: 'Rp 199.000',
    credits: '2.500 Kredit AI',
    features: [
      '5 Proyek Film Mandiri Simultan',
      'Resolusi 720p 24FPS Omni 1.1 Flash',
      'Katalog Suara Wavenet ID Lengkap (14 Bahasa)',
      'Multi-Track Audio Dubbing & Lipsync',
      'Penyimpanan Mandiri (No Duplicate Media)',
    ],
    accent: 'border-cyan-900 bg-cyan-950/20',
  },
  {
    id: 'plan_professional',
    name: 'Paket Professional',
    badge: 'POPULAR • PRODUKSI INTENSIF',
    price: 'Rp 599.000',
    credits: '10.000 Kredit AI',
    features: [
      '15 Proyek Film Layar Lebar Aktif',
      'DCI Cinema Profile 1080p 24FPS Rec.709',
      'Unduh Master WAV PCM 16-bit',
      'Advanced Film Editing Multi-Layer (FFmpeg)',
      'Dukungan Model Veo 3.1 Fast & Nano Banana Pro',
    ],
    accent: 'border-[#B8860B] bg-amber-950/20',
    featured: true,
  },
  {
    id: 'plan_studio',
    name: 'Paket Studio',
    badge: 'KAPASITAS BESAR',
    price: 'Rp 1.499.000',
    credits: '35.000 Kredit AI',
    features: [
      '50 Proyek Layar Lebar & Produksi Tim',
      'Akses Penuh Seluruh Model (Veo 3.1 Quality)',
      'Music Creation Studio Penuh (11 Stem SFX)',
      'Enemy Faction Guard & Antagonist Style Lock',
      'Dedicated Batch Render & Dukungan 24/7',
    ],
    accent: 'border-purple-900 bg-purple-950/20',
  },
];

const wait = (milliseconds: number) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

export const GardaMasukStudio: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('LANDING');
  const [emailInput, setEmailInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [authStepMessage, setAuthStepMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const selectedPlan = SUBSCRIPTION_PACKAGES.find((pkg) => pkg.id === selectedPackage);

  const openLogin = (packageId?: string) => {
    setSelectedPackage(packageId ?? null);
    setAuthStepMessage(null);
    setViewState('LOGIN');
  };

  const returnHome = () => {
    setViewState('LANDING');
    setAuthStepMessage(null);
    setIsProcessing(false);
  };

  // Demo-only flow: this does not authenticate with Google or send a WhatsApp OTP.
  const handleGoogleSignInMock = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailInput.trim()) {
      setAuthStepMessage('Masukkan alamat email terlebih dahulu.');
      return;
    }

    setIsProcessing(true);
    setAuthStepMessage('Simulasi: memeriksa format email dan menyiapkan permintaan akses...');
    await wait(900);
    setAuthStepMessage('Simulasi: menunggu persetujuan pemilik studio...');
    await wait(1200);
    setAuthStepMessage('Demo siap. Masukkan kode 6 digit apa pun untuk melanjutkan.');
    await wait(700);
    setIsProcessing(false);
    setAuthStepMessage(null);
    setViewState('OTP_VERIFY');
  };

  const handleVerifyOtpMock = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(otpInput)) {
      setAuthStepMessage('Kode demo harus terdiri dari 6 angka.');
      return;
    }

    setIsProcessing(true);
    setAuthStepMessage('Simulasi: memverifikasi kode dan menyiapkan sesi...');
    await wait(1200);
    setIsProcessing(false);
    setAuthStepMessage('Login demo berhasil. Integrasi autentikasi backend belum diaktifkan.');
  };

  return (
    <div className="min-h-screen bg-[#07050e] font-mono text-xs text-slate-200 selection:bg-[#B8860B] selection:text-black">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#241d38] bg-[#0b0914]/90 px-4 py-3 backdrop-blur-md sm:px-8">
        <a href="#home" onClick={returnHome} className="flex items-center gap-2 no-underline">
          <span className="font-serif text-sm font-black tracking-wider text-[#D4AF37]">@RARASTUDIO</span>
          <span className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">V1.1 PROD</span>
        </a>
        {viewState === 'LANDING' ? (
          <button onClick={() => openLogin()} className="rounded-xl bg-gradient-to-r from-[#B8860B] to-amber-500 px-4 py-2 font-black uppercase text-black transition hover:brightness-110 active:scale-95">
            Masuk Studio
          </button>
        ) : (
          <button onClick={returnHome} className="text-slate-400 transition hover:text-white">← Kembali ke Beranda</button>
        )}
      </header>

      {viewState === 'LANDING' && (
        <main id="home" className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-8">
          <section className="mx-auto max-w-3xl space-y-5 text-center">
            <p className="text-[10px] font-black tracking-[0.3em] text-[#D4AF37]">APLIKASI PRODUKSI SINEMATIK MANDIRI</p>
            <h1 className="font-serif text-3xl font-black leading-tight text-white sm:text-5xl">Menghidupkan imajinasi lewat lensa dan realita.</h1>
            <p className="font-serif text-sm leading-7 text-slate-400">Studio reka visual mandiri untuk pengerjaan film berdurasi panjang, storyboard, tata panggung, produksi musik, dubbing, dan sound design dalam satu ekosistem terpadu.</p>
            <p className="pt-1 text-[10px] font-bold tracking-wider text-[#25D366]">✨ Ranatik (Cinematic) | Nyatagrafi (Photorealistic) | Rananada (Sonic)</p>
          </section>

          <section className="space-y-6">
            <div className="text-center">
              <h2 className="font-serif text-xl font-bold text-white">PILIHAN PAKET AKSES PRODUKSI</h2>
              <p className="mt-2 text-[11px] text-slate-500">Transparansi alokasi kredit tanpa manipulasi, dijamin oleh prinsip No Duplicate Storage.</p>
            </div>
            <div className="grid grid-cols-1 items-stretch gap-6 pt-4 md:grid-cols-2 lg:grid-cols-4">
              {SUBSCRIPTION_PACKAGES.map((pkg) => (
                <article key={pkg.id} className={`flex flex-col justify-between rounded-2xl border-2 p-5 transition hover:-translate-y-1 hover:border-amber-500/60 ${pkg.accent} ${pkg.featured ? 'shadow-[0_0_30px_rgba(184,134,11,0.18)] lg:scale-[1.03]' : ''}`}>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-serif text-base font-black text-white">{pkg.name}</h3>
                      <span className="mt-2 inline-block rounded border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-black tracking-wider text-slate-300">{pkg.badge}</span>
                    </div>
                    <div className="border-y border-slate-800/80 py-3">
                      <div className="font-serif text-xl font-black text-white">{pkg.price}<span className="ml-1 text-[10px] font-normal text-slate-500">/ bln</span></div>
                      <div className="mt-1 font-bold text-emerald-400">💰 Kuota: {pkg.credits}</div>
                    </div>
                    <ul className="space-y-3 pl-0 text-[11px] leading-5 text-slate-400">
                      {pkg.features.map((feature) => <li key={feature} className="flex items-start gap-2"><span className="shrink-0 text-emerald-500">✓</span><span>{feature}</span></li>)}
                    </ul>
                  </div>
                  <button onClick={() => openLogin(pkg.id)} className="mt-6 w-full rounded-xl border border-current py-2.5 text-[10px] font-black uppercase tracking-wider transition hover:bg-white/5">Pilih Paket ini</button>
                </article>
              ))}
            </div>
          </section>
          <footer className="border-t border-[#241d38] pt-5 text-center text-[10px] text-slate-600">RARA STUDIO · Ruang berkarya untuk cerita yang lebih besar.</footer>
        </main>
      )}

      {viewState === 'LOGIN' && (
        <main className="mx-auto max-w-md px-4 py-16 sm:py-20">
          <section className="space-y-6 rounded-3xl border-2 border-[#B8860B]/70 bg-[#0b0914] p-6 shadow-2xl sm:p-8">
            <div className="space-y-2 text-center">
              <p className="text-[10px] font-black tracking-[0.25em] text-[#D4AF37]">RARA SECURITY HANDSHAKE MODE</p>
              <h1 className="font-serif text-xl font-black tracking-wide text-white">OTENTIKASI GERBANG MASUK</h1>
              {selectedPlan && <p className="text-slate-400">Paket pilihan: <span className="font-bold text-amber-300">{selectedPlan.name}</span></p>}
            </div>
            <div role="status" className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-center leading-5 text-amber-200">
              Demo antarmuka saja — Google Sign-In, persetujuan WhatsApp, dan pengiriman OTP belum terhubung.
            </div>
            {authStepMessage && <div role="status" className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-center leading-5 text-slate-200">{authStepMessage}</div>}
            <form onSubmit={handleGoogleSignInMock} className="space-y-4">
              <label className="block space-y-2">
                <span className="text-slate-300">Alamat email</span>
                <input type="email" autoComplete="email" required value={emailInput} onChange={(event) => setEmailInput(event.target.value)} placeholder="nama@email.com" className="w-full rounded-xl border border-slate-700 bg-[#07050e] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-amber-500" />
              </label>
              <button type="submit" disabled={isProcessing} className="w-full rounded-xl bg-gradient-to-r from-[#B8860B] to-amber-500 px-4 py-3 font-black uppercase tracking-wider text-black transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60">{isProcessing ? 'Memproses...' : 'Lanjutkan dengan email (Demo)'}</button>
            </form>
            <p className="text-center text-[10px] leading-5 text-slate-500">Dengan melanjutkan, Anda menyetujui bahwa alur masuk pada halaman ini masih berupa simulasi.</p>
          </section>
        </main>
      )}

      {viewState === 'OTP_VERIFY' && (
        <main className="mx-auto max-w-md px-4 py-16 sm:py-20">
          <section className="space-y-6 rounded-3xl border-2 border-[#B8860B]/70 bg-[#0b0914] p-6 shadow-2xl sm:p-8">
            <div className="space-y-2 text-center">
              <p className="text-[10px] font-black tracking-[0.25em] text-[#D4AF37]">LANGKAH 02 · DEMO</p>
              <h1 className="font-serif text-xl font-black text-white">VERIFIKASI KODE</h1>
              <p className="text-slate-400">Kode demo untuk <span className="text-slate-200">{emailInput}</span></p>
            </div>
            <div role="status" className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-center leading-5 text-amber-200">Tidak ada OTP yang dikirim. Masukkan 6 angka apa pun untuk mencoba tampilan demo.</div>
            {authStepMessage && <div role="status" className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-center leading-5 text-slate-200">{authStepMessage}</div>}
            <form onSubmit={handleVerifyOtpMock} className="space-y-4">
              <label className="block space-y-2">
                <span className="text-slate-300">Kode verifikasi 6 angka</span>
                <input inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required value={otpInput} onChange={(event) => setOtpInput(event.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="••••••" className="w-full rounded-xl border border-slate-700 bg-[#07050e] px-4 py-3 text-center text-xl tracking-[0.5em] text-white outline-none transition placeholder:text-slate-600 focus:border-amber-500" />
              </label>
              <button type="submit" disabled={isProcessing} className="w-full rounded-xl bg-gradient-to-r from-[#B8860B] to-amber-500 px-4 py-3 font-black uppercase tracking-wider text-black transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60">{isProcessing ? 'Memverifikasi...' : 'Verifikasi (Demo)'}</button>
              <button type="button" onClick={() => { setViewState('LOGIN'); setAuthStepMessage(null); setOtpInput(''); }} className="w-full py-2 text-slate-400 transition hover:text-white">← Ubah email</button>
            </form>
          </section>
        </main>
      )}
    </div>
  );
};

export default GardaMasukStudio;
