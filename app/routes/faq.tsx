import Faq from 'react-faq-component';

export default function FAQ() {

    const faqStyles = {
      titleTextColor: 'blue',
      titleTextSize: '48px',
      rowTitleColor: 'blue',
      rowContentTextSize: '16px',
      rowContentPaddingTop: '10px',
      rowContentPaddingBottom: '10px',
      rowContentPaddingLeft: '50px',
      rowContentPaddingRight: '150px',    
    };
  
    const data = {
        title: '',  
        rows: [
        {
          title: "Where can I purchase a KOOLAIR Pump?",
          content: `Click here to purchase KOOLAIR Pumps.`
        },
        {
          title: "What is the difference between a KoolAir Pump and a March LC-3CP-MD?",
          content: `KoolAir Pumps can run dry and a March Pump cannot. The PM500 also comes with a regular base and an upgraded Marine Base.`
        },
        {
          title: "What is the advantage of having two bases included?",
          content: `We include the standard base and the marine base they can choose which to use (March makes you buy the other base separately)`
        },
        {
          title: "Can anyone simply replace the base (or whatever part has the dry run protection)?",
          content: `If you purchase a KoolAir Wet End Kit and swap out your March Pump Wet End Kit, you will have run dry protection. The bases are interchangeable with a March LC-3CP-MD.`
        },
        ]
      };
    
    return (
        <>
        <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full">
            <h1 className="mt-6 text-center text-3xl text-gray-900">Koolair FAQ's</h1>
            <div className="max-w-6xl mx-auto px-4 space-y-4">
              <Faq data={data} styles={faqStyles} />
            </div>        
          </div>            
        </div>           
        </>
      );
    };