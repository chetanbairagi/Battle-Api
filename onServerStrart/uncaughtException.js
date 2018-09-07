module.exports = function (app) {
    process.on('uncaughtException', function (err) {
        console.log('Error: ', err.stack);
        var data = {};
        data.title = "Error Report by SERVER - " + err;
        data.msg = "Hi,\n\nThe following errors occurred in SERVER.\n\n" + err + " \n" + "STACKTRACE:\n" + err.stack ;
        // send Email to developers internally with starack trace
    });
};