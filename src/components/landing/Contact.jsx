import styled from "styled-components";
import Map from "../../img/map.png";
import Phone from "../../img/phone.png";
import Send from "../../img/send.png";

import FormInput from "../forminput/FormInput";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";

const Container = styled.div`
  height: 90%; // 10% is for Footer.jsx
  background: url("https://www.toptal.com/designers/subtlepatterns/uploads/webb.png"); // Below url is not available -> Click download btn w/ shift
  /* background: url("https://www.toptal.com/designers/subtlepatterns/patterns/double-bubble-outline.png"); */
`;
// Use paddings -> Not to disturb Container
const Wrapper = styled.div`
  height: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
`;
const FormContainer = styled.div`
  width: 50%; // Form + Address = 100
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  margin: 50px;
  margin-top: 0;
  @media only screen and (max-width: 480px) {
    margin: 20px;
  }
`;

const Form = styled.form`
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 25%;
  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const LeftForm = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 20px;
  @media only screen and (max-width: 480px) {
    height: 50%;
    margin-right: 0;
  }
`;

// Separated to contain message & button
const RightForm = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media only screen and (max-width: 480px) {
    height: 50%;
  }
`;

const Input = styled.input`
  width: 200px;
  padding: 20px;
  border-radius: 10px;
  @media only screen and (max-width: 480px) {
    padding: 5px;
  }
`;

const TextArea = styled.textarea`
  width: 200px;
  height: 60%; // Rest is for Button
  padding: 20px;
  border-radius: 10px;
  @media only screen and (max-width: 480px) {
    padding: 5px;
    margin-top: 20px;
  }
`;

// Button component can be created!
const Button = styled.button`
  // Copy and pasted
  border: none;
  padding: 15px;
  background-color: darkblue;
  color: white;
  font-size: 20px;
  border-radius: 10px;
  margin-top: 20px;
  cursor: pointer;
  @media only screen and (max-width: 480px) {
    padding: 5px;
    font-size: 14px;
  }
`;

const AddressContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: 480px) {
    width: 100%;
    margin-top: 20px;
  }
`;

const AddressItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  @media only screen and (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const Icon = styled.img`
  width: 20px;
  margin-right: 20px;
  @media only screen and (max-width: 480px) {
    width: 15px;
  }
`;

const Text = styled.span`
  font-size: 20px;
  margin-right: 15px;
  @media only screen and (max-width: 480px) {
    font-size: 14px;
  }
`;

const Contact = () => {
  // const [values, setValues] = useState({
  //   username: "",
  //   email: "",
  //   enquiryTitle: "",
  //   enquiryMessage: "",
  // });

  // const [enquirying, setEnquirying] = useState(false);

  // const formInputs = [
  //   {
  //     id: 1,
  //     name: "username",
  //     type: "text",
  //     placeholder: "Your Name"
  //   },
  //   {
  //     id: 2,
  //     name: "email",
  //     type: "email",
  //     placeholder: "Your Email Address"
  //   },
  //   {
  //     id: 3,
  //     name: "enquiryTitle",
  //     type: "text",
  //     placeholder: "Enter Enquiry Title"
  //   },
  //   {
  //     id: 4,
  //     name: "enquiryMessage",
  //     type: "text",
  //     placeholder: "Enter Enquiry Message"
  //   }
  // ]

  // const onChange = async (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setEnquirying(true);

  //   const docRef = await addDoc(collection(db, "enquiries"), {
  //     username: "David Smith",
  //     email: "davidSmith@gmail.com",
  //   });

  //   const { username, email, enquiryTitle, enquiryMessage } = values;

  //   const docData = {
  //     username: username,
  //     email: email,
  //     enquiryTitle: enquiryTitle,
  //     enquiryMessage: enquiryMessage,
  //     timeStamp: serverTimestamp()
  //   };

  //   await setDoc(doc(db, "enquiries", "id"), docData);
  // };

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newEnquiryTitle, setNewEnquiryTitle] = useState("");
  const [newEnquiryMessage, setNewEnquiryMessage] = useState("");

  const enquiriesCollectionRef = collection(db, "enquiries");

  const createEnquiry = async (e) => {
    e.preventDefault();
    try {
      // const newEnquiryData = {
      //   name: newName,
      //   email: newEmail,
      //   enquiryTitle: newEnquiryTitle,
      //   enquiryMessage: newEnquiryMessage,
      //   timeStamp: serverTimestamp(),
      //   enquiryStatus: "Not Answered",
      // };
  
      // await addDoc(enquiriesCollectionRef, newEnquiryData);
      await setDoc(collection(db, "enquiries"), {
            name: newName,
            email: newEmail,
            enquiryTitle: newEnquiryTitle,
            enquiryMessage: newEnquiryMessage,
            timeStamp: serverTimestamp(),
            enquiryStatus: "Not Answered",
      });
      console.log("Enquiry created successfully!");
    } catch (error) {
      console.error("Error creating enquiry:", error);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // const newEnquiryData = {
      //   name: newName,
      //   email: newEmail,
      //   enquiryTitle: newEnquiryTitle,
      //   enquiryMessage: newEnquiryMessage,
      //   timeStamp: serverTimestamp(),
      //   enquiryStatus: "Not Answered",
      // };
  
      // await addDoc(enquiriesCollectionRef, newEnquiryData);
      await addDoc(collection(db, "enquiries"), {
            name: newName,
            email: newEmail,
            enquiryTitle: newEnquiryTitle,
            enquiryMessage: newEnquiryMessage,
            timeStamp: serverTimestamp(),
            enquiryStatus: "Not Answered",
      });
      console.log("Enquiry created successfully!");
    } catch (error) {
      console.error("Error creating enquiry:", error);
    }

    setNewName("");
    setNewEmail("");
    setNewEnquiryTitle("");
    setNewEnquiryMessage("");
  };

  return (
    <Container id="contact">
      <Wrapper>
        <FormContainer>
          <Title>
            Questions? <br /> Let's Get In Touch
          </Title>
          <Form onSubmit={handleSubmit}>
            <LeftForm>
              {/* <Input placeholder="Your Name" />
              <Input placeholder="Your Email" />
              <Input placeholder="Subject" /> */}
              {/* {formInputs.map((formInput) => {
                return (
                  <form onSubmit={handleSubmit}>
                  <FormInput
                    key={formInput.id}
                    {...formInput}
                    values={values[formInput.name]}
                    onChange={onChange}
                  />
                  </form>
                );
              })} */}
              <Input
                placeholder="Name"
                onChange={(event) => {
                  setNewName(event.target.value);
                }}
                required
              />
              <Input
                type="email"
                placeholder="Email"
                onChange={(event) => {
                  setNewEmail(event.target.value);
                }}
                required
              />
              <Input
                placeholder="Enquiry Title"
                onChange={(event) => {
                  setNewEnquiryTitle(event.target.value);
                }}
                required
              />
            </LeftForm>
            <RightForm>
              {/* <TextArea placeholder="Your Message" />
              <Button>Send</Button> */}
              {/* <button>
                {enquirying ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  "Submit"
                )}
              </button> */}
              <TextArea
                placeholder="Leave the Enquiry Message Here..."
                onChange={(event) => {
                  setNewEnquiryMessage(event.target.value);
                }}
                required
              />
              <Button>Submit</Button>
            </RightForm>
          </Form>
        </FormContainer>
        <AddressContainer>
          <AddressItem>
            <Icon src={Map} />
            <Text>461 Clementi Rd, Singapore 599491</Text>
          </AddressItem>
          <AddressItem>
            <Icon src={Phone} />
            <Text>+65 9017 2832</Text>
            <Text>+65 8497 9855</Text>
          </AddressItem>
          <AddressItem>
            <Icon src={Send} />
            <Text>onlyfiles@gmail.com</Text>
            <Text>fyps215@gmail.com</Text>
          </AddressItem>
        </AddressContainer>
      </Wrapper>
    </Container>
  );
};

export default Contact;
