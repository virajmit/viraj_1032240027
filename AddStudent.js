import { useState } from 'react';

function AddStudent({ onStudentAdded, setStatus }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(current => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await fetch('/student/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const message = await response.text();
      setStatus(message);
      setFormData({
        name: '',
        email: '',
        course: '',
      });
      onStudentAdded();
    } catch (error) {
      setStatus('Unable to add student.');
    }
  };

  return (
    <section className="card">
      <h2>Add Student</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter student name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="course"
          placeholder="Enter course"
          value={formData.course}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Student</button>
      </form>
    </section>
  );
}

export default AddStudent;
