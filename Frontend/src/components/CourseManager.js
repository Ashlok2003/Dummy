import React, { useState } from "react";
import "./css/CourseManager.css";

const CourseManager = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "AI Ethics 101",
      category: "Education",
      status: "Active",
      date: "2025-01-15",
      description: "Introduction to ethical AI practices.",
    },
    {
      id: 2,
      name: "NLP Basics",
      category: "Technology",
      status: "Draft",
      date: "2025-02-20",
      description: "Fundamentals of natural language processing.",
    },
    {
      id: 3,
      name: "Space Exploration",
      category: "Science",
      status: "Active",
      date: "2025-03-01",
      description: "Overview of space missions and tech.",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Education",
    status: "Draft",
    description: "",
  });
  const [editId, setEditId] = useState(null);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setCourses(
        courses.map((course) =>
          course.id === editId
            ? { ...course, ...formData, date: course.date }
            : course,
        ),
      );
      setEditId(null);
    } else {
      setCourses([
        ...courses,
        {
          id: courses.length + 1,
          ...formData,
          date: new Date().toISOString().split("T")[0],
        },
      ]);
    }
    setFormData({
      name: "",
      category: "Education",
      status: "Draft",
      description: "",
    });
    setIsModalOpen(false);
  };

  const handleEdit = (course) => {
    setFormData({
      name: course.name,
      category: course.category,
      status: course.status,
      description: course.description || "",
    });
    setEditId(course.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleSort = (field) => {
    const newOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
    setCourses(
      [...courses].sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];
        return newOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }),
    );
  };

  return (
    <section className="courses">
      <div className="section-header">
        <h2>Course Manager</h2>
        <div className="header-actions">
          <button className="add-btn" onClick={() => setIsModalOpen(true)}>
            + Add New Course
          </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>
                Course Name{" "}
                {sortField === "name" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th onClick={() => handleSort("category")}>
                Category{" "}
                {sortField === "category" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th onClick={() => handleSort("status")}>
                Status{" "}
                {sortField === "status" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th onClick={() => handleSort("date")}>
                Created Date{" "}
                {sortField === "date" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="course-row">
                <td>{course.name}</td>
                <td>{course.category}</td>
                <td>
                  <span className={`status ${course.status.toLowerCase()}`}>
                    {course.status}
                  </span>
                </td>
                <td>{course.date}</td>
                <td className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(course)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
                  </button>
                  {course.description && (
                    <span className="tooltip">{course.description}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editId ? "Edit Course" : "Add New Course"}</h2>
              <button
                className="close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Course Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter course name"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="Education">Education</option>
                  <option value="Technology">Technology</option>
                  <option value="Science">Science</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Draft">Draft</option>
                  <option value="Active">Active</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Add a brief description"
                  rows="4"
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="save-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default CourseManager;
