import "./RemoveUserModal.css";

export default function RemoveUserModal({ onDestroy, onConfirm }) {
  return (
    <div className={`modal`}>
      <div className="modal-content">
        <i className="close" onClick={onDestroy}>
          X
        </i>
        <h2>Delete this user ?</h2>
        <div className="btns">
          <button className="accept" onClick={onConfirm}>
            Yes, delete user
          </button>
          <button className="reject" onClick={onDestroy}>
            Don't delete user
          </button>
        </div>
      </div>
    </div>
  );
}
