const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const taskSchema = new mongoose.Schema({
text: {
type: String,
required: true,
}
}, {
timestamps: true
});

taskSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('Task', taskSchema);
