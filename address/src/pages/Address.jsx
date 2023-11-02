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
  const [editingItemId, setEditingItemId] = useState(null);
  const [itemToDel, setDeleteItemId] = useState(null);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [editingStates, setEditingStates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/index.php');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setEditingStates(new Array(jsonData.length).fill(false));
      } catch (error) {
        console.error('There was a problem fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const addTask = () => {
    // Validation code remains the same
  };

  const deleteTask = (index) => {
    const itemToDelete = data[index];
    setDeleteItemId(itemToDel);

    fetch('http://localhost:8000/api/index.php', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemToDelete),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });

    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const editTask = (index) => {
    const newEditingStates = [...editingStates];
    newEditingStates[index] = true;
    setEditingStates(newEditingStates);

    const taskToEdit = data[index];
    setNewName(taskToEdit.name);
    setNewEmail(taskToEdit.email);
    setNewContact(taskToEdit.contact);
    setNewLocation(taskToEdit.address);
    setNewGender(taskToEdit.gender);
    setEditingItemId(taskToEdit.id);
    setEditingIndex(index);
  };

  const updateTask = (index) => {
    if (newName && newEmail && newContact && newLocation && newGender && editingIndex !== null) {
      const updatedData = [...data];
      updatedData[index] = {
        id: editingItemId,
        name: newName,
        gender: newGender,
        address: newLocation,
        email: newEmail,
        contact: newContact,
      };
      setData(updatedData);

      const newEditingStates = [...editingStates];
      newEditingStates[index] = false;
      setEditingStates(newEditingStates);

      const putData = {
        id: editingItemId,
        name: newName,
        gender: newGender,
        address: newLocation,
        email: newEmail,
        contact: newContact,
      };

      fetch('http://localhost:8000/api/index.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(putData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
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

  const filteredData = data.filter((item) => {
    const search = searchQuery.toLowerCase();
    return (
      (item.name && item.name.toLowerCase().includes(search)) ||
      (item.email && item.email.toLowerCase().includes(search)) ||
      (item.contact && item.contact.toLowerCase().includes(search)) ||
      (item.address && item.address.toLowerCase().includes(search)) ||
      (item.gender && item.gender.toLowerCase().includes(search))
    );
  });

  return (
    <div className="app-container page-content">
      <div className="address-list-container">
        <h1 className='addressHead'>Address List</h1>
        <div className="add-task-container">
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
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Location</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(indexOfFirstItem, indexOfLastItem).map((task, index) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>
                    {editingStates[index] ? (
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                      />
                    ) : task.name}
                  </td>
                  <td>
                    {editingStates[index] ? (
                      <input
                        type="text"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                      />
                    ) : task.email}
                  </td>
                  <td>
                    {editingStates[index] ? (
                      <input
                        type="text"
                        value={newContact}
                        onChange={(e) => setNewContact(e.target.value)}
                      />
                    ) : task.contact}
                  </td>
                  <td>
                    {editingStates[index] ? (
                      <input
                        type="text"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                      />
                    ) : task.address}
                  </td>
                  <td>
                    {editingStates[index] ? (
                      <input
                        type="text"
                        value={newGender}
                        onChange={(e) => setNewGender(e.target.value)}
                      />
                    ) : task.gender}
                  </td>
                  <td>
                    {editingStates[index] ? (
                      <button onClick={() => updateTask(index)} className="update-button">
                        Update
                      </button>
                    ) : (
                      <>
                        <button onClick={() => editTask(index)} className="edit-button">
                          Edit
                        </button>
                        <button onClick={() => deleteTask(index)} className="delete-button">
                          Delete
                        </button>
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
