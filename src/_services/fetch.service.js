import {apiEnv} from "../_helpers/env";
import {authHeader} from '../_helpers';
import *  as _ from "lodash";

let apiEnvStr = localStorage.getItem(apiEnv.key);

function vFetch(url, requestOptions) {
    if (authHeader()) {
        _.extend(requestOptions.headers, authHeader());
    }
    let apiEnvFinal = apiEnvStr ? apiEnvStr : apiEnv.express;
    // reset url with apiEnv
    url = url.replace("$apiEnv", apiEnvFinal).replace("$projectPrefix", apiEnv.projectPrefix);
    return fetch(url, requestOptions);
}

export const VFetch =
  {
      vFetch: vFetch
  };