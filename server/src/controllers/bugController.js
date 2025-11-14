const Bug = require('../models/Bug');

exports.createBug = async (req, res, next) => {
  try {
    const { title, description, severity } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const bug = await Bug.create({ title, description, severity });
    // TODO: BUG intentionally used wrong field name below to practice debugging
    // return res.status(201).json({ data: bugg }); // buggy line (commented)
    return res.status(201).json({ data: bug });
  } catch (err) {
    next(err);
  }
};

exports.getBugs = async (req, res, next) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json({ data: bugs });
  } catch (err) {
    next(err);
  }
};

exports.updateBug = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const bug = await Bug.findByIdAndUpdate(id, updates, { new: true });
    if (!bug) return res.status(404).json({ message: 'Bug not found' });
    res.json({ data: bug });
  } catch (err) {
    next(err);
  }
};

exports.deleteBug = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Bug.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Bug not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};
