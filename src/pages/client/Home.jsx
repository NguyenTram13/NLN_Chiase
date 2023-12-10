import React, { useState } from "react";
import { useSelector } from "react-redux";
import ContentCenter from "../../components/ContentCenter";
import ContentLeft from "../../components/ContentLeft";
import ContentRight from "../../components/ContentRight";
import LayoutClient from "../../layouts/LayoutClient";
import { io } from "socket.io-client";
import { useRef } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { logEvent } from "@firebase/analytics";
import { analytics } from "../../firebase/config";

const Home = ({ socket }) => {
  // const socket = useRef();
  const { nofitycations } = useSelector((state) => state.user);

  const { user } = useSelector((state) => state.auth);
  const [userOnline, setUserOnline] = useState();
  useEffect(() => {
    socket.off("alertMessage");
    // socket.current = io("ws://localhost:8900");
    socket?.on("getUsers", (users) => {
      console.log(users);
      localStorage.setItem("usersOnline", JSON.stringify(users));
      setUserOnline(users);
    });
    socket?.on("alertMessage", (data) => {
      console.log(data);
      let myAudio = new Audio("../friend-request-14878.mp3");
      myAudio.play();
      toast.success(`${data.nameSender}: ${data.text}`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    });
  }, []);
  useEffect(() => {
    logEvent(analytics, "Vào home page");

    console.log("asdasdasd");
    console.log(JSON.parse(localStorage.getItem("usersOnline")));
    setUserOnline(JSON.parse(localStorage.getItem("usersOnline")));
  }, []);

  // useEffect(() => {
  //   const scriptElement = document.querySelector(
  //     'script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7039374965492590"]'
  //   );
  //   const handleScriptLoaded = () => {
  //     try {
  //       if (window.adsbygoogle) {
  //         console.log("pushing ads");
  //         adsbygoogle.push({});
  //       } else {
  //         scriptElement?.addEventListener("load", handleScriptLoaded());
  //         console.log("waiting util ads");
  //       }
  //     } catch (e) {
  //       console.log("🚀 ~ file: Home.jsx:52 ~ handleScriptLoaded ~ e:", e);
  //     }
  //   };
  //   handleScriptLoaded();

  //   return ()=>{
  //     if(scriptElement){
  //       scriptElement.removeEventListener("load",handleScriptLoaded);
  //     }
  //   }
  // }, []);
  return (
    <LayoutClient socket={socket}>
      <div className="lg:px-[80px] grid grid-cols-12 gap-5 py-3 bg-gray-200 h-[91vh] overflow-hidden">
        <div className="lg:col-span-3 overflow-auto  lg:block hidden">
          {nofitycations && (
            <ContentLeft
              nofitycations={nofitycations}
              user={user}
            ></ContentLeft>
          )}
        </div>
        <div className="content_center lg:col-span-6 col-span-12 overflow-y-auto">
          <div className="lg:px-5 px-2">
            <ContentCenter socket={socket} user={user}></ContentCenter>
          </div>
        </div>
        <div className="lg:col-span-3 lg:block hidden">
          {userOnline && (
            <ContentRight userOnlineCurrent={userOnline}></ContentRight>
          )}
        </div>
        {/* <ins
          className="adsbygoogle"
          style={{display: "block"}}
          data-ad-client="ca-pub-7039374965492590"
          data-ad-slot="2530158517"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins> */}
      </div>
    </LayoutClient>
  );
};

export default Home;
