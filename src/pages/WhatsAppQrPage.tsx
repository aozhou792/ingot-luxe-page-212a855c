import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { WHATSAPP_CONTACT_NAME, WHATSAPP_PHONE_DISPLAY, WHATSAPP_QR_IMAGE } from "@/lib/whatsapp";

const WhatsAppQrPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#25D366] via-[#1FBE5C] to-[#10A852] px-4 py-10 sm:py-14">
      <Seo
        title="WhatsApp QR | Alibarbar Australia"
        description="Private WhatsApp QR contact page for Alibarbar Australia orders."
        path="/whatsapp-qr"
        noindex
      />
      <div className="mx-auto flex max-w-md flex-col items-center">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#25D366]">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
              <path d="M19.05 4.94A9.86 9.86 0 0 0 12 2C6.49 2 2 6.49 2 12c0 1.76.46 3.49 1.34 5.02L2 22l5.09-1.33A9.95 9.95 0 0 0 12 22c5.51 0 10-4.49 10-10 0-2.67-1.04-5.18-2.95-7.06ZM12 20.29a8.28 8.28 0 0 1-4.2-1.15l-.3-.18-3.02.79.81-2.95-.2-.31A8.27 8.27 0 0 1 3.71 12c0-4.57 3.72-8.29 8.29-8.29 2.21 0 4.28.86 5.85 2.43a8.21 8.21 0 0 1 2.43 5.86c0 4.57-3.71 8.29-8.28 8.29Zm4.55-6.17c-.25-.13-1.48-.73-1.71-.82-.23-.08-.39-.13-.56.13-.16.25-.64.82-.79.99-.14.17-.28.2-.53.07-.25-.12-1.05-.39-2-1.24-.73-.64-1.23-1.43-1.37-1.67-.14-.24-.01-.37.1-.49.11-.1.25-.28.37-.42.12-.14.16-.24.24-.4.08-.17.04-.32-.02-.45-.06-.12-.56-1.35-.76-1.85-.2-.47-.4-.4-.56-.4h-.48c-.17 0-.45.06-.69.32-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.16 1.76 2.68 4.26 3.76 2.5 1.07 2.5.72 2.95.68.45-.04 1.48-.61 1.69-1.21.21-.6.21-1.11.15-1.21-.06-.1-.22-.17-.47-.3Z" />
            </svg>
          </div>
          <span className="text-xl font-semibold text-white">WhatsApp</span>
        </div>

        <div className="w-full rounded-[2rem] bg-white p-6 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.4)] sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 text-3xl font-semibold text-zinc-600 ring-4 ring-white uppercase">
              {WHATSAPP_CONTACT_NAME.charAt(0)}
            </div>
            <h1 className="mt-4 text-2xl font-bold text-zinc-900">{WHATSAPP_CONTACT_NAME}</h1>
            <p className="mt-1 text-sm text-zinc-500">{WHATSAPP_PHONE_DISPLAY}</p>

            <div className="mt-6 w-full rounded-2xl bg-white p-3 sm:p-4">
              <img
                src={WHATSAPP_QR_IMAGE}
                alt={`${WHATSAPP_CONTACT_NAME} WhatsApp contact QR code`}
                className="mx-auto block aspect-square w-full max-w-xs object-contain"
                draggable={false}
              />
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-base font-medium leading-relaxed text-white sm:text-lg">
          Scan this QR code with your WhatsApp camera
          <br />
          to add me as a contact and place your order
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-bold uppercase tracking-[0.18em] text-[#10A852] shadow-lg transition-all hover:bg-zinc-50"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default WhatsAppQrPage;
