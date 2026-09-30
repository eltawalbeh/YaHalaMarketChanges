import type { Offer, OfferStatus } from "@/types";
import { db, request } from "@/lib/request";
import { listAll } from "./shared";
export const offersService = {
  async list(filters?: { status?: OfferStatus }) {
    return listAll<Offer>("offers", (q) => {
      if (filters?.status) q = q.eq("status", filters.status);
      if (filters?.status === "published")
        q = q.or(
          "expires_at.is.null,expires_at.gt." + new Date().toISOString(),
        );
      return q;
    });
  },
  async getBySlug(slug: string): Promise<Offer | null> {
    return request(
      db()
        .from("offers")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .or("expires_at.is.null,expires_at.gt." + new Date().toISOString())
        .maybeSingle(),
    );
  },
  async getById(id: string): Promise<Offer | null> {
    return request(db().from("offers").select("*").eq("id", id).maybeSingle());
  },
  async create(
    data: Omit<Offer, "id" | "created_at" | "updated_at">,
  ): Promise<Offer> {
    return request(db().from("offers").insert(data).select().single());
  },
  async update(id: string, data: Partial<Offer>): Promise<Offer> {
    return request(
      db().from("offers").update(data).eq("id", id).select().single(),
    );
  },
};
