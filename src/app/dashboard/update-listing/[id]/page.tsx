import { getCollection } from "@/lib/db.connect";
import { ObjectId } from "mongodb";
import UpdateListingForm from "../../../../components/dashboard/UpdateListingForm";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { NextAuthOptions } from "next-auth";

interface Props { params: { id: string } }

export default async function UpdateListingPage({ params }: Props) {
  const session = await getServerSession(authOptions as NextAuthOptions);
  // @ts-expect-error id added in callbacks
  const userId: string | null = session?.user?.id || null;
  const { id } = params;
  if (!ObjectId.isValid(id)) return notFound();
  const { propertiesCollection } = await getCollection();
  // Fetch with owner field for validation
  const doc = await propertiesCollection.findOne({ _id: new ObjectId(id) }, { projection: { title:1, status:1, description:1, type:1, pricing:1, location:1, ownerAdminId:1 } });
  if (!doc) return notFound();
  // Enforce ownership (supports both ObjectId & string stored forms just in case)
  if (!userId) return notFound();
  const ownerMatches = (doc.ownerAdminId instanceof ObjectId && doc.ownerAdminId.toString() === userId) || doc.ownerAdminId === userId;
  if (!ownerMatches) return notFound();
  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Update Listing</h1>
        <p className="text-sm text-base-content/70 max-w-2xl">Modify details, adjust status visibility, and keep information accurate.</p>
      </div>
      <UpdateListingForm
        listingId={id}
        initialTitle={doc.title}
        initialStatus={doc.status || 'active'}
        initialType={doc.type || 'room'}
        initialDescription={doc.description || ''}
        initialMonthly={doc?.pricing?.monthly ?? ''}
        initialDeposit={doc?.pricing?.deposit ?? ''}
        initialCity={doc?.location?.address?.city || ''}
        initialDistrict={doc?.location?.address?.district || ''}
        initialDivision={doc?.location?.address?.division || ''}
      />
    </section>
  );
}
