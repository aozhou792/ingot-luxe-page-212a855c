import { useRef, useState, type FormEvent } from "react";
import { ImagePlus, X } from "lucide-react";
import { toast } from "sonner";
import { StarInput } from "@/components/reviews/StarRating";
import { AuthModal } from "@/components/AuthModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { submitReview } from "@/lib/reviews-api";

const MAX_PHOTOS = 3;
const MAX_PHOTO_BYTES = 4 * 1024 * 1024;

type ReviewFormProps = {
  productSlug: string;
  productOptions?: { slug: string; name: string }[];
  onSubmitted?: () => void;
  compact?: boolean;
};

type PhotoPreview = {
  id: string;
  dataUrl: string;
  name: string;
};

async function readPhoto(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose image files only.");
  }
  if (file.size > MAX_PHOTO_BYTES) {
    throw new Error("Each photo must be under 4 MB.");
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("Could not read photo."));
    };
    reader.onerror = () => reject(new Error("Could not read photo."));
    reader.readAsDataURL(file);
  });
}

export const ReviewForm = ({ productSlug, productOptions, onSubmitted, compact = false }: ReviewFormProps) => {
  const { user, token } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [slug, setSlug] = useState(productSlug);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photos, setPhotos] = useState<PhotoPreview[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const removePhoto = (id: string) => {
    setPhotos((current) => current.filter((photo) => photo.id !== id));
  };

  const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!files.length) return;

    const remaining = MAX_PHOTOS - photos.length;
    if (remaining <= 0) {
      toast.error(`You can add up to ${MAX_PHOTOS} photos.`);
      return;
    }

    try {
      const next = await Promise.all(files.slice(0, remaining).map(async (file) => ({
        id: `${file.name}-${file.lastModified}`,
        dataUrl: await readPhoto(file),
        name: file.name,
      })));
      setPhotos((current) => [...current, ...next]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not add photo.");
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!token) {
      setAuthOpen(true);
      return;
    }
    if (body.trim().length < 4) {
      toast.error("Please write a short review.");
      return;
    }

    setSubmitting(true);
    try {
      await submitReview(token, {
        productSlug: slug,
        rating,
        title,
        body,
        photos: photos.map((photo) => photo.dataUrl),
      });
      toast.success("Thanks! Your review is awaiting approval.");
      setTitle("");
      setBody("");
      setRating(5);
      setPhotos([]);
      onSubmitted?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className={compact ? "space-y-3" : "rounded-2xl border border-gold/30 bg-background/60 p-5 space-y-3"}>
        <h3 className="text-sm uppercase tracking-[0.2em] text-gold font-bold">Write a review</h3>
        <p className="text-sm text-muted-foreground">Sign in to share your rating, photos and experience.</p>
        <Button type="button" className="w-full min-h-[44px]" onClick={() => setAuthOpen(true)}>
          Sign in to review
        </Button>
        <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      </div>
    );
  }

  return (
    <div className={compact ? "" : "rounded-2xl border border-gold/30 bg-background/60 p-5"}>
      <h3 className="text-sm uppercase tracking-[0.2em] text-gold font-bold mb-4">Write a review</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        {productOptions && productOptions.length > 1 ? (
          <div className="space-y-1.5">
            <label htmlFor="review-product" className="text-sm text-muted-foreground">
              Product
            </label>
            <select
              id="review-product"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="flex h-11 w-full rounded-md border border-gold/30 bg-background px-3 py-2 text-sm"
            >
              {productOptions.map((option) => (
                <option key={option.slug} value={option.slug}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div>
          <p className="text-sm text-muted-foreground mb-1">Your rating</p>
          <StarInput value={rating} onChange={setRating} />
        </div>

        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title (optional)" />
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share your experience — flavour, battery life, delivery, packaging…"
          rows={4}
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">Photos (optional)</p>
            <span className="text-xs text-muted-foreground">
              {photos.length}/{MAX_PHOTOS}
            </span>
          </div>

          {photos.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {photos.map((photo) => (
                <li key={photo.id} className="relative">
                  <img
                    src={photo.dataUrl}
                    alt={photo.name}
                    className="h-20 w-20 rounded-lg object-cover border border-gold/20"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.id)}
                    className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-background border border-gold/30 text-foreground"
                    aria-label="Remove photo"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          {photos.length < MAX_PHOTOS ? (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/*"
                multiple
                className="hidden"
                onChange={(e) => void handlePhotoChange(e)}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full min-h-[44px] gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus className="h-4 w-4" />
                Add photos
              </Button>
            </>
          ) : null}
        </div>

        <Button type="submit" className="w-full min-h-[44px]" disabled={submitting}>
          {submitting ? "Submitting…" : "Submit review"}
        </Button>
        <p className="text-xs text-muted-foreground">Reviews appear after approval.</p>
      </form>
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </div>
  );
};
