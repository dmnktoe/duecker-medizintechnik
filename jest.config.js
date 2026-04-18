// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/public/$1',
  },
};

// next/jest overrides transformIgnorePatterns, so we patch it after.
// The pnpm-aware regex (?!.*/pkg/) handles the nested .pnpm/<pkg>@.../node_modules/<pkg>/ path.
const nextJestConfig = createJestConfig(customJestConfig);

module.exports = async () => {
  const config = await nextJestConfig();
  config.transformIgnorePatterns = [
    'node_modules/(?!.*/(next-intl|use-intl)/)',
    '^.+\\.module\\.(css|sass|scss)$',
  ];
  return config;
};
