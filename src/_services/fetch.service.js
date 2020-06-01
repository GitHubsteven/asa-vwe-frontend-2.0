import config from "../../config";
import {envPrefix} from "../_helpers/env-prefix";

function vFetch(url, requestOptions) {
    if (envPrefix()) {

    } else {

    }
    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions);
}