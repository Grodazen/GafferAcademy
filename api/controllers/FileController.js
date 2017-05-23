/**
 * FileController
 *
 * @description :: Server-side logic for managing Files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * `FileController.upload()`
     *
     * Upload file(s) to the server's disk.
     */
    upload: function (req, res) {

        // e.g.
        // 0 => infinite
        // 240000 => 4 minutes (240,000 miliseconds)
        // etc.
        //
        // Node defaults to 2 minutes.
        res.setTimeout(0);

        req.file('file')
            .upload({

                // You can apply a file upload limit (in bytes)
                maxBytes: 10000000

            }, function whenDone(err, uploadedFiles) {
                if (err) return res.serverError(err);
                else return res.json({
                    files: uploadedFiles,
                    textParams: req.allParams()
                });
            });
    },

    /**
     * FileController.download()
     *
     * Download a file from the server's disk.
     */
    download: function (req, res) {
        var Path = require('path');
        var fs = require('fs');

        // If a relative path was provided, resolve it relative
        // to the cwd (which is the top-level path of this sails app)
        fs.createReadStream(Path.resolve(req.param('path')))
            .on('error', function (err) {
                return res.serverError(err);
            })
            .pipe(res);
    }
	
};

