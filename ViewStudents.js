import { useState } from 'react';

function ViewStudents({ students, onStudentChanged, setStatus }) {
  const [editingId, setEditingId] = useState('');
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    course: '',
  });

  const startEdit = student => {
    setEditingId(student._id);
    setEditForm({
      name: student.name,
      email: student.email,
      course: student.course,
    });
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setEditForm(current => ({
      ...current,
      [name]: value,
    }));
  };

  const handleUpdate = async id => {
    try {
      const response = await fetch(`/student/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      const message = await response.text();
      setStatus(message);
      setEditingId('');
      onStudentChanged();
    } catch (error) {
      setStatus('Unable to update student.');
    }
  };

  const handleDelete = async id => {
    try {
      const response = await fetch(`/student/delete/${id}`, {
        method: 'DELETE',
      });

      const message = await response.text();
      setStatus(message);
      onStudentChanged();
    } catch (error) {
      setStatus('Unable to delete student.');
    }
  };

  return (
    <section className="card">
      <h2>View Students</h2>
      {students.length === 0 ? (
        <p>No student records available.</p>
      ) : (
        <div className="student-list">
          {students.map(student => (
            <div key={student._id} className="student-item">
              {editingId === student._id ? (
                <div className="edit-box">
                  <input name="name" value={editForm.name} onChange={handleChange} />
                  <input name="email" value={editForm.email} onChange={handleChange} />
                  <input name="course" value={editForm.course} onChange={handleChange} />
                  <div className="button-row">
                    <button type="button" onClick={() => handleUpdate(student._id)}>
                      Save
                    </button>
                    <button type="button" className="secondary" onClick={() => setEditingId('')}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <h3>{student.name}</h3>
                    <p>{student.email}</p>
                    <p>{student.course}</p>
                  </div>
                  <div className="button-row">
                    <button type="button" onClick={() => startEdit(student)}>
                      Edit
                    </button>
                    <button type="button" className="danger" onClick={() => handleDelete(student._id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ViewStudents;
