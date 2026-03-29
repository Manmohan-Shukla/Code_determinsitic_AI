import mongoose from "mongoose";

const TestcaseSchema = new mongoose.Schema({
  problem: String,
  code: String,
  testcases: [String],
  createdAt: { type: Date, default: Date.now }
});

const TestcaseModel = mongoose.model("Testcase", TestcaseSchema);

// save
await TestcaseModel.create({
  problem,
  code,
  testcases: finalTests
});