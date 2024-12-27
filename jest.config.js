/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: "node",
    moduleNameMapper: {
        "^@shared/(.*)$": "<rootDir>/src/shared/$1",
        "^@users/(.*)$": "<rootDir>/src/users/$1",
        "^@artists/(.*)$": "<rootDir>/src/artists/$1",
        "^@config/(.*)$": "<rootDir>/src/config/$1",
        "^@authentication/(.*)$": "<rootDir>/src/authentication/$1",
        "^@userPublications/(.*)$": "<rootDir>/src/userPublications/$1",
        "^@publicationImages/(.*)$": "<rootDir>/src/publicationImages/$1",
        "^@applications/(.*)$": "<rootDir>/src/applications/$1",
        "^@errors/(.*)$": "<rootDir>/src/shared/errors/$1",
        "^src/(.*)$": "<rootDir>/src/$1",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    transform: {
        "^.+.tsx?$": ["ts-jest", {}],
    },
};

