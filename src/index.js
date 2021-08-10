const core   = require('@actions/core');
const github = require('@actions/github');
const fetch  = require('node-fetch');

(async function () {
    const priorities = ['highest', 'high', 'normal', 'low', 'lowest'];
    const levels     = ['verbose', 'info', 'notice', 'warning', 'error', 'success'];

    function isEmpty(value) {
        return !value || (value.length === 0);
    }

    try {
        const token = core.getInput('token', { required: true });

        let title    = core.getInput('title');
        let text     = core.getInput('text');
        let priority = core.getInput('priority');
        let level    = core.getInput('level');

        const map = {
            verbose: 'lowest',
            info:    'low',
            notice:  'lowest',
            success: 'normal',
            warning: 'high',
            error:   'highest',
        };

        for (const [l, p] of Object.entries(map)) {
            const t = core.getInput(l);

            if (isEmpty(t)) {
                continue;
            }

            text = t;

            if (isEmpty(priority)) {
                priority = p;
            }

            if (isEmpty(level)) {
                level = l;
            }

            break;
        }

        if (isEmpty(title)) {
            title = github.context.repo.owner + '/' + github.context.repo.repo;
        }

        if (isEmpty(priority)) {
            priority = 'normal';
        }

        if (isEmpty(level)) {
            level = 'info';
        }

        if (isEmpty(text)) {
            core.setFailed('Text can\'t be empty');
            return;
        }

        if (priorities.indexOf(priority) === -1) {
            core.setFailed('Invalid priority value: ' + priority);
            return;
        }

        if (levels.indexOf(level) === -1) {
            core.setFailed('Invalid level value: ' + level);
            return;
        }

        const body = {
            title:    title,
            text:     text,
            priority: priority,
            level:    level
        };

        const url = 'https://notify.events/api/v1/channel/source/' + token + '/execute';

        const response = await fetch(url, {
            method:  'post',
            body:    JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            core.setFailed('[' + response.status + '] ' + response.statusText)
        }
    } catch (error) {
        core.setFailed(error.message);
    }
})();
