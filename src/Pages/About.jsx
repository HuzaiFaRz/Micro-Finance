const Feature = ({ title, desc }) => (
  <div className="bg-black/40 p-5 rounded-xl border border-gray-800">
    <h3 className="font-semibold mb-1">{title}</h3>
    <p className="text-sm text-gray-400">{desc}</p>
  </div>
);

const About = () => {
  return (
    <div className="w-full min-h-dvh bg-black text-white px-4 py-10 font-elmssans-light">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">About M_Finance</h1>
          <p className="text-gray-400 mt-2">
            Empowering communities through transparent and ethical financing
          </p>
        </div>

        {/* Mission */}
        <div className="bg-layout rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            M_Finance is a digital micro-finance platform designed to provide
            fair, transparent, and accessible financial solutions. Our goal is
            to support individuals and small businesses through structured
            loans, clear payment tracking, and ethical approval systems.
          </p>
        </div>

        {/* What We Offer */}
        <div className="grid sm:grid-cols-2 gap-6">
          <Feature
            title="Loan Management"
            desc="Structured loan categories, installment tracking, and approval workflow."
          />
          <Feature
            title="Secure Payments"
            desc="Initial payments, receipts, and transaction history with full transparency."
          />
          <Feature
            title="User Verification"
            desc="CNIC, contact validation, and controlled access for safety."
          />
          <Feature
            title="Digital Receipts"
            desc="Auto-generated receipts for every successful transaction."
          />
        </div>

        {/* Vision */}
        <div className="bg-layout rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
          <p className="text-gray-300">
            To become a trusted micro-finance solution that bridges the gap
            between financial institutions and underserved communities using
            modern technology.
          </p>
        </div>
      </div>
    </div>
  );
};
export default About;
