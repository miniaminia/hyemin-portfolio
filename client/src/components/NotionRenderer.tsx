interface Annotation {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  code: boolean;
  color: string;
}

interface RichTextItem {
  plain_text: string;
  href: string | null;
  annotations: Annotation;
}

function RichText({ items }: { items: RichTextItem[] }) {
  return (
    <>
      {items.map((item, i) => {
        const { bold, italic, strikethrough, code } = item.annotations;
        let cls = "text-[#9fffce]";
        if (code) cls = "text-[#E5E7AD] bg-[#0d2b0d] px-1.5 py-0.5 font-mono text-xs rounded";
        if (bold) cls += " font-bold text-[#00FF62]";
        if (italic) cls += " italic";
        if (strikethrough) cls += " line-through";

        if (item.href) {
          return (
            <a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
              className={cls + " underline underline-offset-2 hover:text-[#00FF62]"}>
              {item.plain_text}
            </a>
          );
        }
        return <span key={i} className={cls}>{item.plain_text}</span>;
      })}
    </>
  );
}

export default function NotionRenderer({ blocks }: { blocks: any[] }) {
  const rendered: React.ReactNode[] = [];
  let bulletBuffer: any[] = [];
  let numberBuffer: any[] = [];

  const flushBullets = () => {
    if (!bulletBuffer.length) return;
    rendered.push(
      <ul key={`ul-${rendered.length}`} className="mb-4 space-y-1">
        {bulletBuffer.map((b, i) => (
          <li key={i} className="flex gap-2 text-sm font-mono text-[#9fffce] leading-relaxed">
            <span className="text-[#1f521f] flex-shrink-0">·</span>
            <RichText items={b.bulleted_list_item.rich_text} />
          </li>
        ))}
      </ul>
    );
    bulletBuffer = [];
  };

  const flushNumbers = () => {
    if (!numberBuffer.length) return;
    rendered.push(
      <ol key={`ol-${rendered.length}`} className="mb-4 space-y-1">
        {numberBuffer.map((b, i) => (
          <li key={i} className="flex gap-2 text-sm font-mono text-[#9fffce] leading-relaxed">
            <span className="text-[#1f521f] flex-shrink-0 w-6">{String(i + 1).padStart(2, "0")}.</span>
            <RichText items={b.numbered_list_item.rich_text} />
          </li>
        ))}
      </ol>
    );
    numberBuffer = [];
  };

  for (const block of blocks) {
    if (block.type !== "bulleted_list_item") flushBullets();
    if (block.type !== "numbered_list_item") flushNumbers();

    switch (block.type) {
      case "heading_1":
        rendered.push(
          <h2 key={block.id} className="text-[#00FF62] text-2xl font-mono font-bold mt-8 mb-4 terminal-glow">
            // <RichText items={block.heading_1.rich_text} />
          </h2>
        );
        break;

      case "heading_2":
        rendered.push(
          <h3 key={block.id} className="text-[#E5E7AD] text-lg font-mono font-bold mt-6 mb-3 terminal-glow-amber">
            ## <RichText items={block.heading_2.rich_text} />
          </h3>
        );
        break;

      case "heading_3":
        rendered.push(
          <h4 key={block.id} className="text-[#00FF62] text-base font-mono font-bold mt-4 mb-2 terminal-glow-sm">
            ### <RichText items={block.heading_3.rich_text} />
          </h4>
        );
        break;

      case "paragraph":
        if (!block.paragraph.rich_text.length) {
          rendered.push(<div key={block.id} className="mb-3" />);
        } else {
          rendered.push(
            <p key={block.id} className="text-sm font-mono leading-relaxed mb-3 flex gap-2">
              <span className="text-[#1f521f] flex-shrink-0">&gt;</span>
              <RichText items={block.paragraph.rich_text} />
            </p>
          );
        }
        break;

      case "bulleted_list_item":
        bulletBuffer.push(block);
        break;

      case "numbered_list_item":
        numberBuffer.push(block);
        break;

      case "image": {
        const url = block.image.type === "external"
          ? block.image.external.url
          : block.image.file.url;
        const caption = block.image.caption;
        rendered.push(
          <div key={block.id} className="my-6 border border-[#1f521f] hover:border-[#00FF62] transition-colors duration-300">
            <div className="bg-[#0d2b0d] px-3 py-1.5 border-b border-[#1f521f] flex items-center justify-between">
              <span className="text-[#00FF62] text-xs font-mono terminal-glow-sm">image.jpg</span>
              <span className="text-[#1f521f] text-xs font-mono">[−][□][×]</span>
            </div>
            <img src={url} alt={caption?.[0]?.plain_text ?? ""} className="w-full block" />
            {caption?.length > 0 && (
              <div className="px-3 py-1.5 border-t border-[#1f521f]">
                <span className="text-[#1f521f] text-xs font-mono">
                  &gt; {caption[0].plain_text}
                </span>
              </div>
            )}
          </div>
        );
        break;
      }

      case "divider":
        rendered.push(
          <div key={block.id} className="my-6 border-t border-dashed border-[#1f521f]" />
        );
        break;

      case "code":
        rendered.push(
          <div key={block.id} className="my-4 border border-[#1f521f]">
            <div className="bg-[#0d2b0d] px-3 py-1 border-b border-[#1f521f]">
              <span className="text-[#1f521f] text-xs font-mono">{block.code.language}</span>
            </div>
            <pre className="p-4 overflow-x-auto text-xs font-mono text-[#E5E7AD] leading-relaxed">
              {block.code.rich_text.map((t: RichTextItem) => t.plain_text).join("")}
            </pre>
          </div>
        );
        break;

      case "quote":
        rendered.push(
          <blockquote key={block.id} className="my-4 border-l-2 border-[#00FF62] pl-4">
            <p className="text-[#9fffce] text-sm font-mono italic leading-relaxed">
              <RichText items={block.quote.rich_text} />
            </p>
          </blockquote>
        );
        break;

      case "callout":
        rendered.push(
          <div key={block.id} className="my-4 border border-[#E5E7AD] bg-[#0d2b0d] p-4">
            <p className="text-[#E5E7AD] text-sm font-mono leading-relaxed">
              {block.callout.icon?.emoji && <span className="mr-2">{block.callout.icon.emoji}</span>}
              <RichText items={block.callout.rich_text} />
            </p>
          </div>
        );
        break;

      default:
        break;
    }
  }

  flushBullets();
  flushNumbers();

  return <>{rendered}</>;
}
