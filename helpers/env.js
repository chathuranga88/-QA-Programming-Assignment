import config from '../config.json';

function getEnv() {
    return process.argv[process.argv.length - 1];
}

function getBaseUrl() {
    const env = getEnv() === "--dev" || getEnv() === "--staging" || getEnv() === "--prod" ? getEnv().slice(2) : "dev"

    console.log(env, getEnv());
    return config.baseUrl[env];
}

export { getEnv, getBaseUrl };