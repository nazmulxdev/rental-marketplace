import { getCollection } from "@/lib/db.connect";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const location = searchParams.get("location");
    const type = searchParams.get("propertyType");
    const priceRange = searchParams.get("priceRange");

    const { propertiesCollection } = await getCollection();
    let query = {};

    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by city (nested field)
    if (location) {
      query["location.address.city"] = { $regex: location, $options: "i" };
    }

    // Filter by property type
    if (type) query.type = type;

    // Filter by monthly price (nested field)
    if (priceRange) {
      if (priceRange === "20000+") {
        query["pricing.monthly"] = { $gte: 20000 };
      } else {
        const [min, max] = priceRange.split("-").map(Number);
        query["pricing.monthly"] = { $gte: min, $lte: max };
      }
    }

    const listings = await propertiesCollection.find(query).toArray();
    return Response.json(listings);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to fetch listings" }, { status: 500 });
  }
}
