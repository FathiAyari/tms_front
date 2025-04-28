const Contact = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-extrabold text-center mb-8 text-blue-600">
        Contact Information
      </h1>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg text-gray-600 mb-6">
          If you have any questions or would like to discuss the project
          further, feel free to reach out using the contact details below:
        </p>

        <div className="text-lg text-gray-800">
          <div className="flex items-center mb-4">
            <span className="font-semibold text-gray-700">Phone:</span>
            <a
              href="tel:+251984751233"
              className="ml-2 text-blue-600 hover:underline"
            >
              +251 984 751 233
            </a>
          </div>

          <div className="flex items-center mb-4">
            <span className="font-semibold text-gray-700">Email:</span>
            <a
              href="mailto:yohanistadese06@gmail.com"
              className="ml-2 text-blue-600 hover:underline"
            >
              yohanistadese06@gmail.com
            </a>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-lg text-gray-700">
            Developed by: <strong>Yohanis Tadese</strong>
          </p>
          <p className="text-lg text-gray-700">Fullstack Developer</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
