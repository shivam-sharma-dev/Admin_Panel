import ReactModal from 'react-modal';

const BlogModal = ({ isOpen, onClose, form, handleInputChange, handleFormSubmit, isEditing }) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Blog Form"
    ariaHideApp={false} // Only for development, make sure to set your app element in production
    className="modal"
    overlayClassName="modal-overlay"
  >
    <form onSubmit={handleFormSubmit} className="p-6">
      <h3 className="text-xl font-bold mb-4">{isEditing ? 'Edit Blog' : 'Create Blog'}</h3>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleInputChange}
        className="mb-2 p-2 border rounded w-full"
        required
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={form.author}
        onChange={handleInputChange}
        className="mb-2 p-2 border rounded w-full"
        required
      />
      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={handleInputChange}
        className="mb-2 p-2 border rounded w-full"
        required
      />
      <input
        type="text"
        name="cover"
        placeholder="Cover Image URL"
        value={form.cover}
        onChange={handleInputChange}
        className="mb-2 p-2 border rounded w-full"
        required
      />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-black p-2 rounded"
        >
          Cancel
        </button>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {isEditing ? 'Update Blog' : 'Create Blog'}
        </button>
      </div>
    </form>
  </ReactModal>
);
