import React, { useState, useEffect } from "react";
import useAutoSaveDraft from "../../hooks/useAutoSaveDraft";
import api from "../../services/api";

const DRAFT_KEY = "lessonplan-draft";

const LessonPlanForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    topic: "",
    objectives: "",
    date: "",
  });
  useEffect(() => {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
      setForm(JSON.parse(draft));
    }
  }, []);

  useAutoSaveDraft(DRAFT_KEY, form);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/lessonplans", form);
    localStorage.removeItem(DRAFT_KEY);
    setForm({
      topic: "",
      objectives: "",
      date: "",
    });
    onSuccess && onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields as before ... */}
    </form>
  );
};

export default LessonPlanForm;