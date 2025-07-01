import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import AddAndUpdateDontact from "./AddAndUpdateDontact";
import useDisclouse from "../hooks/useDisclouse";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const { isOpen, onClose, onOpen } = useDisclouse();
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        key={contact.id}
        className="bg-yellow flex justify-between items-center text-black p-2 rounded-xl mt-2"
      >
        <div className="flex justify-start items-center gap-1.5">
          <HiOutlineUserCircle className="text-orange text-4xl" />
          <div className="">
            <h2 className=" font-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex items-center text-3xl">
          <RiEditCircleLine onClick={onOpen} className=" cursor-pointer" />
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className="text-orange cursor-pointer"
          />
        </div>
      </div>
      <AddAndUpdateDontact contact={contact} isUpdate isOpen={isOpen} onClose={onClose}/>
    </>
  );
};

export default ContactCard;
