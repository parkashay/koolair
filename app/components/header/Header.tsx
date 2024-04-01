import { Link, useLoaderData } from '@remix-run/react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { SearchBar } from '~/components/header/SearchBar';
import { useRootLoader } from '~/utils/use-root-loader';
import { UserIcon } from '@heroicons/react/24/solid';
import { useScrollingUp } from '~/utils/use-scrolling-up';
import { classNames } from '~/utils/class-names';

export function Header({
  onCartIconClick,
  cartQuantity,
}: {
  onCartIconClick: () => void;
  cartQuantity: number;
}) {
  const data = useRootLoader();
  const isSignedIn = data ? !!data.activeCustomer.activeCustomer?.id : false;
  const isScrollingUp = useScrollingUp();
  return (
    <header
      className={classNames(
        isScrollingUp ? 'sticky top-0 z-10 animate-dropIn' : '',
        'bg-gradient-to-r from-zinc-700 to-gray-900 shadow-lg transform shadow-xl',
      )}
    >
      <div className="bg-zinc-100 text-gray-600 shadow-inner text-center text-sm py-2 px-2 xl:px-0">
        <div className="max-w-6xl mx-2 md:mx-auto flex justify-begin">
          <h2 className="text-white">
          <Link to="/">
            <img
              src="/koolair-logo-small.webp"
              width={200}
              height={78}
              alt="KoolAir Pumps"
            />
          </Link>
        </h2>         
          <span className="top-nav-tagline">KoolAir Marine HVAC Seawater Circulation Coolant Pump With Run Dry Capability</span>
          <div className="flex-row top-nav-links">
            <Link
              to={isSignedIn ? '/account' : '/sign-in'}
              className="flex space-x-1"
            >
              <UserIcon className="w-4 h-4"></UserIcon>
              <span>{isSignedIn ? 'My Account' : 'Sign In'}</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-4 flex items-center space-x-4">
      <div className="flex space-x-4 hidden sm:block">          
            <Link
              className="text-sm md:text-base text-gray-200 hover:text-white"
              to='/'                            
            >Home</Link>  
            <Link
              className="text-sm md:text-base text-gray-200 hover:text-white"
              to='/search'                            
            >Our Products</Link>
            <Link
              className="text-sm md:text-base text-gray-200 hover:text-white"
              to='/datasheets'                            
            >Datasheets</Link>                
            <Link
              className="text-sm md:text-base text-gray-200 hover:text-white"
              to='/about-us'                            
            >About Us</Link>        
        </div>        
        <div className="flex-1 md:pr-8">
          <SearchBar></SearchBar>
        </div>
        <div className="">
          <button
            className="relative w-9 h-9 bg-white bg-opacity-20 rounded text-white p-1"
            onClick={onCartIconClick}
            aria-label="Open cart tray"
          >
            <ShoppingBagIcon></ShoppingBagIcon>
            {cartQuantity ? (
              <div className="absolute rounded-full -top-2 -right-2 bg-primary-600 w-6 h-6">
                {cartQuantity}
              </div>
            ) : (
              ''
            )}
          </button>
          {/* <Link
            to="/checkout"
            className="relative block w-9 h-9 bg-white bg-opacity-20 rounded text-white p-1"
            aria-label="Open cart tray"
          >
            <ShoppingBagIcon></ShoppingBagIcon>
            {cartQuantity ? (
              <div className="absolute rounded-full -top-2 -right-2 bg-primary-600 w-6 h-6">
                {cartQuantity}
              </div>
            ) : (
              ''
            )}
          </Link> */}
        </div>
      </div>
    </header>
  );
}
