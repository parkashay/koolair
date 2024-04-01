import { ProductCustomFields } from '~/generated/graphql';

export function SpecTable({ items }: { items: ProductCustomFields } ) {
  function specName(propKey: string) {
    let specLabel = '';

    switch(propKey) {
      case 'productNotes':
        specLabel = 'Product Notes';
        break;      
      case 'hp':
        specLabel = 'HP';
        break;     
      case 'hz':
        specLabel = 'Hz';
        break;     
      case 'weight':
        specLabel = 'Weight (LBS)';
        break;
      case 'width':
        specLabel = 'Width';
        break;
      case 'height':
        specLabel = 'Height';
        break;
      case 'length':
        specLabel = 'Length';
        break;      
      case 'voltage':
        specLabel = 'Voltage';
        break;
      case 'shippingWeight':
        specLabel = 'Shipping Weight';
        break;      
      case 'partNumber':
        specLabel = 'Part Number';
        break;
      case 'modelNumber':
        specLabel = 'Model Number';
        break;
      case 'maximumFlow':
        specLabel = 'Maximum Flow';
        break;
      case 'headsToFeet':
        specLabel = 'Heads To (Feet)';
        break;
      case 'connectionsDischarge':
        specLabel = 'Connections / Discharge (Inches)';
        break;
    }
    
    return specLabel;
  } 

  return (
      <table id="spec-table" className="spec-table striped-spec-table">       
        <tbody>
        {Object.keys(items).map((propKey, index) => (
           items[propKey] !== '' && items[propKey] !== 0 && !['shortDescription', 'allowOrder'].includes(propKey) ? <tr key={index}><td>{specName(propKey)}</td><td>{items[propKey]}</td></tr> : ''                                 
        ))}
        </tbody>
      </table>
    );
  }