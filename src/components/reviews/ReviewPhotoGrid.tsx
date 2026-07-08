import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type ReviewPhotoGridProps = {
  photos: string[];
  large?: boolean;
};

export const ReviewPhotoGrid = ({ photos, large }: ReviewPhotoGridProps) => {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  if (!photos.length) return null;

  return (
    <>
      <ul className="flex flex-wrap gap-2">
        {photos.map((photo, index) => (
          <li key={`${photo}-${index}`}>
            <button
              type="button"
              onClick={() => setActivePhoto(photo)}
              className="block rounded-lg overflow-hidden border border-gold/20 hover:border-gold/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`View customer photo ${index + 1}`}
            >
              <img
                src={photo}
                alt={`Customer photo ${index + 1}`}
                className={
                  large
                    ? "h-24 w-24 sm:h-28 sm:w-28 object-cover"
                    : "h-20 w-20 sm:h-24 sm:w-24 object-cover"
                }
                loading="lazy"
              />
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={Boolean(activePhoto)} onOpenChange={(open) => !open && setActivePhoto(null)}>
        <DialogContent className="max-w-[min(100vw-1.5rem,40rem)] border-gold/30 bg-background/95 p-3 sm:p-4 gap-0 [&>button.absolute.right-4]:hidden">
          <DialogTitle className="sr-only">Customer review photo</DialogTitle>
          {activePhoto ? (
            <img
              src={activePhoto}
              alt="Enlarged customer review photo"
              className="w-full max-h-[min(80vh,720px)] object-contain rounded-lg"
            />
          ) : null}
          <button
            type="button"
            onClick={() => setActivePhoto(null)}
            className="absolute right-3 top-3 sm:right-4 sm:top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-background/90 text-foreground shadow-lg hover:bg-primary/10 transition-colors"
            aria-label="Close photo"
          >
            <X className="h-5 w-5" />
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
};
