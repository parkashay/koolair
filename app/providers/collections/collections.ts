import gql from 'graphql-tag';
import { sdk } from '../../graphqlWrapper';
import { listedProductFragment } from '../products/products';
import {
  CollectionListOptions,
  ProductVariantListOptions,
} from '~/generated/graphql';

export function getCollections(
  request: Request,
  options?: CollectionListOptions,
  pvOptions?: ProductVariantListOptions,
) {
  return sdk
    .collections(
      {
        options,
        pvOptions,
      },
      { request },
    )
    .then((result) => result.collections?.items);
}

export function getCollection(
  request: Request,
  slug: string,
  pvOptions?: ProductVariantListOptions,
) {
  return sdk
    .collection(
      {
        slug,
        pvOptions,
      },
      { request },
    )
    .then((result) => result.collection);
}

gql`
  fragment ProductVariant on ProductVariant {
    id
    name
  }
`;

gql`
  fragment Collection on Collection {
    id
    name
    slug
    breadcrumbs {
      id
      name
      slug
    }
    featuredAsset {
      id
      preview
    }
    productVariants(options: $pvOptions) {
      items {
        ...ProductVariant
      }
    }
  }
`;

gql`
  query collections(
    $options: CollectionListOptions,
    $pvOptions: ProductVariantListOptions
  ) {
    collections(options: $options) {
      items {
        ...Collection
        parent {
          ...Collection
        }
        children {
          ...Collection
        }
      }
    }
  }
`;

gql`
  query collection(
    $slug: String
    $id: ID,
    $pvOptions: ProductVariantListOptions
  ) {
    collection(slug: $slug, id: $id) {
      ...Collection
      children {
        ...Collection
      }
    }
  }
`;
