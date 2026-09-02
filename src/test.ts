import { convertToHtml } from './converter.js';
import { parseCli } from './cli.js';

const input = '# title\n\nParagraph text.\n\n- one\n- two\n- three\n\n```ts\nconst value = 123;\nconsole.log(value);\n```\n\n[link](https://example.com)\n\n![alt](https://example.com/logo.png)\n\n---\n\n> quote\n\n| a | b |\n| - | - |\n| 1 | 2 |\n';

const options = {
  output: 'E:/AI_Learn/md2html/sample.html',
};

const run = async () => {
  await convertToHtml({ inputPath: 'E:/AI_Learn/md2html/sample.md', outputPath: options.output });

  console.log(parseCli(['E:/AI_Learn/md2html/sample.md', '-o', options.output]));
  console.log(parseCli(['E:/AI_Learn/md2html/sample.md']));
  console.log(parseCli(['E:/AI_Learn/md2html/sample.md', '--watch']));
  console.log(parseCli(['E:/AI_Learn/md2html/sample.md', '-w']));
  console.log(parseCli(['E:/AI_Learn/md2html/sample.md', '-o', options.output, '--watch']));
};

run();
