const Reminder = require("../models/Reminder");

async function queryInfo() {
        const reminder = await Reminder.find({
                IsCron: false,
        });
        const result = reminder.map(({ _id, Title, Content, RemindAt, Email }) => ({
                _id,
                Title,
                Content,
                RemindAt,
                Email,
        }));
        return result;
}

async function isCron(id) {
        await Reminder.findOneAndUpdate({ _id: id }, { IsCron: true });
}

async function isSend(id) {
        await Reminder.findOneAndUpdate({ _id: id }, { IsSend: true });
}

module.exports = { queryInfo, isCron, isSend };