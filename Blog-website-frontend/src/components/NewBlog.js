import { Edit } from "@mui/icons-material";
import React, { useState } from "react";
import { useBlogsContext } from "../hooks/useBlogsContext";
import { useNavigate } from "react-router-dom";

import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const NewBlog = () => {
  const { dispatch } = useBlogsContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [category, setCategory] = useState("Technology");

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Do You Want to Submit ?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Submit",
      confirmButtonColor: "#1aac83",
      cancelButtonText: "Cancel",
      icon: "question",
    }).then(async (result) => {
      if (result.isConfirmed) {
        var u = JSON.parse(localStorage.getItem("user"));
        console.log(u);
        const authorDetails = { name: u.name, email: u.email };

        const blog = {
          authorDetails,
          title,
          description,
          image,
          articleBody,
          category,
        };
        console.log(blog);
        const response = await fetch(
          "https://anmol-solr.onrender.com/api/blogs/",
          {
            method: "POST",
            body: JSON.stringify(blog),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const json = await response.json();

        if (!response.ok) {
          setError(json.error);
          setEmptyFields(json.emptyFields);
          Swal.fire({
            title: "Error",
            text: "Something went Wrong!!",
            confirmButtonColor: true,
            confirmButtonText: "Okay",
            confirmButtonColor: "#F27474",
            icon: "error",
          });
        }
        if (response.ok) {
          setTitle("");
          setDescription("");
          setImage("");
          setArticleBody("");
          setCategory("");
          setError(null);
          setEmptyFields([]);

          console.log("New blog added", json);
          dispatch({ type: "CREATE_BLOG", payload: json });
          Swal.fire({
            title: "Successfully Submitted",
            confirmButtonColor: true,
            confirmButtonText: "Okay",
            confirmButtonColor: "#1aac83",
            icon: "success",
          });
          navigate(`/blog/${json._id}`);
        }
      }

      else
        Swal.fire({
          title: " Cancelled",
          confirmButtonColor: true,
          confirmButtonText: "Okay",
          confirmButtonColor: "#F27474",
          icon: "error",
        });
    });
  };

  const items = [
    { key: "Technology", label: "Technology" },
    { key: "Business", label: "Business" },
    { key: "Digital Marketing", label: "Digital Marketing" },
    { key: "Lifestyle", label: "Lifestyle" },
    { key: "Personal Development", label: "Personal Development" },
    { key: "Health and Wellness", label: "Health and Wellness" },
    { key: "Travel", label: "Travel" },
    { key: "Food and Cooking", label: "Food and Cooking" },
    { key: "Fashion and Beauty", label: "Fashion and Beauty" },
    { key: "Personal Finance", label: "Personal Finance" },
    { key: "Sports and Fitness", label: "Sports and Fitness" },
    { key: "Arts and Culture", label: "Arts and Culture" },
    { key: "Automotive", label: "Automotive" },
    { key: "Home and Garden", label: "Home and Garden" },
    { key: "Gaming", label: "Gaming" },
    { key: "Science and Environment", label: "Science and Environment" },
    { key: "Photography", label: "Photography" },
    { key: "Music", label: "Music" },
    { key: "Film and Television", label: "Film and Television" },
    { key: "Politics and Society", label: "Politics and Society" },
  ];

  return (
    <div>
      <div>
        <h1>
          Create New Blog <Edit style={{ fontSize: 40 }} />
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="category">Category:</label>
          <Dropdown
            className="dropDown"
            menu={{
              items,
              selectable: true,
              defaultSelectedKeys: ["Technology"],
              onSelect: (e) => {
                setCategory(e.selectedKeys[0]);
              },
            }}
            trigger={"click"}
            arrow={"true"}
          >
            <div className="dropdown">
              <Space>
                <p>
                  {category} <DownOutlined style={{ fontSize: 25 }} />
                </p>
              </Space>
            </div>
          </Dropdown>
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="articleBody">Article Body:</label>
          <CKEditor
            editor={Editor}
            data=""
            onChange={(event, editor) => {
              const data = editor.getData();
              setArticleBody(data);
            }}
          />
          <br />
        </div>

        <button type="submit">Submit</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default NewBlog;
