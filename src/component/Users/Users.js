import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
function Users() {
  const [users, setUsers] = React.useState([]);
  const [userSearch, setUserSearch] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  const [expand, setExpand] = React.useState(false);
  React.useEffect(() => {
    getAllUsers();
  }, []);
  const getAllUsers = () => {
    setloading(true);
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then(response => response.json())
      .then(json => {
        setloading(false);
        let sortedUsers = json.sort((a, b) => b.id - a.id);
        setUsers(sortedUsers);
        setUserSearch(json);
      });
  };
  const handleUserSearch = event => {
    event.preventDefault();
    if (event.target.value) {
      let filtered = users.filter(item => {
        return (
          item.id == event.target.value ||
          item.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.email.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.username.toLowerCase().includes(event.target.value.toLowerCase())
        );
      });

      setUsers(filtered);
    } else {
      setUsers(userSearch);
      setTimeout(() => {
        getAllUsers();
      }, 50);
    }
  };
  const handleSort = () => {
    let sortedUsers = users.sort((a, b) => a.id - b.id);
    setUsers([]);
    console.log(sortedUsers);
    setTimeout(() => {
      setUsers(sortedUsers);
    }, 0);
  };
  const handleSortAc = () => {
    setExpand(true);
    let sortedUsers = users.sort((a, b) => a.id - b.id);
    setUsers([]);

    setTimeout(() => {
      setUsers(sortedUsers);
    }, 0);
  };
  const handleSortDc = () => {
    setExpand(false);
    let sortedUsers = users.sort((a, b) => b.id - a.id);
    setUsers([]);

    setTimeout(() => {
      setUsers(sortedUsers);
    }, 0);
  };
  return (
    <div>
      <Header />
      {/* {loading ? (
        <Loading />
      ) : ( */}
      <>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <input
            type='text'
            placeholder='Search Users By Id , Email , Name or UserName'
            onChange={e => handleUserSearch(e)}
            className='input-post'
          />
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <tr>
              <th>
                Id{' '}
                {!expand ? (
                  <span
                    class='material-symbols-outlined'
                    onClick={handleSortAc}
                  >
                    expand_more
                  </span>
                ) : (
                  <span
                    class='material-symbols-outlined'
                    onClick={handleSortDc}
                  >
                    expand_less
                  </span>
                )}
              </th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>

              <th>Street</th>
              <th>Suite</th>
              <th>City</th>
              <th>Zipcode</th>
              <th>Lat</th>
              <th>Lng</th>
            </tr>
            {console.log(users, ':hh')}
            {users.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Link to='/comment'>{item.id}</Link>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.address.street}</td>
                  <td>{item.address.suite}</td>
                  <td>{item.address.city}</td>
                  <td>{item.address.zipcode}</td>
                  <td>{item.address.geo.lat}</td>
                  <td>{item.address.geo.lng}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </>
      {/* )} */}
    </div>
  );
}

export default Users;
