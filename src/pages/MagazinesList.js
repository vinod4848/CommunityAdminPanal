import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../utils/base_url";

const MagazinesList = () => {
  const [magazines, setMagazines] = useState([]);

  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        const response = await axios.get(`${base_url}/magazines`);
        setMagazines(response.data);
      } catch (error) {
        console.error("Error fetching magazines:", error);
      }
    };

    fetchMagazines();
  }, []);

  const downloadPdf = (pdfUrl) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  };

  return (
    <div className="container mt-5">
      <h1>Magazines List</h1>
      <ul>
        {magazines.map((magazine) => (
          <li key={magazine._id}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: "1" }}>
                <h2>{magazine.title}</h2>
                <p>Date: {magazine.date}</p>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <button
                  className="btn btn-primary"
                  onClick={() => downloadPdf(magazine.image)}
                >
                  Download PDF
                </button>
              </div>
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MagazinesList;
