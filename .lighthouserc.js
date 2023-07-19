module.exports = {
  ci: {
    collect: {
      startServerCommand: 'next build && next start -p 3000',
      startServerReadyPattern: 'Started a web server',
      numberOfRuns: 1,
      url: ['http://localhost:3000'],
      settings: {
        preset: 'desktop',
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
