import { getCollection } from "@/lib/db.connect";
import { ObjectId } from "mongodb";
import UpdateListingForm from "../../../../components/dashboard/UpdateListingForm";
import { notFound } from "next/navigation";

interface Props { params: { id: string } }

export default async function UpdateListingPage({ params }: Props) {
  const { id } = params;
  if (!ObjectId.isValid(id)) return notFound();
  const { propertiesCollection } = await getCollection();
  const doc = await propertiesCollection.findOne({ _id: new ObjectId(id) }, { projection: { title:1, status:1 } });
  if (!doc) return notFound();
  return (
    <section className="space-y-6 max-w-xl">
      <h1 className="text-xl font-semibold">Update Listing</h1>
      <UpdateListingForm listingId={id} initialTitle={doc.title} initialStatus={doc.status || 'active'} />
    </section>
  );
}
