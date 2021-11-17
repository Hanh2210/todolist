import types from './types/index';
import api from '../api/api';

export const startGetTasks = () => ({
  type: types.START_GET_TASKS,
})

export const getTaskSuccess = (payload) => ({
  type: types.GET_TASK_SUCCESS,
  data: payload,
  success: true
})

export const getTaskFail = (payload) => ({
  type: types.GET_TASK_FAILURE,
  data: payload,
  success: false
})