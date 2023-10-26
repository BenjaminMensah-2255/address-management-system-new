import React, { useState, useEffect } from 'react';
import './Address.css';

function App() {
  const [data, setData] = useState([]);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newGender, setNewGender] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [contactErrorMessage, setContactErrorMessage] = useState(''); // State for error message
  const itemsPerPage = 5;

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('addressData')) || [];
    setData(savedData);
  }, []);

  useEffect(() => {
    localStorage.setItem('addressData', JSON.stringify(data));
  }, [data]);

  const addTask = () => {
    if (newName && newEmail && newContact && newLocation && newGender) {
      // Regular expression to validate email format
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      
      if (emailPattern.test(newEmail)) {
        if (/^\d+$/.test(newContact)) {
          if (newContact.length === 10) {
            const newData = [
              ...data,
              {
                name: newName,
                email: newEmail,
                contact: newContact,
                location: newLocation,
                gender: newGender,
              },
            ];
            setData(newData);
            setNewName('');
            setNewEmail('');
            setNewContact('');
            setNewLocation('');
            setNewGender('');
            setContactErrorMessage(''); // Clear the error message
          } else {
            // Display an alert message
            alert('Contact should be a 10-digit number.');
          }
        } else {
          // Display an alert message
          alert('Contact should contain only numeric characters.');
        }
      } else {
        // Display an alert message
        alert('Email address is not in the correct format.');
      }
    } else {
      // Display an alert message
      alert('All fields (except Email) are required.');
    }
  };
  

  const deleteTask = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const editTask = (index) => {
    setEditingIndex(index);
    const taskToEdit = data[index];
    setNewName(taskToEdit.name);
    setNewEmail(taskToEdit.email);
    setNewContact(taskToEdit.contact);
    setNewLocation(taskToEdit.location);
    setNewGender(taskToEdit.gender); // Set the gender for editing
  };

  const updateTask = () => {
    if (newName && newEmail && newContact && newLocation && newGender && editingIndex !== null) {
      const updatedData = [...data];
      updatedData[editingIndex] = {
        name: newName,
        email: newEmail,
        contact: newContact,
        location: newLocation,
        gender: newGender, // Update gender
      };
      setData(updatedData);
      setNewName('');
      setNewEmail('');
      setNewContact('');
      setNewLocation('');
      setNewGender('');
      setEditingIndex(null);
    }
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter the data based on the search query
  const filteredData = data.filter((item) => {
    const search = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(search) ||
      item.email.toLowerCase().includes(search) ||
      item.contact.toLowerCase().includes(search) ||
      item.location.toLowerCase().includes(search) ||
      item.gender.toLowerCase().includes(search) // Filter by gender
    );
  });

  return (
    <div className="app-container page-content">
      <div className="address-list-container">
        <h1 className='addressHead'>Address List</h1>
        <div className="add-task-container">
          {/* Search input field */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Name"
              className='name text-box-shadow'
              style={{ textAlign: 'center' }}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className='email text-box-shadow'
              style={{ textAlign: 'center' }}
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Contact"
              className='contact text-box-shadow'
              style={{ textAlign: 'center' }}
              value={newContact}
              onChange={(e) => setNewContact(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              className='location text-box-shadow'
              style={{ textAlign: 'center' }}
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
            />
            <input
              type="text"
              placeholder="Gender"
              className='gender text-box-shadow'
              style={{ textAlign: 'center' }}
              value={newGender}
              onChange={(e) => setNewGender(e.target.value)}
            />
            <button className="add-button" onClick={addTask}>Add</button>
          </div>
        </div>
      </div>
      <div className="table-container">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Location</th>
                <th>Gender</th> {/* Add the Gender column */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(indexOfFirstItem, indexOfLastItem).map((task, index) => (
                <tr key={index}>
                  <td>
                    {index === editingIndex ? (
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                      />
                    ) : task.name}
                  </td>
                  <td>
                    {index === editingIndex ? (
                      <input
                        type="text"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                      />
                    ) : task.email}
                  </td>
                  <td>
                    {index === editingIndex ? (
                      <input
                        type="text"
                        value={newContact}
                        onChange={(e) => setNewContact(e.target.value)}
                      />
                    ) : task.contact}
                  </td>
                  <td>
                    {index === editingIndex ? (
                      <input
                        type="text"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                      />
                    ) : task.location}
                  </td>
                  <td>
                    {index === editingIndex ? (
                      <input
                        type="text"
                        value={newGender}
                        onChange={(e) => setNewGender(e.target.value)}
                      />
                    ) : task.gender}
                  </td>
                  <td>
                    {index === editingIndex ? (
                      <button onClick={updateTask} className="update-button">Update</button>
                    ) : (
                      <>
                        <button onClick={() => editTask(index)} className="edit-button">Edit</button>
                        <button onClick={() => deleteTask(index)} className="delete-button">Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <div className="separator"></div>
        <button onClick={nextPage} disabled={currentPage >= Math.ceil(filteredData.length / itemsPerPage)}>Next</button>
       
      </div>
     
    </div>
  );
}

export default App;
