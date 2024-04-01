import { Link } from '@remix-run/react';

export default function KoolairPumps() {
    return (
      <>
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full">
          <h1 className="mt-6 text-center text-3xl text-gray-900">
           What is a Koolair Pump?
          </h1>
          <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
          <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
            <p>A KoolAir Marine Pump is a boat HVAC coolant pump. Our pumps offer Run Dry Protection. That ensures no damage when overheated or when run dry.  Run dry is the absence of  liquid flow. Most notably, when strainers become clogged, the KoolAir Pump will run for several hours before shutting down.</p>
            <p>When it cools down, it resumes operations as normal.</p>
            <p>Shop Our Entire Koolair Marine Pump Catalog <Link to="/search" className="text-base font-medium text-primary-600 hover:text-primary-500 inline-flex gap-2">Here</Link>.</p>
            <p>Our models are also <a href="https://www.intertek.com/marks/etl/faq/" target="_blank">ETL</a> listed.</p>                   
          </div>        
        </div>            
        </div>       
      </div>
      </>
    )
  };