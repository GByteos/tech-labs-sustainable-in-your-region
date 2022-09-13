import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";
const DeleteOffer = z.object({
  id: z.number(),
});
export default resolver.pipe(
  resolver.zod(DeleteOffer),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const offer = await db.offer.deleteMany({
      where: {
        id,
      },
    });
    return offer;
  }
);
