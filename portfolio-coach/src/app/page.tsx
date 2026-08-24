import PortfolioCoachForm from "@/components/PortfolioCoachForm";

export default function Home() {
  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Portfolio Coach</h1>
      <p className="text-gray-600 mb-8">
        Välkommen! Fyll i dina uppgifter nedan för att få feedback på din portfolio-pitch.
      </p>
      <PortfolioCoachForm />
    </main>
  );
}