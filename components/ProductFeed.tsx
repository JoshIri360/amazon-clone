import { getProducts } from "@/app/page";

async function ProductFeed() {
  const products = await getProducts();

  console.log(products);
  return (
    <div>
      <div>Products here...</div>
      <div>
        {products.map((product: any) => (
          <p key={product.id}>{product.title}</p>
        ))}
      </div>
    </div>
  );
}

export default ProductFeed;
