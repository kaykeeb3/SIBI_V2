const Monitors = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Gráfico de Empréstimos</h1>
        <LoanChart />
      </div>
    </div>
  );
};

export default Monitors;
