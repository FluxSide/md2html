export interface CliOptions {
  output?: string;
  watch?: boolean;
}

export interface ParsedCli {
  input: string;
  options: CliOptions;
}

export function parseCli(argv: string[]): ParsedCli {
  const positional: string[] = [];
  const options: CliOptions = {};
  const consume = <T>(items: T[]): T | undefined => {
    const value = items.shift();
    return value;
  };

  const entries = [...argv];
  while (entries.length > 0) {
    const item = consume(entries) ?? '';

    if (item === '--') {
      positional.push(...entries);
      entries.length = 0;
      break;
    }

    if (item === '-o') {
      const value = consume(entries);
      if (!value || value.startsWith('-')) {
        throw new Error('Option -o requires a value.');
      }
      options.output = value;
      continue;
    }

    if (item === '--output') {
      const value = consume(entries);
      if (!value || value.startsWith('-')) {
        throw new Error('Option --output requires a value.');
      }
      options.output = value;
      continue;
    }

    if (item === '-w' || item === '-watch' || item === '--watch') {
      options.watch = true;
      continue;
    }

    if (item.startsWith('-')) {
      throw new Error(`Unknown option: ${item}`);
    }

    positional.push(item);
  }

  if (positional.length === 0) {
    throw new Error('Missing input markdown file.');
  }

  if (positional.length > 1) {
    throw new Error('Please specify only one input markdown file.');
  }

  return {
    input: positional[0] ?? '',
    options,
  };
}
