export function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto py-4 px-8">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <div className="mb-4 sm:mb-0">
            <p className="text-sm text-gray-400">
              &copy; 2022 Acme Corporation. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="mb-4 sm:mb-0 sm:mr-4">
              <p className="text-sm text-gray-400 font-bold mb-2">Legal</p>
              <ul className="list-none">
                <li>
                  <a
                    href="#"
                    className="text-white hover:text-gray-300 transition duration-150 ease-in-out"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white hover:text-gray-300 transition duration-150 ease-in-out"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm text-gray-400 font-bold mb-2">Contact</p>
              <ul className="list-none">
                <li>
                  <a
                    href="#"
                    className="text-white hover:text-gray-300 transition duration-150 ease-in-out"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white hover:text-gray-300 transition duration-150 ease-in-out"
                  >
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
