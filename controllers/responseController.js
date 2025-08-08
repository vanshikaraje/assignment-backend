
import Response from "../models/Response.js";

export const submitResponse = async (req, res) => {
  try {
    const resp = new Response(req.body);
    await resp.save();
    res.status(201).json(resp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getResponsesByFormId = async (req, res) => {
  try {
    const list = await Response.find({ formId: req.params.formId }).sort({ submittedAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
