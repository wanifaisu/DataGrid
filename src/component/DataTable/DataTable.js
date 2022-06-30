import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';

import './style.css';
export default function DataTable() {
  let navigate = useNavigate;
  const [post, setPost] = React.useState([]);
  const [postSearch, setPostSearch] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  React.useEffect(() => {
    getAllPosts();
  }, []);
  // (https://jsonplaceholder.typicode.com/)

  const getAllPosts = () => {
    setloading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then(response => response.json())

      .then(json => {
        setPost(json);
        setPostSearch(json);
        setloading(false);
      });
  };
  const handlePostSearch = event => {
    console.log(event.target.value);
    event.preventDefault();
    if (event.target.value) {
      let filtered = post.filter(item => {
        return (
          item.id == event.target.value ||
          item.userId == event.target.value ||
          item.title.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.body.toLowerCase().includes(event.target.value.toLowerCase())
        );
      });

      setPost(filtered);
    } else {
      setPost(postSearch);
      setTimeout(() => {
        getAllPosts();
      }, 50);
    }
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <input
              type='text'
              placeholder='Search Posts By Id , userId  or Title'
              onChange={e => handlePostSearch(e)}
              className='input-post'
            />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <tr>
                <th>Id</th>
                <th>UserId</th>
                <th>Body</th>
                <th>title</th>
              </tr>
              {console.log(post?.splice(0, 10))}
              {post?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.userId}</td>
                    <td>{item.body}</td>
                    <td>{item.title}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </>
      )}
    </div>
  );
}
