import { useBlogsContext } from "../hooks/useBlogsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyBlogDetails = ({ blog }) => {
  const { dispatch } = useBlogsContext();

  const navigate = useNavigate();

  const handleDelete = async () => {
    Swal.fire({
      title: "Are You Sure??",
      text: "You will not be able to recover this Blog !!!",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#F27474",
      cancelButtonText: "Cancel",
      icon: "question",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(
          "https://anmol-solr.onrender.com/api/blogs/" + blog._id,
          {
            method: "DELETE",
          }
        );
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "DELETE_BLOG", payload: json });
          Swal.fire({
            title: "Successfully Deleted",
            confirmButtonColor: true,
            confirmButtonText: "Okay",
            confirmButtonColor: "#1aac83",
            icon: "success",
          });
          window.location.reload();
        } else {
          Swal.fire({
            title: "Error",
            text: "Something went Wrong!!",
            confirmButtonColor: true,
            confirmButtonText: "Okay",
            confirmButtonColor: "#F27474",
            icon: "error",
          });
        }
      } else {
        Swal.fire({
          title: " Cancelled",
          confirmButtonColor: true,
          confirmButtonText: "Okay",
          confirmButtonColor: "#F27474",
          icon: "error",
        });
      }
    });
  };
  const handleEdit = async () => {
    navigate("/edit/" + blog._id);
  };

  return (
    <div className="blog-details">
      <img src={blog.image} alt={blog.title} />
      <h4
        onClick={() => {
          navigate(`/blog/${blog._id}`);
        }}
      >
        {blog.title}
      </h4>
      <p>
        <strong>Author :</strong> {blog.authorDetails.name}{" "}
      </p>
      <p>
        <strong>Email :</strong> {blog.authorDetails.email}{" "}
      </p>
      <br />
      <p>
        <strong>Description :</strong> {blog.description}
      </p>
      <br />
      <p>
        {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
      </p>
      <span
        className="material-symbols-outlined blog-details-span-delete"
        onClick={handleDelete}
      >
        delete
      </span>
      <br />
      <span
        className="material-symbols-outlined blog-details-span-edit"
        onClick={() => {
          handleEdit(blog._id);
        }}
      >
        edit
      </span>
    </div>
  );
};

export default MyBlogDetails;
