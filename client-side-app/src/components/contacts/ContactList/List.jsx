import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactServices } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactList = () => {
  
  const [contacts, setContacts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading]=useState(false);
  
  

  useEffect(() => {
    let promise = new Promise((res, rej) => {
      let response = ContactServices.getAllContacts();
      res(response);
      rej("error");
    });
    promise.then((res) => {
        // setState({ ...state, loading: true });
        setLoading(true);
        console.log(res.data);
        setContacts(res.data.contacts);
        setLoading(false);
        // setState({ ...state, loading: false, contacts: res.data.contacts });
      })
      .catch(() => {
        alert("error while fetching data");
        // setState({ ...state, loading: false, errorMassage: "error massage" });
        setLoading(false)
      });
  }, []);

  // let { loading,  errorMassage } = state;
  


  const handleSearchInputChange = (e) => {
    const inputText = e.target.value;
    setSearchInput(inputText);

    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(inputText.toLowerCase())
    );

    setSearchResults(filteredContacts);
  };

  const deleteContact=(id)=>{
      let promise =new Promise((res,reject)=>{
        let response=ContactServices.deleteContact(id);
        res(response);
      reject("Error");        

      })
      promise.then((res) => {
        // setState({ ...state, loading: true });
        setLoading(true);
        // console.log(res.data);
        const updatedContacts = contacts.filter((contact) => contact.id !== id);
        

        // Show a toast message when contact is deleted
        toast.success("Contact deleted successfully", {
          position: "top-center",
          autoClose: 1000,
        });
        //update contact list
        // setState({ ...state, loading: false, contacts: updatedContacts });
        setContacts(updatedContacts);
        setLoading(false);


      })
      .catch((error) => {
        console.error("Error deleting contact:", error);
        // Show an error toast message if deletion fails
        toast.error("Error deleting contact", {
          position: "top-center",
          autoClose: 2000, // Close after 2 seconds
        });
      });



  }

  return (
    <div>
      <ToastContainer/>
      <React.Fragment>
        {/* <pre> {JSON.stringify(contacts)}</pre> */}
        <section className="contact-search p-3">
          <div className="container">
            <div className="grid">
              <div className="row">
                <p className="h3">
                  Contact Manager{" "}
                  <Link to={"/contacts/add"} className="btn btn-primary">
                    <i className="fa fa-plus-circle ms2 me-2" />
                    New
                  </Link>
                </p>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati eligendi dolore repudiandae eum sint, dolor
                  reprehenderit officiis temporibus perspiciatis doloribus, ipsa
                  aliquid magni exercitationem accusantium cum voluptates velit,
                  fugit praesentium!
                </p>
              </div>
              <div className="row d-flex justify-content-center ">
                <div className="col-md-4">
                  <form className="row">
                    <div className="col mb-2">
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="search names"
                        className="form-control"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                      />
                      
                    </div>
                  </form>
                </div>
                <div className="col-md-2">
                  <button className="btn btn-info " onClick={()=>{setSearchInput("")}}><i className="fa fa-close" ></i></button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {loading ? (<Spinner/>) : (<React.Fragment>
            <section className="contact-card">
              <div className="container">
                <div className="row">
                  {(searchInput === "" ? contacts : searchResults).map((contact) => (
                    <div className="col-md-6 mb-4 ">
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-4">
                              <img
                                src={contact.photo}
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                            <div className="col-md-6 d-flex align-items-center">
                              <ul className="list-group">
                                <li className="list-group-item list-group-item-action">
                                  {" "}
                                  Name :{" "}
                                  <span className="fw-bold">
                                    {contact.name}
                                  </span>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                  Contact :{" "}
                                  <span className="fw-bold">
                                    {contact.mobile}
                                  </span>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                  Email :{" "}
                                  <span className="fw-bold">
                                    {contact.email}
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <div className="col-md-1 d-flex flex-column align-items-center   ">
                              <Link
                                to={"/contacts/view/contactId"}
                                className="btn btn-warning my-1"
                              >
                                <i className="fa fa-eye my-1" />
                              </Link>
                              <Link
                                to={"/contacts/edit/contactId"}
                                className="btn btn-primary my-1"
                              >
                                <i className="fa fa-pen my-1" />
                              </Link>
                              <button className="btn btn-danger" onClick={()=>{deleteContact(contact.id)}}>
                                <i className="fa fa-trash my-1" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </React.Fragment>
        )}
      </React.Fragment>
    </div>
  );
};

export default ContactList;
