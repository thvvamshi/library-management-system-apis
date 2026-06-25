import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        author: {
            type: String,
            required: true,
            trim: true,
        },

        isbn: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: 0,
        },

        availableQuantity: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Create indexes for faster searching
bookSchema.index({ title: "text", author: "text" });
bookSchema.index({ category: 1 });

const Book = mongoose.model("Book", bookSchema);

export default Book;