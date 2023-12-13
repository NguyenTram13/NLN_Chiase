import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setCurrentChat } from "../store/reducers/userReducer";
import { useDispatch } from "react-redux";

const ItemConversationCurrent = ({
  conversation,
  currentUser,
  // setCurrentChat = ()=>{},
  arrivalMessage,
  curentChat,
  setArrivalMessage,
  messages
}) => {
  const [friend, setFriend] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hightLight, setHightLight] = useState();
  
  useEffect(() => {
    const friend_id = [conversation.user_one, conversation.user_second].find(
      (u) => u !== currentUser.id
    );

    const getUser = async () => {
      try {
        const response = await axios({
          url: "auth/admin/user/" + friend_id,
        });
        console.log(response);
        if (response.status === 200) {
          setFriend(response.data);
        }
      } catch (e) {
        console.log(e);
        if (e.response.status == 401) {
          navigate("/login");
        }
      }
    };
    getUser();
    console.log("🚀 ~ file: ItemConversationCurrent.jsx:45 ~ useEffect ~ arrivalMessage:", arrivalMessage)
    setHightLight(arrivalMessage);
  console.log("🚀 ~ file: ItemConversationCurrent.jsx:22 ~ hightLight:", hightLight)

  }, [conversation, currentUser, arrivalMessage]);
  if (!friend) <div>Loading</div>;
  return (
    <>
      {friend &&  (

        <div
          onClick={() => {
              dispatch(setCurrentChat(conversation));
              setArrivalMessage(null)

              setHightLight(false);
          }}
          className={`w-full rounded-lg grid grid-cols-12 gap-3 items-center p-2 hover:bg-gray-200 cursor-pointer transition-all ${
            friend.id == arrivalMessage?.sender && hightLight
              ? "bg-gray-300"
              : ""
          }`}
        >
          <div className="xl:col-span-2 col-span-12 max-w-full w-full">
            <p className="max-w-full m-0">
              <img
                src={friend.avatar ? friend.avatar : "./undraw_profile.svg"}
                className="xl:w-full w-[50px] block rounded-full"
                alt=""
              />
            </p>
          </div>
          <div className="md:col-span-8 md:block hidden">
            <span className="font-bold text-black">
              {friend.firstName + " " + friend.lastName}
            </span>
            {/* {friend.id == arrivalMessage?.sender && ( */}
            <p className="text-black m-0 flex">
              <span>
                {conversation.message_data[0]
                  ?.sender === currentUser?.id
                  ? "Bạn:  "
                  : ""}
              </span>

              <span>
                {arrivalMessage?.text && arrivalMessage?.sender === friend?.id
                  ? messages[messages.length -1]?.text
                  : conversation.message_data[
                    0
                  ]?.text
                 }
              </span>
              {friend.id == arrivalMessage?.sender && hightLight && (
                <span className="w-[10px] h-[10px] rounded-full bg-blue-500 inline-block"></span>
              )}
            </p>
            {/* )} */}
          </div>
        </div>
      )
    }
    </>
  );
};

export default ItemConversationCurrent;
