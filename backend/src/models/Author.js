module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define('Author', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      biography: {
        type: DataTypes.TEXT,
      },
      born_date: {
        type: DataTypes.DATEONLY,
      },
    });
  
    Author.associate = (models) => {
      Author.belongsToMany(models.Book, {
        through: 'BookAuthors',
        foreignKey: 'author_id',
        otherKey: 'book_id',
        as: 'books',
      });
    };
  
    return Author;
  };
  