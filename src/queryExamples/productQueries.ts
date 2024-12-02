import { Product, ProductVariant } from "../models";

export const addProductWithVariants = async () => {
  const product = await Product.create({
    name: "T-Shirt",
    description: "Comfortable cotton T-shirt",
  });

  await ProductVariant.bulkCreate([
    {
      productId: product.id,
      color: "Black",
      size: "M",
      stock: 10,
      price: 29.99,
      sku: "TSHIRT-BLACK-M",
    },
    {
      productId: product.id,
      color: "Red",
      size: "L",
      stock: 5,
      price: 34.99,
      sku: "TSHIRT-RED-L",
    },
  ]);

  console.log("Product and variants added successfully!");
};

export const fetchProductWithVariants = async (productId: number) => {
  const product = await Product.findByPk(productId, {
    include: [
      {
        model: ProductVariant,
        as: "variants",
      },
    ],
  });

  console.log("Product with Variants:", product);
};
