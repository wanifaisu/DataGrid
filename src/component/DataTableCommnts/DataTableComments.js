import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Header from '../Header/Header';
import './style.css';
export default function DataTableComments() {
  const [comments, setComments] = React.useState([]);
  const [commentSearched, setCommentSearched] = React.useState([]);
  const [expand, setExpand] = React.useState(false);
  const [pageNo, setPageNo] = React.useState(5);
  const [page, setPage] = React.useState(0);
  React.useEffect(() => {
    getAllPosts();
  }, []);
  const getAllPosts = () => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=1`)
      .then(response => response.json())
      .then(json => {
        setComments(json);
        setCommentSearched(json);
      });
  };
  const handleCommentSearch = event => {
    event.preventDefault();
    if (event.target.value) {
      let filtered = comments.filter(item => {
        return (
          item.id == event.target.value ||
          item.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.email.toLowerCase().includes(event.target.value.toLowerCase())
        );
      });

      setComments(filtered);
    } else {
      setComments(commentSearched);
      setTimeout(() => {
        getAllPosts();
      }, 50);
    }
  };
  const handleSortAc = () => {
    setExpand(true);
    let sortedComments = comments.sort((a, b) => a.id - b.id);
    setComments([]);
    console.log(sortedComments);
    setTimeout(() => {
      setComments(sortedComments);
    }, 0);
  };
  const handleSortDc = () => {
    setExpand(false);
    let sortedComments = comments.sort((a, b) => b.id - a.id);
    setComments([]);
    console.log(sortedComments);
    setTimeout(() => {
      setComments(sortedComments);
    }, 0);
  };
  const nextPage = () => {
    setPageNo(pageNo + 5);
    setPage(page + 5);
  };
  const prePage = () => {
    setPageNo(pageNo - 5);
    setPage(page - 5);
  };
  return (
    <div>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input
          type='text'
          placeholder='Search Posts By Id , Email or Name '
          onChange={e => handleCommentSearch(e)}
          className='input-post'
        />
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <tr>
            <th
              style={{ display: 'fex', alignItems: 'center', width: '100px' }}
            >
              <span> Id</span>
              {!expand ? (
                <span class='material-symbols-outlined' onClick={handleSortAc}>
                  expand_more
                </span>
              ) : (
                <span class='material-symbols-outlined' onClick={handleSortDc}>
                  expand_less
                </span>
              )}
            </th>
            <th>PostId</th>
            <th>Email</th>
            <th>Name</th>
            <th>Body</th>
          </tr>
          {console.log(page, pageNo)}
          {comments.slice(page, pageNo).map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.postId}</td>
                <td>{item.email}</td>
                <td>{item.name}</td>
                <td>{item.body}</td>
              </tr>
            );
          })}
        </table>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '30px',
          marginTop: '15px',
        }}
      >
        <button
          style={{
            backgroundColor: 'blue',
            color: 'white',
            width: '100px',
            height: '25px',
          }}
          onClick={() => prePage()}
        >
          pre
        </button>
        <button
          style={{
            backgroundColor: 'blue',
            color: 'white',
            width: '100px',
            height: '25px',
            marginLeft: '20px',
          }}
          onClick={() => nextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}
