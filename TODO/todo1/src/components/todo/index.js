import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import TodoForm from './Form';
import './createTodo.css';
import api from '../../services/api/api';
import { startGetTasks, getTaskSuccess, getTaskFail } from '../../services/actions/task';
import { connect } from 'react-redux';


const Todo = (props) => {
  const {
    startGetTasks,
    getTaskSuccess,
    getTaskFail,
    taskReducer,

  } = props;
  const [records, setRecords] = useState([]);
  const [itemEdit, setItemEdit] = useState(undefined);

  useEffect(() => {
    fetchDataApi();
  }, []);

  const fetchDataApi = async () => {
    const data = await getAllApi();
    try {
      if (data.message) {
        alert(data.message);
      } else {
        setRecords(data.items);
      }
    } catch {
      alert(data.error);
    }
  };

  const getAllApi = async () => {
    return api.get('tasks', null)
      .then(res => res)
      .catch(error => error);
  };

  const createApi = async (data) => {
    let params = { title: data?.content }
    startGetTasks();
    api.post('tasks', params)
      .then(async res => {
        await getTaskSuccess(res)
        await fetchDataApi();
      })
      .catch(error => {
        if (error?.message)
          alert(error.message)
        getTaskFail(error)
      });
      
  };

  const deleteApi = async (id) => {
    return api.deleted('tasks/' + id, null)
      .then(res => { return fetchDataApi() })
      .catch(error => error);

  };

 const updateApi = async (data, id) => {
    let params = { title: data?.content }
    api.update('tasks/' + itemEdit.id, params)
      .then(async res => {
        await fetchDataApi();
      })
      .catch(error => {
        if (error?.message)
          alert(error.message)
      });
  };

  const handleEditItem = (record) => {
    setItemEdit(record);
  };

  const handleDeleteItem = async (id) => {
    try {
      const res = await deleteApi(id);
      console.log(res);
    } catch {
      let index = records.findIndex((item) => item.id === id);
      records.splice(index, 1);
      setItemEdit(index);
    }
  };

  const handleCancel = () => {
    setItemEdit(undefined);
  };

  const handleSave = async (data) => {
    let res;
    if (itemEdit?.id) {
      //update
       res = await updateApi(data);
    } else {
      createApi(data);
    }
  };
  const _renderLoading = () => {
    return (
      <div class="spinner-border" role="status">
      </div>
    )
  }

  const handleLogOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    props.history.push('./login');
  };

  if (!localStorage.getItem('username')) {
    return <Redirect to='/login' />;
  } else {
    return (
      <div className='row no-gutters'>
        <button
          className='btn align btn-logout btn-primary'
          onClick={handleLogOut}
        >
          Logout
        </button>
       
        <h2 className='title'>Todo List</h2>
        <div className="input-group">
          <div className="form-outline">
            <input type="search" id="form1" className="form-control" placeholder="Search" />
          </div>
        </div>
        <div>
          <button
            className='btn btn-success align'
            onClick={() => handleEditItem({})}
          >
            Create a todo
          </button>
        </div>
        {!!itemEdit && (
          <TodoForm
            item={itemEdit}
            handleCancel={handleCancel}
            handleSave={handleSave}
          />
        )}

        <div className='col-12 table-wrapper'>
          {
            taskReducer.isLoading
              ? _renderLoading()
              :
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>ID code</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>createdAt</th>
                    <th>updatedAt</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => {
                    return (
                      <tr key={record.id}>
                        <td>{record.id}</td>
                        <td>{record.title}</td>
                        <td>{record?.status}</td>
                        <td>{record?.createdAt.split('T', 1)}</td>
                        <td>{record?.updatedAt.split('T', 1)}</td>
                        <td>
                          <button
                            className='btn btn-warning'
                            style={{ marginRight: '5px' }}
                            onClick={() => handleEditItem(record)}
                          >
                            Update
                          </button>

                          <button
                            className='btn btn-danger'
                            onClick={async () => await handleDeleteItem(record.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
          }
        </div>

        <div className='col-12 mt-5'>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabindex="-1">Previous</a>
              </li>
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  taskReducer: state.taskReducer
});

const mapDispatchToProps = ({
  startGetTasks,
  getTaskSuccess,
  getTaskFail
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);