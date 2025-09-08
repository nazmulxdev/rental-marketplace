import { MongoClient, Db, Collection } from "mongodb";

const uri: string | undefined = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Add MONGODB_URI in .env.local file");
}

// mongodb client declared
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// declared mongoClient as global variable
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// declare collection under database and exporting them as like object

// Note: this serviceCollection is used only for testing
export async function getCollection(): Promise<{
  servicesCollection: Collection;
  usersCollection: Collection;
  propertiesCollection: Collection;
  adminApplication: Collection
}> {
  const client: MongoClient = await clientPromise;
  const db: Db = client.db("Rental-Marketplace");

  return {
    servicesCollection: db.collection("services"),
    usersCollection: db.collection("users"),
    propertiesCollection: db.collection("properties"),
    adminApplication: db.collection("admin_application")
  };
}

export default clientPromise;
