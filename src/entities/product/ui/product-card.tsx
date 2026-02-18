import Link from "next/link";
import { Product } from "../model/types";
import styles from "./product-card.module.scss";
import { ImageWithLoader } from "@/shared/ui/image-with-loader";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import { usePathname } from "next/navigation";

interface Props {
  product: Product;
  isProductPage?: boolean;
}

export const ProductCard = ({ product, isProductPage }: Props) => {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const basePath = isProductPage ? "products" : "machines";
  const href = `/${locale}/${basePath}/${product.slug}`;
  return (
    <Link href={href as any} className={styles.card}>
      <div className={styles.image}>
        <ImageWithLoader
          src={product.image}
          alt={product.title}
          fill
          sizes="168"
        />
      </div>

      <h3 className={styles.title}>{product.title}</h3>
      {product.categoryLabel && (
        <p className={styles.ts}>{product.categoryLabel}</p>
      )}
    </Link>
  );
};