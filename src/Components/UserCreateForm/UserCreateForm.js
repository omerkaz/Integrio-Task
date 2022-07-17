import { useState, useRef, useEffect } from "react";
import axios from "axios";

function UserCreateForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [genderValue, setGenderValue] = useState("");
  const [posts, setPosts] = useState(null);
  const [postRequestError, setPostRequestError] = useState({});
  const [successResultDiv, setSuccessResultDiv] = useState(false);
  const [failedResultDiv, setFailedResultDiv] = useState(false);

  const baseURL = "https://randomuser.me/api/";

  function createPost() {
    axios
      .post(baseURL, {
        body: {
          firstname: firstName,
          lastname: lastName,
          email: emailValue,
          gender: genderValue,
        },
      })
      .then((response) => {
        setPosts(response.data);
        setFailedResultDiv(false);
        setSuccessResultDiv(true);
      })
      .catch((e) => {
        setPostRequestError({
          ...postRequestError,
          [Object.keys(postRequestError).length + 1]: e.message,
        });
        setFailedResultDiv(true);
        setSuccessResultDiv(false);
      });
  }

  useEffect(() => {
    console.log(firstName);
    console.log(lastName);
    console.log(emailValue);
    console.log(genderValue);
    console.log(postRequestError);
  }, [firstName, lastName, emailValue, genderValue]);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailValueRef = useRef(null);
  const genderValueRef = useRef(null);

  const submitAndUseState = (e) => {
    e.preventDefault();
    setFirstName(firstNameRef.current.value);
    setLastName(lastNameRef.current.value);
    setEmailValue(emailValueRef.current.value);
    setGenderValue(genderValueRef.current.value);
    createPost();
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    emailValueRef.current.value = "";
    genderValueRef.current.value = "";
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form>
              <div class="row mb-4">
                <div class="col">
                  <div class="form-outline">
                    <input
                      ref={firstNameRef}
                      type="text"
                      id="form3Example1"
                      class="form-control"
                      placeholder="First name"
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="form-outline">
                    <input
                      ref={lastNameRef}
                      type="text"
                      id="form3Example2"
                      class="form-control"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>

              <div class="form-outline mb-4">
                <input
                  ref={emailValueRef}
                  type="email"
                  id="form3Example3"
                  class="form-control"
                  placeholder="Email"
                />
              </div>

              <div class="form-outline mb-4">
                <select
                  ref={genderValueRef}
                  defaultValue=""
                  className="form-select"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <button
                type="submit"
                onClick={(e) => {
                  submitAndUseState(e);
                }}
                class="btn btn-primary btn-block mb-4"
              >
                Sign up
              </button>
            </form>
            {failedResultDiv && (
              <div class="alert alert-danger alert-dismissible d-flex align-items-center fade show">
                <i class="bi-exclamation-octagon-fill"></i>
                <strong class="mx-2">Error!</strong> A problem has been occurred
                while submitting your data.
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="alert"
                ></button>
              </div>
            )}
            {successResultDiv && (
              <div class="alert alert-success alert-dismissible d-flex align-items-center fade show">
              <i class="bi-check-circle-fill"></i>
              <strong class="mx-2">Success!</strong> Your message has been sent successfully.
              <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
          </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserCreateForm;
