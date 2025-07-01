import React, { use, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { IoSearchSharp } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import Modal from "./components/Modal";
import AddAndUpdateDontact from "./components/AddAndUpdateDontact";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer, toast } from "react-toastify";
import NotFoundContact from "./components/NotFoundContact";

const App = () => {
  const [contacts, setContacts] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
      } catch (err) {
        console.log("error", err);
      }
    };
    getContacts();
  }, []);
  const filterContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase()))


      setContacts(filteredContacts);


      return filteredContacts;
    });
  };
  console.log(contacts);
  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex gap-2 items-center">
          <div className="flex relative items-center flex-grow">
            <IoSearchSharp className=" absolute text-3xl text-white ml-2 cursor-pointer" />
            <input onChange={filterContacts}
              className=" h-10 flex-grow bg-transparent border-white border-2 rounded-md text-white pl-11 pr-2  "
              type="text"
            />
          </div>
          <FaPlusCircle
            onClick={onOpen}
            oncli
            className="text-white text-3xl cursor-pointer"
          />
        </div>
        {contacts.length<=0 ?<NotFoundContact/>:  <div>
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>  }
      </div>
      <AddAndUpdateDontact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
