import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ListingDetailsCard from '@/components/listingPage/ListingDetailsCard';
import React from 'react';

const  ListingDetailsPage = async ({params}) => {
  
  const { id } = await params;

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/listings/${id}`, {
    next: {revalidate: 60},
  });

  if (!res.ok) {
    return <p className="text-center text-red-500 mt-10">Listing not found</p>;
  }

  const listing = await res.json();

  return (
    <ListingDetailsCard listing={listing}/>
  );
};

export default ListingDetailsPage;