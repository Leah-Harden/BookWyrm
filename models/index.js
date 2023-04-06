const Book = require('./Book');
const User = require('./User');
const InProgress = require('./InProgress');

User.hasMany(InProgress, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Book.hasMany(InProgress, {
    foreignKey: 'book_id',
    onDelete: 'CASCADE'
});


InProgress.belongsTo(Book, { foreignKey: 'book_id' });
InProgress.belongsTo(User, { foreignKey: 'user_id' });
