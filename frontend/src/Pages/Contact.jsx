import { useContext, useState } from "react";
import PagesHeading from "../Components/PagesHeading";
import { AuthUseContext } from "../Contexts/AuthContextProvider";
import { GlobalContextCreated } from "../Contexts/GlobalContext";
import { arrayUnion, doc, FieldValue, updateDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebase";
import {
  ArrowPathRoundedSquareIcon,
  EnvelopeIcon,
} from "@heroicons/react/16/solid";
import { useNavigate } from "react-router";

const Info = ({ label, value }) => (
  <div className="text-main text-sm tablet:text-lg">
    <p>
      {label} : {value}
    </p>
  </div>
);

const Input = ({ label, type, value, settingValue, isDisabled }) => {
  const { isUser } = AuthUseContext();

  return (
    <>
      <label className="text-lg text-main w-full flex flex-col justify-center items-start gap-3">
        {label}

        {type === "textarea" ? (
          <textarea
            rows="4"
            className="w-full mt-1 px-3 py-2 focus:outline-0 text-main border border-main resize-none"
            onChange={(e) => settingValue(e.target.value)}
            disabled={isDisabled}
            required
            minLength={50}
            maxLength={100}
          />
        ) : (
          <input
            type={type}
            className="w-full mt-1 px-3 py-2 text-main border border-main shadow-none"
            style={{
              boxShadow: "none",
            }}
            defaultValue={value}
            disabled={isUser || (isDisabled && true)}
            required
          />
        )}
      </label>
    </>
  );
};

const Contact = () => {
  const { isUser } = AuthUseContext();
  const { errorToast } = useContext(GlobalContextCreated);
  const [messege, setMessege] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const messegeHandler = async (event) => {
    event.preventDefault();
    if (isUser && auth.currentUser) {
      if (
        !messege ||
        /\s{2,}/.test(messege) ||
        messege.startsWith(" ") ||
        messege.length < 50
      ) {
        errorToast(
          "Please Avoid Extra space or a Empty Message and also Give at least 50 character",
        );
        return;
      }
      if (messege.length > 90) {
        errorToast("Message Too Long");
        return;
      }
      console.log(messege);
      try {
        setLoading(true);
        await updateDoc(doc(db, "Users", auth?.currentUser?.uid), {
          contactMesseges: arrayUnion(messege),
        });
        setLoading(false);
        errorToast("Messege Sent Successfully", 200, 200, 200);
        navigate("/");
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    } else {
      errorToast("Please Login");
    }
  };

  return (
    <>
      <PagesHeading />
      <div className="w-full min-h-screen bg-black text-main font-elmssans-light flex flex-col justify-around items-center p-3">
        <h1 className="text-gray-200 w-full text-center">
          We’re here to help you with loans, payments, support any type of
          Problem
        </h1>

        <div className="bg-layout flex flex-wrap justify-start tablet:justify-evenly items-center p-4 gap-4 w-full">
          <Info label="Organization" value="M_Finance" />
          <Info label="Email" value="support@mfinance.pk" />
          <Info label="Phone" value="+92 3708915862" />
          <Info label="Working Hours" value="Mon – Sat (9AM – 6PM)" />
        </div>

        <form
          onSubmit={messegeHandler}
          className="bg-layout w-full tablet:w-[600px] flex flex-wrap justify-evenly items-center gap-3 p-3 rounded-tl-2xl rounded-br-2xl"
        >
          <Input
            label="Full Name"
            type="text"
            value={isUser?.Name}
            isDisabled={loading}
          />
          <Input
            label="Email Address"
            type="email"
            value={isUser?.Email}
            isDisabled={loading}
          />
          <Input
            label="Message"
            type="textarea"
            settingValue={setMessege}
            isDisabled={loading}
          />

          <button
            className="px-3 py-2 text-xl bg-green-500 text-main flex justify-center items-center gap-2"
            type="submit"
            disabled={loading}
          >
            Send{" "}
            {loading ? (
              <ArrowPathRoundedSquareIcon className={`size-5 animate-spin`} />
            ) : (
              <EnvelopeIcon className="size-5" />
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
