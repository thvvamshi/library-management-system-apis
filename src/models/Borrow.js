import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema(
    {
        member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true,
        },

        borrowedAt: {
            type: Date,
            default: Date.now,
        },

        returnedAt: {
            type: Date,
            default: null,
        },

        status: {
            type: String,
            enum: [
                "borrowed",
                "returned",
            ],
            default: "borrowed",
        },
    },
    {
        timestamps: true,
    }
);

borrowSchema.index(
    {
        member: 1,
        book: 1,
        status: 1,
    },
    {
        unique: true,
        partialFilterExpression: {
            status: "borrowed",
        },
    }
);

const Borrow = mongoose.model(
    "Borrow",
    borrowSchema
);

export default Borrow;