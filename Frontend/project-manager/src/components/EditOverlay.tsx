import "./EditOverlay.css";
import type { TaskData } from "../types/tasks";

// 1. Define the "Shape" of the props
interface EditOverlayProps {
  isOpen: boolean; // A simple true/false flag
  onClose: () => void;
  taskData: TaskData;
}

function EditOverlay({ isOpen, onClose, taskData }: EditOverlayProps) {
  // 1. If not open, don't render anything
  if (!isOpen) return null;

  return (
    // 2. The Backdrop (Dark background)
    // Clicking here triggers onClose
    <div className="overlay-backdrop" onClick={onClose}>
      {/* 3. The Modal Content (White box) */}
      {/* stopPropagation prevents clicks here from bubbling up to backdrop */}
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        {/* Clean Form Structure using CSS classes */}
        <form className="edit-task-form" onSubmit={(e) => e.preventDefault()}>
          <h2>Edit Task</h2>

          <div className="form-group">
            <label>{taskData.name}</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter task title"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              rows={4}
              placeholder="Enter task description"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-save">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditOverlay;
