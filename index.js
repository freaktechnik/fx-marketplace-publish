/*
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

var MarketplaceClient = require("node-firefox-marketplace");

var getTypeFromPath = function(path) {
    if(path.match(/\.zip$/)) {
        return "packaged";
    }
    /*else if(path.match(/\.webapp$/)) {
        return "manifest";
    }*/
    else {
        return "manifest";
    }
};

var publish = function(client, options, validation) {
    if(validation.valid) {
        return client.publish(validation.id, options.type).then(function(result) {
            if(result.detail) {
                throw result.detail;
            }
            else {
                return result;
            }
        });
    }
    else {
        if(validation.validation) {
            throw validation.validation;
        }
        else if(validation.upload) {
            throw validation.upload[0];
        }
        else {
            throw validation;
        }
    }
};

/**
 * Publish an open webapp on the firefox marketplace
 * @param options: An options object with the required property 'path'. It
 *                 inherits the properties of the construction parameters for
 *                 node-firefox-marketplace. You can optionally specify the type
 *                 of webapp you are publishing in the 'type' property, else it
 *                 is sniffed using the file extension provided in the path and
 *                 else defaults to "manifest".
 * @return Promise, which resolves when the app is successfully published on
 *         the firefox marketplace, and gets rejected whenever an error occurs,
 *         including a failed validation.
 */
exports.publish = function(options) {
    options.type = options.type || getTypeFromPath(options.path);
    var client = new MarketplaceClient(options);

    var validator = client.validateManifest;
    if(options.type == "packaged") {
        validator = client.validatePackage;
    }

    return validator(options.path).then(publish.bind(publish, client, options));
};

