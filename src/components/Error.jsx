import { useState } from "react";

export default function CustomAlert({ message }) {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div
      className="alert alert-danger alert-dismissible fade show"
      role="alert"
    >
      {message}
      <button
        type="button"
        className="btn-close"
        onClick={() => setShow(false)}
      ></button>
    </div>
  );
}
