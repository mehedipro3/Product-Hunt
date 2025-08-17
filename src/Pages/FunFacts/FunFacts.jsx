import SectionTitle from "../../SectionTitle/SectionTitle";

const FunFacts = () => {
  const stats = [
    { icon: "🔼", value: "2,345", label: "votes cast this week" },
    { icon: "💡", value: "120+", label: "new innovations shared" },
    { icon: "👩‍💻", value: "40", label: "active creators this month" },
    { icon: "🌐", value: "15", label: "countries represented" },
  ];

  return (
    <section className="pb-3">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <SectionTitle
        heading={'Statistics'}
        subHeading={' See how alive our community is with the latest numbers!'}
        ></SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-gray-500 mt-1 text-center">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FunFacts;
