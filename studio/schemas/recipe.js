export default {
  name: "recipe",
  title: "Recipe",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Recipe Name",
      type: "string"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96
      }
    },
    {
      name: "chef",
      title: "Chef",
      type: "reference",
      to: { type: "chef" }
    },
    {
      name: "mainImage",
      title: "Recipe Main Image",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "ingredient",
      title: "Ingredient",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "ingredient",
              title: "Ingredient",
              type: "reference",
              to: [{ type: "ingredient" }]
            },
            {
              name: "wholeNumber",
              title: "Whole Number",
              type: "number"
            },
            {
              name: "fraction",
              title: "Fraction",
              type: "string",
              options: {
                list: ["1/8", "1/4", "1/3", "1/2", "2/3", "3/4"]
              }
            },
            {
              name: "unit",
              title: "Unit",
              type: "string",
              options: {
                list: ["grams", "cups", "Tbs.", "tsp."]
              }
            }
          ],
          preview: {
            select: {
              title: "ingredient.name",
              name: "ingredient.name",
              media: "ingredient.image",
              wholenumber: "wholeNumber",
              fraction: "fraction",
              unit: "unit"
            },
            prepare({
              title,
              subtitle,
              media,
              wholenumber = "(No whole number set)",
              fraction = "(No fraction set)",
              unit = "(No unit set)"
            }) {
              return {
                title,
                subtitle: `${wholenumber} ${fraction} ${unit}`,
                media
              };
            }
          }
        }
      ]
    },
    {
      name: "instructions",
      title: "Instructions",
      type: "array",
      of: [{ type: "block" }]
    }
  ]
};
