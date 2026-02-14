"use client";
import Advantages from "@/shared/ui/advantages/advantages";
import { Breadcrumb } from "@/shared/ui/breadcrumb/breadcrumb";
import { CertificatesCarousel } from "@/shared/ui/certificates/certificates-carousel";
import Player from "@/widgets/player/player";
import { TeamGrid } from "@/shared/ui/team-card/team-grid";
import { CompanyHistory } from "@/widgets/company-history/company-history";
import { history } from "@/widgets/company-history/model/data";
import { statsData } from "@/widgets/stats/model/stats";
import { Stats } from "@/widgets/stats/stats";
import { News } from "@/widgets/news/news";
import { Partners } from "@/widgets/partners/partners";
import { ContactSection } from "@/shared/ui/contact-section/contact-section";

const items = [
  { label: "Home", href: "" },
  { label: "About", href: "about" },
];

const members = [
  {
    id: 1,
    image: "/images/employees/1.png",
    name: "Amanov Ne’mat Nuraliyevich",
    position: "Sotuv menejeri",
  },
  {
    id: 2,
    image: "/images/employees/2.png",
    name: "Sahkulov Begmat Kurbanovich",
    position: "Injener-texnolog",
  },
  {
    id: 3,
    image: "/images/employees/3.png",
    name: "Mahmudov Lutfidin Nasimovich",
    position: "Korxona boshlig‘i",
  },
  {
    id: 4,
    image: "/images/employees/4.png",
    name: "Radjapov Baxtiyor Istamovich",
    position: "Dispetcher bo‘limi boshlig‘i",
  },
  {
    id: 5,
    image: "/images/employees/5.png",
    name: "Aslanov Javlon Mamurjonovich",
    position: "Texnologik bo‘lim boshlig‘i",
  },
  {
    id: 6,
    image: "/images/employees/6.png",
    name: "Sahkulov Begmamat Kurbanovich",
    position: "Injener-texnolog",
  },
  {
    id: 7,
    image: "/images/employees/7.png",
    name: "Mahmudov Lutfidin Nasimovich",
    position: "Korxona boshlig‘i",
  },
  {
    id: 8,
    image: "/images/employees/8.png",
    name: "Radjapov Baxtiyor Istamovich",
    position: "Dispetcher bo‘limi boshlig‘i",
  },
];

const page = () => {
  return (
    <main>
      <Breadcrumb items={items} />
      <Player />
      <Stats items={statsData} />
      <Advantages
        title="Bizning afzalliklar"
        text="Biz yuqori sifatli xizmatlar, tezkor yordam va har bir mijozga individual yondashuvni taklif etamiz."
      />
      {/* <CompanyHistory title="Kompaniyamiz tarixi" items={history} /> */}
      {/* <TeamGrid members={members} /> */}
      {/* <CertificatesCarousel
        items={[
          { id: 1, image: "/images/certs/1.png" },
          { id: 2, image: "/images/certs/2.png" },
          { id: 3, image: "/images/certs/3.png" },
        ]}
      /> */}
      <News />
      <Partners />
      <ContactSection />
    </main>
  );
};

export default page;
