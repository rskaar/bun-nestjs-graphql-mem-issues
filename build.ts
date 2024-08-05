import fs from 'node:fs';
import packageJson from './package.json';

function getExternalsFromPackageJson(): string[] {
  const sections: (keyof typeof packageJson)[] = [
    'dependencies',
    'devDependencies',
  ];
  const externals: string[] = [];

  for (const section of sections) {
    if (packageJson[section]) {
      externals.push(...Object.keys(packageJson[section]));
    }
  }

  // Removing potential duplicates between dev and peer
  return Array.from(new Set(externals));
}

async function buildWithExternals(): Promise<void> {
  const externalDeps = getExternalsFromPackageJson();

  // Delete the potentially existing dist folder
  if (fs.existsSync('./dist')) {
    fs.rmSync('./dist', { recursive: true });
  }

  await Bun.build({
    entrypoints: ['src/main.ts'],
    outdir: './dist',
    target: 'node',
    external: externalDeps,
    root: './src',
  });
}

buildWithExternals()
  .then(() => {
    console.log('Build complete!');
  })
  .catch((err) => {
    console.error('Build error:');
    console.error(err);
  });
