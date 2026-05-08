import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const BUBBLE_SIZE = 56;
const SAFE_MARGIN = 16;
const CLICK_DISTANCE_THRESHOLD = 6;

export const WhatsAppFloat = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialized, setInitialized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const pointerOffsetRef = useRef({ x: 0, y: 0 });
  const dragDistanceRef = useRef(0);

  useEffect(() => {
    const x = Math.max(SAFE_MARGIN, window.innerWidth - BUBBLE_SIZE - SAFE_MARGIN);
    const y = Math.max(SAFE_MARGIN, window.innerHeight - BUBBLE_SIZE - SAFE_MARGIN);
    setPosition({ x, y });
    setInitialized(true);
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    dragDistanceRef.current = 0;
    pointerOffsetRef.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!isDragging) return;

    const rawX = event.clientX - pointerOffsetRef.current.x;
    const rawY = event.clientY - pointerOffsetRef.current.y;

    const minX = SAFE_MARGIN;
    const minY = SAFE_MARGIN;
    const maxX = Math.max(minX, window.innerWidth - BUBBLE_SIZE - SAFE_MARGIN);
    const maxY = Math.max(minY, window.innerHeight - BUBBLE_SIZE - SAFE_MARGIN);

    const nextX = Math.min(Math.max(rawX, minX), maxX);
    const nextY = Math.min(Math.max(rawY, minY), maxY);

    dragDistanceRef.current += Math.abs(nextX - position.x) + Math.abs(nextY - position.y);
    setPosition({ x: nextX, y: nextY });
  };

  const onPointerUp = () => {
    if (dragDistanceRef.current <= CLICK_DISTANCE_THRESHOLD) {
      navigate("/whatsapp-qr");
    }
    setIsDragging(false);
    dragDistanceRef.current = 0;
  };

  if (!initialized) return null;

  return (
    <div
      className="fixed z-50"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        aria-label="Open WhatsApp QR page"
        className="flex h-14 w-14 cursor-grab items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:scale-105 active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 fill-current">
          <path d="M19.05 4.94A9.86 9.86 0 0 0 12 2C6.49 2 2 6.49 2 12c0 1.76.46 3.49 1.34 5.02L2 22l5.09-1.33A9.95 9.95 0 0 0 12 22c5.51 0 10-4.49 10-10 0-2.67-1.04-5.18-2.95-7.06ZM12 20.29a8.28 8.28 0 0 1-4.2-1.15l-.3-.18-3.02.79.81-2.95-.2-.31A8.27 8.27 0 0 1 3.71 12c0-4.57 3.72-8.29 8.29-8.29 2.21 0 4.28.86 5.85 2.43a8.21 8.21 0 0 1 2.43 5.86c0 4.57-3.71 8.29-8.28 8.29Zm4.55-6.17c-.25-.13-1.48-.73-1.71-.82-.23-.08-.39-.13-.56.13-.16.25-.64.82-.79.99-.14.17-.28.2-.53.07-.25-.12-1.05-.39-2-1.24-.73-.64-1.23-1.43-1.37-1.67-.14-.24-.01-.37.1-.49.11-.1.25-.28.37-.42.12-.14.16-.24.24-.4.08-.17.04-.32-.02-.45-.06-.12-.56-1.35-.76-1.85-.2-.47-.4-.4-.56-.4h-.48c-.17 0-.45.06-.69.32-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.16 1.76 2.68 4.26 3.76 2.5 1.07 2.5.72 2.95.68.45-.04 1.48-.61 1.69-1.21.21-.6.21-1.11.15-1.21-.06-.1-.22-.17-.47-.3Z" />
        </svg>
      </button>

      <div
        className={`pointer-events-none absolute right-[72px] top-1/2 -translate-y-1/2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-base font-medium text-zinc-700 shadow-md transition-all duration-200 ${
          isHovered ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
        }`}
      >
        WhatsApp
      </div>
    </div>
  );
};
