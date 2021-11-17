import React, { useState } from 'react';

const TodoForm = (props) => {
  const [content, setContent] = useState([props.item.content || '']);
  const contentChangeHandle = (event) => {
    setContent(event.target.value);
  };

  const contentSaveHandle = async () => {
    const { handleSave } = props;
    await handleSave({ content });
    setContent('');
  };

  const { handleCancel } = props;
  return (
    <div className='col-6 offset-3 mb-3'>
      <form>
        <div>
          <label className='form-label text-start d-block' htmlFor='fname'>
            Title:
          </label>
          <input
            className='form-control'
            type='text'
            name='content'
            value={content}
            onChange={contentChangeHandle}
          />
        </div>
        <div className='d-flex justify-content-end mt-2'>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type='button'
            className='btn btn-primary mx-2'
            onClick={contentSaveHandle}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
export default TodoForm;