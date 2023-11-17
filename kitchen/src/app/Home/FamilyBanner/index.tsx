import React from "react";
import Member from "./Member";
import MonkeyChatAvatar from "./MonkeyChatAvatar.jpg";
import BeaverChatAvatar from "./BeaverChatAvatar.jpg";

const members = [
  {
    name: "Beaver Chat",
    image: BeaverChatAvatar,
    title: "Chat de Cuisine",
    description: (
      <>
        <b>Beaver chat</b> (aka Priscilla) is the master chef in the family.
        Having co-founded Chateau des Chats, she shoulders the responsibility
        of ensuring that every member (chat) in the family is well-fed and has
        the right amount of nutrition. This heavy responsibility is also why
        she is frazzled all the time.
      </>

    )
  },
  {
    name: "Monkey Chat",
    image: MonkeyChatAvatar,
    title: "Sous Chat",
    description: (
      <>
        <b>Monkey Chat</b> (aka Daniel), co-founder of the Chateau des Chats, wears
        multiple hats in the family. Amongst his many roles, he is Chief Dishwasher,
        Executive Gourmet Finisher, Director of Food Preparation, and Head of Ad-hoc
        Tasks. His time in the Chateau des Chat has seen his belly grow leaps and
        bounds.
      </>
    )
  },
];


export default function FamilyBanner() {
  return (
    <div className="my-12 flex items-center justify-center">
      <div className="container flex flex-col justify-center items-center ">
        <h2 className="my-8 text-3xl font-bold">
          Family Members
        </h2>
        <div className="flex flex-col md:flex-row justify-center">
          {members.map((e) => (
            <Member
              image={e.image}
              name={e.name}
              key={e.name}
              title={e.title}
            >
              {e.description}
            </Member>
          ))}

        </div>
      </div>
    </div>
  );
}

