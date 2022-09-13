import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";
const CreateOffer = z.object({
  name: z.string(),
});
export default resolver.pipe(
  resolver.zod(CreateOffer),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const offer = await db.offer.create({
      data: input,
    });
    return offer;
  }
);
