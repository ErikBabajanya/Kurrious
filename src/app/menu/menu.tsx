"use client";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MenuContext } from "../context/MenuContext";

export default function Menu() {
  const [currentPage, setCurrentPage] = useState("");
  const router = useRouter();
  const menuContext = useContext(MenuContext);
  if (!menuContext) {
    return <div>loading...</div>;
  }

  useEffect(() => {
    const currentPageFromUrl = window.location.pathname;
    setCurrentPage(currentPageFromUrl);
  }, []);
  const { Jenny } = menuContext;

  return (
    <div className="flex justify-around">
      <div className="flex justify-between h-12 w-11/12">
        <span className="absolute w-full left-0 border border-sky-500"></span>
        <button
          style={{
            color: currentPage === "/pages/dashboard/jenny" ? "blue" : "black",
          }}
          onClick={Jenny}
        >
          Jenny
        </button>
        <button>Messages</button>
        <button>Records</button>
        <button>Customers</button>
        <button>Locations</button>
        <button>Maintenance</button>
        <button>Dashboards</button>
        <span className="absolute w-full left-0 border border-sky-500 mt-12"></span>
      </div>
    </div>
  );
}
