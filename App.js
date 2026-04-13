import { useEffect, useState } from 'react';
import './App.css';
import AddStudent from './components/AddStudent';
import ViewStudents from './components/ViewStudents';

function App() {
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState('Loading students...');

  const fetchStudents = async () => {
    try {
      const response = await fetch('/student/view');
      const data = await response.json();
      setStudents(data);
      setStatus(data.length ? 'Students loaded successfully.' : 'No student records available.');
    } catch (error) {
      setStatus('Backend connection failed. Start MongoDB and the Express server.');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="app">
      <div className="container">
        <h1>Student Portfolio CRUD</h1>
        <p className="subtitle">Simple MERN stack implementation using MongoDB, Express, React, and Node.js.</p>
        <p className="status">{status}</p>
        <AddStudent onStudentAdded={fetchStudents} setStatus={setStatus} />
        <ViewStudents students={students} onStudentChanged={fetchStudents} setStatus={setStatus} />
      </div>
    </div>
  );
}

export default App;
