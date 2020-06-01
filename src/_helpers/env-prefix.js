export function envPrefix() {
    // return authorization header with jwt token
    let env = JSON.parse(localStorage.getItem('env'));

    if (env && env.prefix) {
        return {'api-prefix': env.prefix};
    } else {
        return {};
    }
}