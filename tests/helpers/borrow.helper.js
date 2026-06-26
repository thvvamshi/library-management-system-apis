import Borrow from "../../src/models/Borrow.js";

// Create Borrow
const createBorrow = async (overrides = {}) => {

    return await Borrow.create({
        member: overrides.member,
        book: overrides.book,
        dueDate: new Date(
            Date.now() + 14 * 24 * 60 * 60 * 1000
        ),
        ...overrides,
    });

};

export {
    createBorrow,
};