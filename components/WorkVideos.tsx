import { VimeoEmbed } from "@/components/VimeoEmbed";

/**
 * Case-study videos: first player on its own row, the rest two-across.
 * Players are square so the 1:1 Vimeo cuts are not cropped.
 */
export function WorkVideos({ urls, title }: { urls: string[]; title: string }) {
  if (urls.length === 0) return null;

  const [first, ...rest] = urls;

  return (
    <section className="mx-auto mt-16 w-full max-w-3xl space-y-4">
      <VimeoEmbed
        url={first}
        title={urls.length > 1 ? `${title} 1` : title}
      />
      {rest.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {rest.map((url, index) => (
            <VimeoEmbed
              key={url}
              url={url}
              title={`${title} ${index + 2}`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
