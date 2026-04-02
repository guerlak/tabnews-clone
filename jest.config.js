//Make jest allow to import files with syntax import 

const nextJest = require("next/jest");
const dotenv = require("dotenv");
const createJestConfig = nextJest({
    dir: ".",
});

const jestConfig = createJestConfig({
    moduleDirectories: ["node_modules", "<rootDir>"],
});

//setup to jest check the .env.development file
dotenv.config({ path: ".env.development" });

module.exports = jestConfig;    