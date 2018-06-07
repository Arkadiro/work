var util = require('util');

module.exports = function (restClient) {
    var module = {};

    module.list = function (searchCriteria) {
        var endpointUrl = util.format('/cmsBlock/search?%s', searchCriteria);
        return restClient.get(endpointUrl);
    }

    return module;
}
