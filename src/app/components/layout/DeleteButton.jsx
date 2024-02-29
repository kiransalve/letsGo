import React, { useState } from "react";

const DeleteButton = ({ label, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed bg-black/80 inset-0 h-full flex item-center justify-center ">
        <div className="bg-white p-4 rounded-lg my-auto">
          <div className="text-slate-600">Do you want to delete?</div>
          <div className="flex gap-2 m-1">
            <button
              className="outline-none border rounded-xl border-gray-700 px-4 py-2 block text-gray-700 font-semibold"
              type="button"
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </button>
            <button
              className="outline-none border rounded-xl border-gray-700 px-4 py-2 block text-gray-700 font-semibold"
              type="button"
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
            >
              Yes, delete..!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <div onClick={() => setShowConfirm(true)}>{label}</div>;
};

export default DeleteButton;
