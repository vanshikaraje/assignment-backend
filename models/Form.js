
import mongoose from "mongoose";

const mcqSchema = new mongoose.Schema({
  question: { type: String },
  options: { type: [String], default: [] },
  correctAnswer: { type: String, default: "" }
});

const questionSchema = new mongoose.Schema({
  type: { type: String, required: true }, 
  questionText: { type: String, default: "" },
  questionImage: { type: String, default: "" }, 
  categories: { type: [String], default: [] }, 
  items: { type: [String], default: [] }, 
  correctAnswers: { type: mongoose.Schema.Types.Mixed, default: {} }, 
  passage: { type: String, default: "" }, 
  paragraph: { type: String, default: "" },
  mcqs: { type: [mcqSchema], default: [] }
}, { timestamps: true });

const formSchema = new mongoose.Schema({
  title: { type: String, default: "Untitled Form" },
  headerImage: { type: String, default: "" },
  questions: { type: [questionSchema], default: [] }
}, { timestamps: true });

export default mongoose.model("Form", formSchema);
