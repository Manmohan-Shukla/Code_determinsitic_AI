import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

    codeHash: {
      type: String,
      required: true,
      index: true,
    },

    constraints: {
      type: mongoose.Schema.Types.Mixed,
    },

    static_info: {
      type: Object,
      required: true,
    },

    failure_info: {
      type: Object,
      required: true,
    },

    response: {
      type: String, // AI output
      required: true,
    },

    model: {
      type: String, // optional: which LLM produced it
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", ReviewSchema);
