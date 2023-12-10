import React from "react";
import { CaculateTime } from "../trait/CaculateTime";

const CartPostUseful = ({ post, user,handleBrowse }) => {
  return (
    <div className="p-3 rounded-xl shadow_noti bg-white col-span-4">
      <div className="grid grid-cols-12">
        <div className="col-span-12  ">
          <div className="flex px-3 justify-between  ">
            <div className="flex gap-3">
              <span className="w-[45px]">
                <img
                  className="w-full rounded-full"
                  src={
                    post.user_data.avatar
                      ? post.user_data.avatar
                      : "../undraw_profile.svg"
                  }
                  alt=""
                />
              </span>
              <p className="font-bold text-black flex flex-col">
                <span>
                  {post?.user_data?.firstName +
                    " " +
                    post?.user_data?.lastName}
                </span>
                <span className="text-gray-600 m-0">
                  {CaculateTime(post.createdAt)}
                </span>
              </p>
            </div>
            <div className="m-0 block relative text-2xl leading-none   font-bold ">
              <span className="cursor-pointer bg-red-500 text-white p-1 h-[30px] w-[30px] flex items-center justify-center rounded-full  transition-all">
                {JSON.parse(post.request_useful)?.length}
              </span>
            </div>
          </div>
          <p className="px-3 text-black">{post.content}</p>
          {post.post_data_two && post.share_post_id ? (
            <div className="mt-3 border rounded-xl mx-3 p-3 ">
              <div className="grid grid-cols-12 gap-2">
                {post.post_data_two?.file_data.length > 1 ? (
                  post.post_data_two?.file_data.map((item) => (
                    <div className="col-span-6">
                      <img className="w-full" src={item?.link} alt="" />
                    </div>
                  ))
                ) : (
                  <div className="col-span-12">
                    <img
                      className="w-full"
                      src={post.post_data_two?.file_data[0]?.link}
                      alt=""
                    />
                  </div>
                )}
              </div>
              <div className="share_content px-3 mt-3">
                <div className="flex  gap-3">
                  <span className="w-[45px]">
                    <img
                      className="w-full rounded-full"
                      src={
                        post.post_data_two.user_data.avatar
                          ? post.post_data_two.user_data.avatar
                          : "../undraw_profile.svg"
                      }
                      alt=""
                    />
                  </span>
                  <p className="font-bold text-black flex flex-col">
                    <span>
                      {post.post_data_two.user_data.firstName +
                        " " +
                        post.post_data_two.user_data.lastName}
                    </span>
                    <span className="text-gray-600 m-0">
                      {CaculateTime(post.post_data_two.createdAt)}
                    </span>
                  </p>
                </div>
                <div className="text-black fonr-bold ">
                  {post.post_data_two.content}
                </div>
              </div>
            </div>
          ) : !post.post_data_two && post.share_post_id ? (
            <div className="mt-3 border rounded-xl mx-3 p-3 bg-gray-400 ">
              <p className="text-bold text-black font-semibold">
                Bài viết này đã bị xóa hoặc không tồn tại
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-2">
              {post?.file_data &&
                post?.file_data.length > 0 &&
                post.file_data?.map((i) => {
                  if (i.link) {
                    if (post.file_data.length < 2) {
                      return (
                        <div key={i.id} className="col-span-12">
                          {i.link?.includes("video") ? (
                            <video
                              className="w-full object-cover h-[300px]"
                              src={i.link}
                              controls
                            ></video>
                          ) : (
                            <img
                              src={i.link}
                              className="w-full object-cover h-[300px]"
                              alt=""
                            />
                          )}
                        </div>
                      );
                    } else {
                      return (
                        <div key={i.id} className="col-span-6">
                          {i.link.includes("video") ? (
                            <video
                              className="w-full object-cover h-[300px]"
                              src={i.link}
                              controls
                            ></video>
                          ) : (
                            <img
                              src={i.link}
                              className="w-full object-cover h-[300px]"
                              alt=""
                            />
                          )}
                        </div>
                      );
                    }
                  }
                })}
            </div>
          )}
          <div className="border-b-2 p-2 info_post flex justify-between px-3">
            {post.like_count >= 0 && (
              <div className="flex gap-1 items-center">
                <span>
                  <img src="../heart_full.png" className="w-[25px]" alt="" />
                </span>
                <span className="font-bold">{post.like_count} Tym</span>
              </div>
            )}
            {post.comment_count >= 0 && (
              <div className="flex gap-1 items-center">
                <span
                  onClick={() => {
                    setShowFormComment((showFormComment) => !showFormComment);
                  }}
                  className="font-bold hover:underline cursor-pointer"
                >
                  {post.comment_count} Bình luận
                </span>
              </div>
            )}
          </div>
          <div className="flex justify-between gap-3 my-2">
                <span
                  onClick={() => handleBrowse(post,true)}
                  className="p-2  flex-1 text-center bg-blue-500 text-white rounded-lg fonr-semibold cursor-pointer hover:scale-105 transition-all"
                >
                  Duyệt hữu ích
                </span>
                <span
                  onClick={() => handleBrowse(post,false)}
                  className="p-2 flex-1 text-center bg-red-500 text-white rounded-lg fonr-semibold cursor-pointer hover:scale-105 transition-all"
                >
                  Không duyệt
                </span>
              </div>
        </div>
 
      </div>
    </div>
  );
};

export default CartPostUseful;
