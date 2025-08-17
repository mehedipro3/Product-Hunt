
const SectionTitle = ({heading,subHeading}) => {
  return (
    <div className="w-3/12  my-8 text-center mx-auto">
      <h2 className="text-3xl font-bold text-blue-500 uppercase border-y-4 py-4">{heading}</h2>
      <p className="py-2 text-gray-500">{subHeading}</p>
    </div>
  );
};

export default SectionTitle;