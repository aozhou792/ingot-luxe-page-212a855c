import { Link } from "react-router-dom";
import { getAuthorBySlug, getDefaultAuthor, type Author } from "@/data/authors";
import { formatContentDate } from "@/lib/content-geo";

type Props = {
  authorSlug?: string;
  datePublished?: string;
  dateModified?: string;
  reviewedBy?: string;
};

export function ContentByline({ authorSlug, datePublished, dateModified, reviewedBy = "Alibarbar Team" }: Props) {
  const author: Author = getAuthorBySlug(authorSlug) ?? getDefaultAuthor();
  const updated = dateModified ?? datePublished;

  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-muted-foreground">
      <span>
        Written by{" "}
        <Link to={`/author/${author.slug}`} className="font-semibold text-primary hover:text-gold">
          {author.name}
        </Link>
      </span>
      <span aria-hidden>·</span>
      <span>Reviewed by {reviewedBy}</span>
      {updated ? (
        <>
          <span aria-hidden>·</span>
          <time dateTime={updated}>Updated {formatContentDate(updated)}</time>
        </>
      ) : null}
    </div>
  );
}
