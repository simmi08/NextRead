module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      published_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    });
  
    Book.associate = (models) => {
      Book.belongsToMany(models.Author, {
        through: 'BookAuthors', 
        foreignKey: 'book_id',
        otherKey: 'author_id',
        as: 'authors',
      });
    };
  
    return Book;
  };
  