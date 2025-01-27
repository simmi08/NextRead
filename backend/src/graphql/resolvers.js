const { Op } = require('sequelize');
const { Author, Book } = require('../models');
async function getAuthorsByBook(bookID) {
    try {
        const book = await Book.findOne({
            where: { id: bookID },
            include: [{
                model: Author,
                as: 'authors',
                through: { attributes: [] }
            }]
        });

        if (!book) {
            return { error: 'Book not found' };
        }

        return book.authors;
    } catch (error) {
        console.error('Error fetching authors for the book:', error);
        throw new Error('Error fetching authors');
    }
}

async function getBooksByAuthor(authorID) {
    try {
        const author = await Author.findOne({
            where: { id: authorID },
            include: [{
                model: Book,
                as: 'books',
                through: { attributes: [] }
            }]
        });

        if (!author) {
            return { error: 'Author not found' };
        }
        return author.books;
    } catch (error) {
        console.error('Error fetching books for the author:', error);
        throw new Error('Error fetching books');
    }
}

const resolvers = {
    Query: {
        getAuthors: async () => {
            return await Author.findAll();
        },
        getBooks: async () => {
            return await Book.findAll();
        },
    },


    Mutation: {
        async createBook(_, { title, description, published_date }) {
            return await Book.create({ title, description, published_date });
        },

        async updateBook(_, { id, title, description, published_date }) {
            const book = await Book.findByPk(id);
            if (!book) throw new Error('Book not found');

            return await book.update({ title, description, published_date });
        },

        async deleteBook(_, { id }) {
            const book = await Book.findByPk(id);
            if (!book) throw new Error('Book not found');

            await book.destroy();
            return 'Book deleted successfully';
        },

        async createAuthor(_, { name, biography, born_date }) {
            return await Author.create({ name, biography, born_date });
        },

        async updateAuthor(_, { id, name, biography, born_date }) {
            const author = await Author.findByPk(id);
            if (!author) throw new Error('Author not found');

            return await author.update({ name, biography, born_date });
        },

        async deleteAuthor(_, { id }) {
            const author = await Author.findByPk(id);
            if (!author) throw new Error('Author not found');

            await author.destroy();
            return 'Author deleted successfully';
        },

        async associateBookWithAuthors(_, { bookId, authorIds }) {
            const book = await Book.findByPk(bookId);

            if (!book) {
                throw new Error('Book not found');
            }

            const authors = await Author.findAll({
                where: {
                    id: authorIds,
                },
            });

            if (authors.length !== authorIds.length) {
                throw new Error('Some authors were not found');
            }

            await book.addAuthors(authors);

            return await Book.findByPk(bookId, {
                include: [
                    {
                        model: Author,
                        as: 'authors',
                    },
                ],
            });
        },
    },

    Book: {
        async authors(book) {
            return await getAuthorsByBook(book.id);
        },
    },

    Author: {
        async books(author) {
            return await getBooksByAuthor(author.id);
        },
    },
};

module.exports = resolvers;
