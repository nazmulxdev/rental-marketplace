import { getCollection } from "@/lib/db.connect";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const { propertiesCollection } = await getCollection();

    const listing = await propertiesCollection.findOne({ _id: new ObjectId(id) });

    if (!listing) {
      return Response.json({ error: "Listing not found" }, { status: 404 });
    }

    return Response.json(listing);
  } catch (err) {
    console.error("Error fetching listing:", err);
    return Response.json({ error: "Failed to fetch listing" }, { status: 500 });
  }
}
