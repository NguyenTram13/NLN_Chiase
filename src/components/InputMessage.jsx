import React, { useRef, useState } from "react";
import Picker from "emoji-picker-react";

const InputMessage = ({ createMessage }) => {
  const [message, setMessage] = useState();

  const [showEmoji, setShowEmoji] = useState(false);
  const input_value = useRef();
  const onEmojiClick = (event, emojiObject) => {
    console.log(event);
    input_value.current.value = message + " " + event.emoji;
    setMessage((pre) => pre + " " + event.emoji);
    setShowEmoji(false);
  };
  return (
    <div className="h-[10%] p-3">
      <form onSubmit={(e) => {
        setMessage("");
        createMessage(e, message);
      }} action="">
        <div className="flex gap-3">
          <input
            type="text"
            ref={input_value}
            onChange={(e) => setMessage(e.target.value)}
            name="message"
            className="w-full resize-none py-2 px-4 text-black outline-none bg-gray-200 rounded-full"
            placeholder="Aa"
            value={message}
          />
          <div className="p-1 relative hover:bg-gray-300 rounded-full w-fit cursor-pointer">
            {showEmoji && (
              <div className="fixed  z-[100] top-[60%] right-[5%] -translate-y-1/2">
                <Picker
                  pickerStyle={{ width: "100%" }}
                  onEmojiClick={onEmojiClick}
                ></Picker>
              </div>
            )}
            <img
              onClick={() => setShowEmoji((showEmoji) => !showEmoji)}
              src="./smile.png"
              className="w-[40px]"
              alt=""
            />
          </div>
          <button
            type="submit"
            className="p-2 hover:bg-gray-300 rounded-full transition-all"
          >
            <img src="../../send.png" className="w-[30px]" alt="" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputMessage;
