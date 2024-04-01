import ContactUsForm from "~/components/basin-forms/ContactUs"


export default function ContactUsPage() {
      return (
      <>
        <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h1 className="mt-6 text-center text-3xl text-gray-900">
             Contact Us
            </h1>            
          </div>
  
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">            
              <ContactUsForm />
            </div>
          </div>
        </div>
      </>
    );
};
  