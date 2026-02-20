import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-white border-t mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* TOP */}
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* BRAND */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold">
              EventHub Rwanda
            </h3>
            <p className="text-gray-600 text-sm">
              Discover hackathons, tech events, and opportunities
              happening across Rwanda.
            </p>
          </div>

          {/* LINKS */}
          <div className="space-y-3">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="hover:text-black cursor-pointer">
                <Link href={`/`}>Home</Link>
              </li>
              <li className="hover:text-black cursor-pointer">
                <Link href={`/events`}>Events</Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="space-y-3">
            <h4 className="font-semibold">Contact</h4>
            <p className="text-gray-600 text-sm">
              Email: support@eventhub.rw
            </p>
            <p className="text-gray-600 text-sm">
              Kigali, Rwanda 🇷🇼
            </p>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t mt-8 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} EventHub Rwanda. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;