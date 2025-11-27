import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function ContactUs() {
  return (
    <div className="w-full">

       {/* FIRST SECTION: CONTACT DETAILS */}
      <section className="w-full">
        {/* Banner */}
        <div className="relative w-full h-[120px] sm:h-[150px] md:h-[180px]">
          <img
            src="/contact-us.png"
            alt="Contact Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <h1 className="absolute inset-0 flex justify-center items-center
            text-white text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
            Contact Us
          </h1>
        </div>

        {/* Contact Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-10">
            The NGO Forum on Cambodia
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-16">

            {/* Phone */}
            <div className="flex flex-col items-center">
              <PhoneIcon className="w-12 h-12 text-green-700 mb-3" />
              <h3 className="text-xl md:text-2xl font-bold text-green-700">Contact Number</h3>
              <p className="text-gray-700 mt-2 leading-relaxed text-sm md:text-lg">
                Tel: (855) 23 214 429 <br />
                Fax: (855) 23 994 063
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center">
              <EnvelopeIcon className="w-12 h-12 text-green-700 mb-3" />
              <h3 className="text-xl md:text-2xl font-bold text-green-700">Email</h3>
              <p className="text-gray-700 mt-2 text-sm md:text-lg">
                info@ngoforum.org.kh
              </p>
            </div>

            {/* Address */}
            <div className="flex flex-col items-center">
              <MapPinIcon className="w-12 h-12 text-green-700 mb-3" />
              <h3 className="text-xl md:text-2xl font-bold text-green-700">Address</h3>
              <p className="text-gray-700 mt-2 text-sm md:text-lg">
                #9-11 Street 476, Toul Tompong, <br />
                P.O. Box 2295, Phnom Penh 3, Cambodia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECOND SECTION: FORM + MAP */}
      <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT: CONTACT FORM */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
            <form className="space-y-5">

              <div>
                <label className="block text-gray-700 mb-1">First name</label>
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-md focus:ring-2 focus:ring-green-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Last name</label>
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-md focus:ring-2 focus:ring-green-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-md focus:ring-2 focus:ring-green-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  placeholder="Phone"
                  className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-md focus:ring-2 focus:ring-green-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="5"
                  placeholder="Message"
                  className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-md focus:ring-2 focus:ring-green-600 outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition"
              >
                Submit
              </button>
            </form>
          </div>

          {/* RIGHT: MAP */}
          <div className="rounded-xl overflow-hidden shadow-lg h-[350px] sm:h-[450px] md:h-[700px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d391.0571073416214!2d104.915294!3d11.5358475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310950dd842e50a1%3A0x8bae08232d593311!2sThe%20NGO%20Forum%20on%20Cambodia!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              title="NGO Forum Location"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </section>

    </div>
  );
}
