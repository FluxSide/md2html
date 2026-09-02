import { watch } from 'chokidar';
import { convertToHtml } from './converter.js';
import { parseCli, type CliOptions } from './cli.js';

const command = async (input: string, options: CliOptions): Promise<void> => {
  const outputPath = await convertToHtml({
    inputPath: input,
    outputPath: options.output,
  });

  console.log(`Converted ${input} -> ${outputPath}`);
};

const startWatch = (input: string, options: CliOptions): void => {
  const watcher = watch(input, {
    ignoreInitial: true,
    awaitWriteFinish: {
      pollInterval: 200,
      stabilityThreshold: 400,
    },
  });

  const onChange = async (changedPath: string): Promise<void> => {
    if (changedPath !== input) {
      return;
    }

    try {
      await command(input, options);
    } catch (error) {
      console.error('Failed to rebuild:', error instanceof Error ? error.message : error);
    }
  };

  watcher.on('add', onChange);
  watcher.on('change', onChange);
  watcher.on('unlink', () => {
    console.error(`Watched file removed: ${input}`);
    watcher.close().catch(() => undefined);
    process.exit(1);
  });

  watcher.on('error', (watchError: unknown) => {
    console.error('Watcher error:', watchError instanceof Error ? watchError.message : watchError);
    watcher.close().catch(() => undefined);
    process.exit(1);
  });

  console.log(`Watching ${input} for changes.`);
};

const main = async (): Promise<void> => {
  const { input, options } = parseCli(process.argv.slice(2));
  await command(input, options);

  if (options.watch) {
    startWatch(input, options);
  }
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
