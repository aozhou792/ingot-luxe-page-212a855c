import { Link } from "react-router-dom";

const QR_CODE_URL = "/whatsapp-qr.png";

const WhatsAppQrPage = () => {
  return (
    <div className="min-h-screen bg-[#f0ece8] px-4 py-8 text-[#111b21]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
              <path d="M19.05 4.94A9.86 9.86 0 0 0 12 2C6.49 2 2 6.49 2 12c0 1.76.46 3.49 1.34 5.02L2 22l5.09-1.33A9.95 9.95 0 0 0 12 22c5.51 0 10-4.49 10-10 0-2.67-1.04-5.18-2.95-7.06ZM12 20.29a8.28 8.28 0 0 1-4.2-1.15l-.3-.18-3.02.79.81-2.95-.2-.31A8.27 8.27 0 0 1 3.71 12c0-4.57 3.72-8.29 8.29-8.29 2.21 0 4.28.86 5.85 2.43a8.21 8.21 0 0 1 2.43 5.86c0 4.57-3.71 8.29-8.28 8.29Zm4.55-6.17c-.25-.13-1.48-.73-1.71-.82-.23-.08-.39-.13-.56.13-.16.25-.64.82-.79.99-.14.17-.28.2-.53.07-.25-.12-1.05-.39-2-1.24-.73-.64-1.23-1.43-1.37-1.67-.14-.24-.01-.37.1-.49.11-.1.25-.28.37-.42.12-.14.16-.24.24-.4.08-.17.04-.32-.02-.45-.06-.12-.56-1.35-.76-1.85-.2-.47-.4-.4-.56-.4h-.48c-.17 0-.45.06-.69.32-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.16 1.76 2.68 4.26 3.76 2.5 1.07 2.5.72 2.95.68.45-.04 1.48-.61 1.69-1.21.21-.6.21-1.11.15-1.21-.06-.1-.22-.17-.47-.3Z" />
            </svg>
          </div>
          <span className="text-xl font-semibold">WhatsApp</span>
        </div>

        <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-300 bg-white p-8 shadow-sm">
          <div className="grid gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <h1 className="mb-5 text-3xl font-semibold">Log in to WhatsApp Web</h1>
              <ol className="space-y-3 text-base text-zinc-700">
                <li>1. Open WhatsApp on your phone.</li>
                <li>2. Tap Menu or Settings and choose Linked Devices.</li>
                <li>3. Tap Link a Device and scan this QR code.</li>
              </ol>
              <p className="mt-6 text-sm text-zinc-500">
                Keep this page open while scanning to sign in quickly.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <img src={QR_CODE_URL} alt="WhatsApp login QR code" className="h-64 w-64 rounded-lg" />
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm font-medium text-[#128C7E] hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppQrPage;
