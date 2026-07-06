export const WHATSAPP_PHONE_DISPLAY = "+86 137 1147 3002";
export const WHATSAPP_QR_IMAGE = "/whatsapp-qr.png";

const WHATSAPP_PHONE_DIGITS = "8613711473002";

export const buildWhatsAppUrl = (message?: string) => {
  const url = `https://wa.me/${WHATSAPP_PHONE_DIGITS}`;
  const text = message?.trim();

  return text ? `${url}?text=${encodeURIComponent(text)}` : url;
};
