
"use server";

import { getCollection } from "@/lib/db.connect";

export async function getTheFeaturedProduct() {
   const { propertiesCollection } = await getCollection() ;
   const data=await (propertiesCollection.find().limit(6).sort({ "pricing.monthly": 1 }).toArray());

       const cleanedData = data.map((p) => ({
      ...p,
      _id: p._id.toString(),
      ownerAdminId: p.ownerAdminId.toString(),
    }));

    return cleanedData;
}