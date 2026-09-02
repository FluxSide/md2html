import { marked } from 'marked';
import { promises as fs } from 'node:fs';

export interface ConvertOptions {
  inputPath: string;
  outputPath?: string;
}

export async function convertToHtml({ inputPath, outputPath }: ConvertOptions): Promise<string> {
  const raw = await readFile(inputPath);
  const body = await marked(raw);
  const html = wrapHtml(body);
  const target = resolveOutputPath(inputPath, outputPath);
  await writeFile(target, html, 'utf-8');
  return target;
}

function readFile(path: string): Promise<string> {
  return fs.readFile(path, 'utf-8');
}

function writeFile(path: string, content: string, encoding: BufferEncoding): Promise<void> {
  return fs.writeFile(path, content, encoding);
}

function resolveOutputPath(inputPath: string, outputPath?: string): string {
  if (outputPath) return outputPath;
  const extname = extnameSync(inputPath);
  return inputPath.slice(0, -extname.length) + '.html';
}

function extnameSync(path: string): string {
  const lastDot = path.lastIndexOf('.');
  if (lastDot <= 0) return '';
  return path.slice(lastDot);
}

function wrapHtml(body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml('Markdown Preview')}</title>
  <style>
    :root {
      color-scheme: light;
    }

    * {
      box-sizing: border-box;
    }

    html, body {
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 1.7;
      color: #1f2937;
      background: #ffffff;
    }

    main {
      max-width: 780px;
      margin: 0 auto;
      padding: 40px 20px 64px;
    }

    h1, h2, h3, h4, h5, h6 {
      line-height: 1.3;
      margin-top: 28px;
      margin-bottom: 12px;
      font-weight: 700;
      color: #111827;
    }

    h1 {
      font-size: 2rem;
      padding-bottom: 10px;
      border-bottom: 1px solid #e5e7eb;
    }

    h2 {
      font-size: 1.5rem;
      padding-bottom: 8px;
      border-bottom: 1px solid #e5e7eb;
    }

    p {
      margin-top: 0;
      margin-bottom: 16px;
    }

    a {
      color: #2563eb;
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    a:hover {
      color: #1d4ed8;
    }

    ul, ol {
      padding-left: 24px;
      margin-top: 0;
      margin-bottom: 16px;
    }

    li + li {
      margin-top: 6px;
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      display: block;
      margin: 12px 0 20px;
    }

    pre {
      background: #0b1220;
      color: #e5e7eb;
      padding: 16px;
      border-radius: 10px;
      overflow: auto;
      margin-top: 0;
      margin-bottom: 18px;
      font-size: 14px;
      line-height: 1.55;
    }

    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
    }

    p code, li code {
      background: #f3f4f6;
      padding: 2px 6px;
      border-radius: 6px;
      font-size: 0.92em;
    }

    blockquote {
      margin: 0 0 18px;
      padding: 10px 16px;
      border-left: 4px solid #2563eb;
      background: #f9fafb;
      color: #374151;
      border-radius: 0 8px 8px 0;
    }

    blockquote p:last-child {
      margin-bottom: 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 0;
      margin-bottom: 18px;
    }

    th, td {
      border: 1px solid #e5e7eb;
      padding: 8px 10px;
      text-align: left;
    }

    th {
      background: #f9fafb;
      font-weight: 600;
    }

    hr {
      border: none;
      border-top: 1px solid #e5e7eb;
      margin: 28px 0;
    }

    @media (max-width: 640px) {
      main {
        padding: 24px 16px 48px;
      }

      h1 {
        font-size: 1.6rem;
      }

      h2 {
        font-size: 1.25rem;
      }
    }
  </style>
</head>
<body>
  <main>
    ${body}
  </main>
</body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export {};
