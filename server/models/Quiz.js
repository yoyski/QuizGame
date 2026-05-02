import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.length >= 2;
        },
        message: "Each question must have at least 2 options",
      },
    },
    correctIndex: {
      type: Number,
      default: null,
    },
  },
  { _id: true }
);

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Untitled Quiz",
      trim: true,
    },
    questions: {
      type: [questionSchema],
      default: [],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);