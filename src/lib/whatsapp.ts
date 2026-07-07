export const WHATSAPP_PHONE_DISPLAY = "+86 176 8897 1179";
export const WHATSAPP_QR_IMAGE = "/whatsapp-qr.png";
export const WHATSAPP_CONTACT_NAME = "cool";

const WHATSAPP_PHONE_DIGITS = "8617688971179";

export const wholesaleContacts = [
  {
    name: WHATSAPP_CONTACT_NAME,
    phone: WHATSAPP_PHONE_DISPLAY,
  },
] as const;

export const buildWhatsAppUrl = (message?: string) => {
  const url = `https://wa.me/${WHATSAPP_PHONE_DIGITS}`;
  const text = message?.trim();

  return text ? `${url}?text=${encodeURIComponent(text)}` : url;
};
