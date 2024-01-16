import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { base_url } from "../utils/base_url";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${base_url}/properties`);
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const columns = [
    {
      title: "Post By",
      dataIndex: "username",
    },
    {
      title: "Ad Title",
      dataIndex: "adTitle",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Facing",
      dataIndex: "facing",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Property Type",
      dataIndex: "propertyType",
    },
    {
      title: "Construction Status",
      dataIndex: "constructionStatus",
    },
    {
      title: "Furnishing",
      dataIndex: "furnishing",
    },
    {
      title: "Super Builtup Area (sq.ft)",
      dataIndex: "superBuiltupArea",
    },
    {
      title: "Carpet Area (sq.ft)",
      dataIndex: "carpetArea",
    },
    {
      title: "Bathrooms",
      dataIndex: "bathrooms",
    },
    {
      title: "Maintenance Monthly",
      dataIndex: "maintenanceMonthly",
    },
    {
      title: "Total Floors",
      dataIndex: "totalFloors",
    },
    {
      title: "Floor No",
      dataIndex: "floorNo",
    },
    {
      title: "Car Parking",
      dataIndex: "carParking",
    },

    {
      title: "Images",
      dataIndex: "images",
      render: (images, record) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Property ${record.key + 1}`}
              style={{
                width: "100px",
                height: "100px",
                margin: "5px",
              }}
            />
          ))}
        </div>
      ),
    },
  ];
  const data = properties.map((property, index) => ({
    key: index,
    ...property,
    username: property.userId.username,
  }));

  return (
    <div>
      <h2>Property List</h2>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default PropertyList;
