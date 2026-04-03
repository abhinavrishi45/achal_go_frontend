import ServicePage from "../[slug]/page";

export default async function DemoServicePage() {
  // Reuse the server-rendered dynamic service page for the static demo-service route.
  return ServicePage({ params: { slug: "demo-service" } });
}
