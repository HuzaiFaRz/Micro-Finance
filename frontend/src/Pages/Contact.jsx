import PagesHeading from "../Components/PagesHeading";
import { AuthUseContext } from "../Contexts/AuthContextProvider";

const Info = ({ label, value }) => (
  <div>
    <p className="text-main text-sm">{label}</p>
    <p className="font-medium text-main">{value}</p>
  </div>
);

const Input = ({ label, type, value }) => {
  const { isUser } = AuthUseContext();
  return (
    <div>
      <label className="text-lg text-main">{label}</label>
      {type === "textarea" ? (
        <textarea
          rows="4"
          className="w-full mt-1 bg-main px-3 py-2 focus:border-0 focus:outline-0 text-black resize-none"
        />
      ) : (
        <input
          type={type}
          className="w-full mt-1 bg-main px-3 py-2 text-black"
          defaultValue={value}
          disabled={type === "email" && isUser && true}
        />
      )}
    </div>
  );
};

const Contact = () => {
  const { isUser } = AuthUseContext();
  return (
    <>
      <PagesHeading />
      <div className="w-full min-h-dvh bg-main text-main px-4 py-10 font-elmssans-light">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Header */}
          <div className="text-center">
            <p className="text-gray-900 mt-2">
              We’re here to help you with loans, payments, and support
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="bg-layout flex flex-col justify-evenly items-start px-4">
              <Info label="Organization" value="M_Finance" />
              <Info label="Email" value="support@mfinance.pk" />
              <Info label="Phone" value="+92 3708915862" />
              <Info label="Working Hours" value="Mon – Sat (9AM – 6PM)" />
            </div>

            {/* Contact Form */}
            <form className="bg-layout rounded-xl p-6 space-y-4">
              <Input label="Full Name" type="text" />
              <Input label="Email Address" type="email" value={isUser?.Email} />
              <Input label="Message" type="textarea" />

              <button
                className="w-full bg-green-600 hover:bg-green-700 transition rounded-lg py-2 font-medium"
                type="button"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
