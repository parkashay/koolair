import { useLoaderData } from '@remix-run/react';
import { getCollections } from '~/providers/collections/collections';
import { CollectionCard } from '~/components/collections/CollectionCard';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import { LoaderArgs } from '@remix-run/server-runtime';

export async function loader({ request }: LoaderArgs) {
  const collections = await getCollections(request);
  return {
    collections,
  };
}

export default function Index() {
  const { collections } = useLoaderData<typeof loader>();
  const headerImage = (collections && collections.length > 0) ? collections[0]?.featuredAsset?.preview : null;
  return (
    <>
      <div className="relative">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="inset-0 overflow-hidden">
            <img
              className="inset-0 w-full"
              src="/New-BG-Slide1.jpg"
              alt="Koolair Pumps"
            />          
        </div>
        <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full">
          <h1 className="mt-6 text-center text-3xl text-gray-900">Welcome to KoolAirPump.com</h1>
          <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
            <h3 className="px-4 mt-6 text-2xl home-banner-subtitle">"There are too many things that can go wrong when you're on the water, you need to mitigate risk and making the decision to implement a KoolAir pump helps me do just that." <br/>Jeff Rickels - Naples, FL</h3>
          <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
            <h2>KoolAir Lifestyle</h2>
            <p>A clogged strainer on your boat can spell the end of a perfect day if you're left with a melted coolant pump and no air conditioner. <a href="/koolair-lifestyle">Learn More</a></p>
            <p>Coolant pumps are commonly used on boats to circulate seawater. When we heard people complaining about bad times due to melted air conditioning pumps, we decided to evolve the marine HVAC pump. The PM500 was born as a result.</p>
          </div>
          </div>
          </div>
        </div>             
      </div>

      <section
        aria-labelledby="category-heading"
        className="xl:max-w-7xl xl:mx-auto xl:px-8"
      >
        <div className="px-4 sm:px-6 lg:px-8 xl:px-0">
          <h1
            id="category-heading"
            className="text-2xl font-light tracking-tight text-gray-900"
          >
            Shop by Category
          </h1>
        </div>

        <div className="mt-4 flow-root">
          <div className="-my-2">
            <div className="box-content py-2 px-2 relative overflow-x-auto xl:overflow-visible">
              <div className="grid justify-items-center grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:gap-x-8">
                {collections && collections.map((collection) => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 px-4 sm:hidden">
          <a
            href="~/routes/__cart/index#"
            className="block text-sm font-semibold text-primary-600 hover:text-primary-500"
          >
            Browse all categories
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </section>
    </>
  );
}
