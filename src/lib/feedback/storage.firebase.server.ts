/**
 * Firebase Firestore adapter (drop-in).
 *
 * To activate:
 *   1. `bun add firebase-admin`
 *   2. Add secrets: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
 *   3. Set FEEDBACK_PROVIDER=firebase
 *   4. Uncomment the implementation below.
 *
 * Kept as a stub so the project builds without the optional dependency.
 */

import type { FeedbackRecord, FeedbackStorage, FeedbackStored } from "./types.server";

export const firebaseStorage: FeedbackStorage = {
  name: "firebase",
  async save(_input: FeedbackRecord): Promise<FeedbackStored> {
    throw new Error(
      "[feedback/firebase] Adapter not enabled. Install firebase-admin and uncomment the implementation in storage.firebase.server.ts.",
    );

    /*
    // Example implementation (requires firebase-admin):
    //
    // import { initializeApp, cert, getApps } from "firebase-admin/app";
    // import { getFirestore, Timestamp } from "firebase-admin/firestore";
    //
    // if (!getApps().length) {
    //   initializeApp({
    //     credential: cert({
    //       projectId: process.env.FIREBASE_PROJECT_ID!,
    //       clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    //       privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    //     }),
    //   });
    // }
    //
    // const db = getFirestore();
    // const doc = await db.collection("feedback").add({
    //   name: _input.name,
    //   email: _input.email,
    //   subject: _input.subject ?? null,
    //   message: _input.message,
    //   source: _input.source ?? "website",
    //   userAgent: _input.userAgent ?? null,
    //   ipHash: _input.ipHash ?? null,
    //   createdAt: Timestamp.now(),
    //   status: "new",
    // });
    //
    // return { ..._input, id: doc.id, createdAt: new Date().toISOString() };
    */
  },
};
