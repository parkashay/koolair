export default function WarrantyPage() {
    return (
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full">
          <h1 className="mt-6 text-center text-3xl text-gray-900">
           Koolair Pumps Warranty
          </h1>            
          <h3 className="mt-6 text-center text-1xl text-gray-900"><a href="/terms-and-conditions" className="text-blue-600 font-medium terms-prop">Terms & Conditions</a></h3>
          <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
            <ul className="py-4 px-4 space-y-4 item-list-terms">
               <li>Koolair Pump offers a warranty coverage of 1 year for manufacturers defects. The coverage does not cover any defects or issues caused by improper installation, setup, or flood damage for open vent motors.</li>
               <li>Items are eligible for manufacturer's defect warranty coverage for 365 days after purchase date. </li>
               <li>Returns for warranty inspection will not be accepted if the information below is incomplete or if the pictures/videos provided clearly indicate improper installation, setup or user error. Parts are not accepted for return.</li>
               <li>Please see our Resource Page for more information and videos for best practices, troubleshooting, and the Do's & Don'ts of Koolair Pumps.</li>
               <li>After evaluating the information provided below, we will notify you within 24 - 48 hours.</li>
            </ul>
        </div>
        </div>       
      </div>
  );
};