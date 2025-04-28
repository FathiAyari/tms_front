import Contact from "../components/Contact";

const About = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-extrabold text-center mb-8 text-blue-600">
        About the Project
      </h1>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Project Purpose
        </h2>
        <p className="text-lg text-gray-600 mb-3">
          This project was developed as part of a mini-project submission for a
          potential client. The client is seeking a MERN stack developer to
          build a **Fleet Management System**, and this dashboard serves as a
          proof of concept for the final system.
          <br />
          This project was completed in just one day to showcase the development
          speed and capabilities. It is a proof of our dedication and
          efficiency!
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Client Requirements
        </h2>
        <ul className="list-disc pl-5 text-gray-600 mb-6">
          <li>
            Build a full-stack web application using MongoDB, Express.js,
            React.js, and Node.js.
          </li>
          <li>
            Ensure the application is scalable, user-friendly, and
            high-performing.
          </li>
          <li>
            Deploy the system effectively, with experience using Firebase.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Mini-Project Details
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          As part of the client’s requirements, this mini-project includes:
        </p>
        <ul className="list-disc pl-5 text-gray-600 mb-6">
          <li>
            A React.js frontend displaying a vehicle management dashboard with
            columns for
            <strong> Vehicle Name</strong>, <strong>Status</strong>, and{" "}
            <strong>Last Updated</strong>.
          </li>
          <li>
            A Node.js backend with APIs for adding, updating, and fetching
            vehicle data, powered by MongoDB.
          </li>
          <li>
            Clean and responsive design, built to reflect scalability and
            usability.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Challenges and Solutions
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          During the development process, key challenges included:
        </p>
        <ul className="list-disc pl-5 text-gray-600 mb-6">
          <li>
            Integrating a seamless data flow between the frontend and backend,
            resolved through RESTful API optimization.
          </li>
          <li>
            Designing a visually appealing UI within the given timeline, which
            was achieved using Tailwind CSS and reusable components.
          </li>
          <li>
            Setting up efficient database queries to handle potentially large
            datasets, utilizing MongoDB aggregation techniques.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Future Plans
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          If selected for the final project, I plan to expand this system by:
        </p>
        <ul className="list-disc pl-5 text-gray-600 mb-6">
          <li>Adding user authentication and role-based access control.</li>
          <li>Implementing real-time data updates using WebSockets.</li>
          <li>
            Deploying the application with Firebase hosting for optimal
            performance.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Why Choose This Project?
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          This project demonstrates my ability to deliver high-quality work
          quickly. It reflects not only my proficiency in the MERN stack but
          also my commitment to delivering projects on time, under tight
          deadlines. Your project can benefit from the same level of dedication
          and technical expertise!
        </p>
      </div>

      <Contact />
    </div>
  );
};

export default About;
