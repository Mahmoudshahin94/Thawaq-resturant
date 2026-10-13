import { i } from "@instantdb/react";

const schema = i.schema({
  entities: {
    categories: i.entity({
      name_en: i.string(),
      name_ar: i.string(),
      icon: i.string(),
      order: i.number(),
      active: i.boolean(),
    }),
    items: i.entity({
      name_en: i.string(),
      name_ar: i.string(),
      description_en: i.string(),
      description_ar: i.string(),
      price_small: i.number(),
      price_large: i.number(),
      image: i.string(),
      available: i.boolean(),
      order: i.number(),
      category_id: i.string(),
    }),
    settings: i.entity({
      key: i.string(),
      value: i.string(),
    }),
  },
});

export type AppSchema = typeof schema;
export default schema;
