module.exports = {
    preset: 'jest-puppeteer',
    testRegex: './*.test.js$',
    setupFilesAfterEnv: ['./setupTests.js'],
    // testTimeout: 100000    // если storybook не запустился - увеличение времени Snapshot
};