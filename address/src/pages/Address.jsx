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


  // useEffect(() => {
  //   const savedData = JSON.parse(localStorage.getItem('addressData')) || [];
  //   setData(savedData);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('addressData', JSON.stringify(data));
  // }, [data]);

  // const addTask = () => {
  //   if (newName && newEmail && newContact && newLocation && newGender) {
  //     // Regular expression to validate email format
  //     const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      
  //     if (emailPattern.test(newEmail)) {
  //       if (/^\d+$/.test(newContact)) {
  //         if (newContact.length === 10) {
  //           const newData = [
  //             ...data,
  //             {
  //               name: newName,
  //               email: newEmail,
  //               contact: newContact,
  //               location: newLocation,
  //               gender: newGender,
  //             },
  //           ];
  //           setData(newData);
  //           setNewName('');
  //           setNewEmail('');
  //           setNewContact('');
  //           setNewLocation('');
  //           setNewGender('');
  //           setContactErrorMessage(''); // Clear the error message
  //         } else {
  //           // Display an alert message
  //           alert('Contact should be a 10-digit number.');
  //         }
  //       } else {
  //         // Display an alert message
  //         alert('Contact should contain only numeric characters.');
  //       }
  //     } else {
  //       // Display an alert message
  //       alert('Email address is not in the correct format.');
  //     }
  //   } else {
  //     // Display an alert message
  //     alert('All fields (except Email) are required.');
  //   }

  // };
  useEffect(() => {
    // Define a function to fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/index.php'); // Replace with your backend API URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData); // Update the data state with the fetched addresses
      } catch (error) {
        console.error('There was a problem fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);
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
                address: newLocation,
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
  
            // Prepare the data to send
            const postData = {
              name: newName,
              gender: newGender,
              address: newLocation,
              email: newEmail,
              contact: newContact,
              
              
            };
  
            // Make an HTTP POST request to the PHP backend
            fetch('http://localhost:8000/api/index.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(postData),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then((data) => {
                // Handle the response from the PHP backend as needed
                console.log(data);
              })
              .catch((error) => {
                // Handle errors, e.g., network issues or errors from the backend
                console.error('There was a problem with the fetch operation:', error);
              });
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
  

  // const deleteTask = (index) => {
  //   const newData = [...data];
  //   newData.splice(index, 1);
  //   setData(newData);
  // };
const deleteTask = (index) => {
  // Assuming you have a unique identifier for each item, like an ID
  const itemToDelete = data[index];
  setDeleteItemId(itemToDel);

  // Make an HTTP DELETE request to the PHP backend
  fetch('http://localhost:8000/api/index.php', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemToDelete), // You can pass the item data or ID here
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response from the PHP backend as needed
      console.log(data);
    })
    .catch((error) => {
      // Handle errors, e.g., network issues or errors from the backend
      console.error('There was a problem with the fetch operation:', error);
    });

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
    setEditingItemId(taskToEdit.id);
  };

  
  const updateTask = () => {
    if (newName && newEmail && newContact && newLocation && newGender && editingIndex !== null) {
      const updatedData = [...data];
      updatedData[editingIndex] = {
        id: editingItemId, 
        name: newName,
        gender: newGender,
        address: newLocation,
        email: newEmail,
        contact: newContact,
      };
      setData(updatedData);
      setNewName('');
      setNewEmail('');
      setNewContact('');
      setNewLocation('');
      setNewGender('');
      setEditingIndex(null);
  
      // Prepare the data to send
      const putData = {
        id: editingItemId, 
        name: newName,
        gender: newGender,
        address: newLocation,
        email: newEmail,
        contact: newContact
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
    // Handle the response from the PHP backend as needed
    console.log(data);
  })
  .catch((error) => {
    // Handle errors, e.g., network issues or unexpected server responses
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

  // Filter the data based on the search query
  // Filter the data based on the search query
const filteredData = data.filter((item) => {
  const search = searchQuery.toLowerCase();
  return (
    (item.name && item.name.toLowerCase().includes(search)) ||
    (item.email && item.email.toLowerCase().includes(search)) ||
    (item.contact && item.contact.toLowerCase().includes(search)) ||
    (item.location && item.location.toLowerCase().includes(search)) ||
    (item.gender && item.gender.toLowerCase().includes(search)) // Filter by gender
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
      ) : task.address}
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