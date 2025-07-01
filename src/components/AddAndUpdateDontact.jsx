import React from "react";
import Modal from "./Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const cantactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
});

const AddAndUpdateDontact = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      toast.success("Contact add Successfully");
      onClose();
    } catch (error) {
      console.log("error is ", error);
    }
  };
  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      toast.success("Contact add Successfully");

      onClose();
    } catch (error) {
      console.log("error is ", error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={cantactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            isUpdate ? updateContact(values, contact.id) : addContact(values);
            // onClose()
          }}
        >
          <Form className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <lable htmlFor="name" className=" font-semibold">
                Name
              </lable>
              <Field name="name" className=" h-10 border pl-2"></Field>
              <div className="text-red-500  text-xs">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <lable htmlFor="email" className=" font-semibold">
                Email
              </lable>
              <Field
                type="email"
                name="email"
                className=" h-10 border pl-2"
              ></Field>
              <div className="text-red-500 text-xs">
                <ErrorMessage name="email" />
              </div>
            </div>
            <button className="bg-orange py-2 px-5 self-end rounded cursor-pointer hover:bg-yellow">
              {isUpdate ? "Update" : "add"} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateDontact;
