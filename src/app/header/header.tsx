import React from "react";

export default function Header() {
  return (
    <div className="flex justify-around">
      <div className="flex h-14 items-center justify-between w-11/12">
        <div>Kurrious</div>
        <div className="w-3/5">
          <input
            className="h-10 w-full border-solid border-2 bg-slate-300 border-slate-400 rounded"
            placeholder="Search"
          />
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-cyan-700 rounded-full"></div>
          <div>Admin</div>
        </div>
      </div>
    </div>
  );
}
