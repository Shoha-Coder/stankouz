import { LogosCarousel } from "@/shared/ui/logos-carousel";

const partners = [
  { id: 1, logo: "/images/partners/osta.png" },
  { id: 2, logo: "/images/partners/uzkimyosanoat.png" },
  { id: 3, logo: "/images/partners/ies.png" },
  { id: 4, logo: "/images/partners/qizilqumkompleksi.png" },
  { id: 5, logo: "/images/partners/sanoatqurilishmater.png" },
  { id: 6, logo: "/images/partners/nkmk.png" },
  { id: 7, logo: "/images/partners/uzmetkombinat.png" },
];

export function Partners({ isLab }: { isLab?: boolean }) {
  return (
    <LogosCarousel
      title={isLab ? 'Brendlar' : 'Hamkorlarimiz'}
      subtitle={isLab ? 'Biz yuqori sifatli xizmatlar, tezkor yordam va har bir mijozga individual yondashuvni taklif etamiz.' : 'Biz yuqori sifatli xizmatlar, tezkor yordam va har bir mijozga individual yondashuvni taklif etamiz.'}
      items={partners}
    />
  );
}
