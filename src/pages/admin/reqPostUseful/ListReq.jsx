import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../../layouts/LayoutAdmin";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import CardReport from "../../../components/CardReport";
import CartPostUseful from "../../../components/CartPostUseful";
import Swal from "sweetalert2";
import { setCountReqPostUseful } from "../../../store/reducers/userReducer";

const ListReq = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [loadingBrowse, setLoadingBrowse] = useState(false);
  const dispatch = useDispatch();

  const fetchListPost = async (limit = 15) => {
    try {
      setLoading(true);
      const response = await axios({
        url: `/auth/post/getListPostUseful?limit=${limit}`,
      });
      console.log(
        "🚀 ~ file: ListReq.jsx:14 ~ fetchListPost ~ response:",
        response
      );
      if (response.status === 200) {
        setLoading(false);

        setPosts(response.data);
        dispatch(setCountReqPostUseful(response.data.length));
      }
    } catch (e) {
      console.log("🚀 ~ file: ListReq.jsx:21 ~ fetchListPost ~ e:", e);
      setLoading(false);

      if (e.response?.status == 401) {
        navigate("/admin/login");
      }
    }
  };
  const handleBrowse = async (item, statusBrow = true) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        console.log(item);
        setLoadingBrowse(true);
        const repsonse = await axios({
          method: "PATCH",
          url: `auth/post/request-useful/${item.id}?type=admin&browser=${statusBrow}`,
        });
        if (repsonse.status === 200) {
          setLoadingBrowse(false);
          fetchListPost();
          return repsonse.data;
        }
      });
    } catch (e) {
      console.log("🚀 ~ file: ListReq.jsx:62 ~ handleBrowse ~ e:", e)
      setLoadingBrowse(false);

      if (e.response.status == 401) {
        navigate("/admin/login");
      }
    }
  };
  useEffect(() => {
    fetchListPost();
  }, []);
  return (
    <LayoutAdmin>
      {loadingBrowse && (
        <div className="fixed flex items-center justify-center inset-0 bg-[rgba(255,255,255,0.7)] z-10">
          Processing
        </div>
      )}
      <div>
        <div className="flex-1 w-3/4 mt-3">
          <form>
            <div className="flex gap-3">
              <div className="w-2/5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  onChange={() => {}}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="grid grid-cols-12 gap-3 my-3">
          {!loading &&
            posts?.length > 0 &&
            posts.map((post) => (
              <CartPostUseful
                key={post.id}
                user={user}
                post={post}
                handleBrowse={handleBrowse}
              ></CartPostUseful>
            ))}
            {
            posts?.length <= 0 &&
              <div>
                <p className="font-bold text-red-500"
                >Không có dữ liệu</p>
              </div>
            }
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default ListReq;
