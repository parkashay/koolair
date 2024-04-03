export default function DatasheetsPage() {
    return (
      <>
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full">
          <h1 className="mt-6 text-center text-3xl text-gray-900">
           Koolair Pumps Datasheets
          </h1>
          <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
          <h3 className="px-4 mt-6 text-2xl text-gray-900">Manuals</h3>
          <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
            <ul  className="py-4 px-4 space-y-4 item-list-terms">
              <li><a href="https://d1pkofokfruj4.cloudfront.net/media/upload/resource/j/Koolair-Pump-PM500-Datasheet-9-21-2022-v1.1.pdf" className="text-blue-600 font-medium terms-prop" target="_blank">PM500 Series Datasheet</a></li>
              <li><a href="https://d1pkofokfruj4.cloudfront.net/media/upload/resource/m/Koolair-Pump-TPM1000-Datasheet-10-1-2018-v1.pdf" className="text-blue-600 font-medium terms-prop" target="_blank">TPM1000 Series Datasheet</a></li>
              <li><a href="https://d1pkofokfruj4.cloudfront.net/media/upload/resource/a/Koolair-Pump-PM1000-Datasheet-9-21-2022.pdf" className="text-blue-600 font-medium terms-prop" target="_blank">PM1000 Series Datasheet</a></li>
              <li><a href="https://d1pkofokfruj4.cloudfront.net/media/upload/resource/r/Koolair-Pump-SPM1000-Datasheet-9-22-2022-V2.pdf" className="text-blue-600 font-medium terms-prop" target="_blank">SPM1000 Series Datasheet</a></li>
              <li><a href="">PM300 Datasheet</a></li>
            </ul>
        </div>
          <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
                <p>Koolair Datasheets and also 3D models available in PDF file format. Contains mechanical and also electrical specifications. UL Listed and furthermore, ETL Certified. All specifications and flow curves above all, are based on pumping water.</p>                
        </div>
        </div>            
        </div>       
      </div>
      </>
  );
};