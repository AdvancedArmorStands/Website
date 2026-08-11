// components/MarkdownPreview.tsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const alertTitles: Record<string, string> = {
  NOTE: "Note",
  TIP: "Tip",
  IMPORTANT: "Important",
  WARNING: "Warning",
  CAUTION: "Caution",
  DANGER: "Danger",
};

function renderGitHubAlerts(content: string) {
  return content.replace(
    /(?:^|\n)>?\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|DANGER)\]\s*([^\n]*)(?:\n((?:>\s?[^\n]*(?:\n|$))+))?/gi,
    (_match, type: string, firstLine: string, quotedLines?: string) => {
      const normalizedType = type.toUpperCase();
      const message = [firstLine.replace(/^>\s?/, ""), ...(quotedLines?.split("\n") ?? []).map((line) => line.replace(/^>\s?/, ""))]
        .join(" ")
        .trim();
      return `\n<div class="markdown-alert markdown-alert-${normalizedType.toLowerCase()}"><p><strong>${alertTitles[normalizedType]}</strong>${message}</p></div>`;
    },
  );
}

export function MarkdownPreview({ content }: { content: string }) {
  return (
    <div className="release-markdown text-default-400">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {renderGitHubAlerts(content)}
      </ReactMarkdown>
    </div>
  );
}
