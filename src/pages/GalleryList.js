import React, { useState, useEffect } from "react";
import { base_url } from "../utils/base_url";
import axios from "axios";
import { Table, Image, Space } from "antd";

const GalleryList = () => {
  const [gallerys, setGallerys] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(`${base_url}/gallery`);
        const data = response.data;
        setGallerys(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGallery();
  }, []);

  const columns = [
    {
      title: "Images",
      dataIndex: "images",
      render: (images) => (
        <Space size={[8, 8]} wrap>
          {images.map((imageUrl, index) => (
            <Image
              key={index}
              src={imageUrl}
              alt={`Image ${index}`}
              style={{ width: "250px", height: "250px", marginBottom: "8px" }}
            />
          ))}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Gallery</h1>
      <Table dataSource={gallerys} columns={columns} />
    </div>
  );
};

export default GalleryList;
