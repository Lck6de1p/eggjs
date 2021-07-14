const Subscription = require('egg').Subscription;

class getInfo extends Subscription {
    static get schedule() {
        return {
            interval: 3000,
            cron: '*/3 * * * * *',
            type: 'worker'
        }
    }
    async subscribe() {
        console.log(Date.now(), 'ctx')
    }
}

module.exports = getInfo;