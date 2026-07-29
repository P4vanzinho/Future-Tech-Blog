import type { Payload } from "payload";

const collectionsToClear = [
  "articles",
  "authors",
  "categories",
  "media",
  "users",
] as const;

async function deleteAllFromCollection(
  payload: Payload,
  collection: (typeof collectionsToClear)[number]
) {
  const pageSize = 100;

  while (true) {
    const result = await payload.find({
      collection,
      limit: pageSize,
      pagination: false,
      depth: 0,
      overrideAccess: true,
    });

    if (result.docs.length === 0) {
      break;
    }

    await Promise.all(
      result.docs.map((doc) =>
        payload.delete({
          collection,
          id: doc.id,
          overrideAccess: true,
          context: { skipRevalidation: true },
        })
      )
    );
  }
}

export async function clearSeedData(payload: Payload) {
  for (const collection of collectionsToClear) {
    await deleteAllFromCollection(payload, collection);
  }
}
