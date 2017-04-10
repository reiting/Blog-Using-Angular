var sg = require('sendgrid')('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');
exports.sendEmail = function(to, from, subject, content) {
    var reqest = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: {
            personalizations: [
                { to: [{email: to}], subject: subject }
            ],
            from: { email: from },
            content: [ { type: 'text/html', content: content } ]
        }
    });
    return sg.API(request);
}