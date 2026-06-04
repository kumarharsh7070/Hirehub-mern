function Home() {
  return (
    <div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-3xl px-6">

          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Find Your Dream Job
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Connect with top companies and discover career
            opportunities that match your skills and ambitions.
          </p>

          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Browse Jobs
            </button>

            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50">
              Get Started
            </button>
          </div>

        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="shadow-lg rounded-xl p-8 text-center">
              <h2 className="text-4xl font-bold text-blue-600">
                5000+
              </h2>
              <p className="text-gray-600 mt-2">
                Active Jobs
              </p>
            </div>

            <div className="shadow-lg rounded-xl p-8 text-center">
              <h2 className="text-4xl font-bold text-green-600">
                2000+
              </h2>
              <p className="text-gray-600 mt-2">
                Companies
              </p>
            </div>

            <div className="shadow-lg rounded-xl p-8 text-center">
              <h2 className="text-4xl font-bold text-purple-600">
                10000+
              </h2>
              <p className="text-gray-600 mt-2">
                Candidates
              </p>
            </div>

          </div>
       
        </div>
      </section>
{/* Featured Jobs Section */}

<section className="py-16 bg-gray-50">
  <div className="max-w-6xl mx-auto px-6">

    <h2 className="text-4xl font-bold text-center mb-12">
      Featured Jobs
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* Job Card 1 */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-2xl font-semibold mb-2">
          Frontend Developer
        </h3>

        <p className="text-gray-600 mb-2">
          Google
        </p>

        <p className="text-green-600 font-bold mb-4">
          ₹12 LPA
        </p>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Apply Now
        </button>
      </div>

      {/* Job Card 2 */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-2xl font-semibold mb-2">
          Backend Developer
        </h3>

        <p className="text-gray-600 mb-2">
          Microsoft
        </p>

        <p className="text-green-600 font-bold mb-4">
          ₹15 LPA
        </p>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Apply Now
        </button>
      </div>

      {/* Job Card 3 */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-2xl font-semibold mb-2">
          Full Stack Developer
        </h3>

        <p className="text-gray-600 mb-2">
          Amazon
        </p>

        <p className="text-green-600 font-bold mb-4">
          ₹18 LPA
        </p>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Apply Now
        </button>
      </div>

    </div>

  </div>
</section>

{/* Why Choose HireHub */}

<section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-6">

    <h2 className="text-4xl font-bold text-center mb-12">
      Why Choose HireHub?
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      <div className="shadow-lg rounded-xl p-8 text-center">
        <h3 className="text-2xl font-semibold mb-4">
          Easy Job Search
        </h3>

        <p className="text-gray-600">
          Find thousands of jobs quickly with
          powerful search and filtering options.
        </p>
      </div>

      <div className="shadow-lg rounded-xl p-8 text-center">
        <h3 className="text-2xl font-semibold mb-4">
          Verified Companies
        </h3>

        <p className="text-gray-600">
          Apply with confidence to trusted and
          verified employers.
        </p>
      </div>

      <div className="shadow-lg rounded-xl p-8 text-center">
        <h3 className="text-2xl font-semibold mb-4">
          Fast Applications
        </h3>

        <p className="text-gray-600">
          Upload your resume and apply to jobs
          in just a few clicks.
        </p>
      </div>

    </div>

  </div>
</section>
{/* Footer */}

<footer className="bg-gray-900 text-white py-10">
  <div className="max-w-6xl mx-auto px-6">

    <div className="flex flex-col md:flex-row justify-between items-center">

      <div>
        <h2 className="text-3xl font-bold">
          HireHub
        </h2>

        <p className="text-gray-400 mt-2">
          Connecting Talent with Opportunity
        </p>
      </div>

      <div className="flex gap-6 mt-6 md:mt-0">

        <a href="#" className="hover:text-blue-400">
          Home
        </a>

        <a href="#" className="hover:text-blue-400">
          Jobs
        </a>

        <a href="#" className="hover:text-blue-400">
          About
        </a>

        <a href="#" className="hover:text-blue-400">
          Contact
        </a>

      </div>

    </div>

    <hr className="my-6 border-gray-700" />

    <p className="text-center text-gray-400">
      © 2026 HireHub. All Rights Reserved.
    </p>

  </div>
</footer>
    </div>
  );
}

export default Home;