export default {
    testEnvironment: "node",

    verbose: true,

    setupFilesAfterEnv: [
        "./tests/setup.js",
    ],

    testMatch: [
        "**/tests/**/*.test.js",
    ],

    transform: {},
};