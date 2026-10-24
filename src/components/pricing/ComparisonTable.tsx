import { comparisonRows, comparisonValue, pricingPlans } from "../../data/pricing.ts";

export function ComparisonTable() {
  return (
    <div>
      <p className="text-sm text-muted xl:hidden">Leret jadual ke tepi untuk melihat semua pakej.</p>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Perbandingan pakej vividworks.my. Sel yang belum disahkan ditulis sebagai Akan disahkan.
          </caption>
          <thead className="bg-surface text-navy">
            <tr>
              <th scope="col" className="sticky left-0 bg-surface px-4 py-3 font-semibold">
                Ciri
              </th>
              {pricingPlans.map((plan) => (
                <th key={plan.id} scope="col" className="px-4 py-3 font-semibold">
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.id} className="border-t border-line">
                <th scope="row" className="sticky left-0 bg-white px-4 py-3 font-medium text-navy">
                  {row.label}
                </th>
                {pricingPlans.map((plan) => {
                  const cell = comparisonValue(plan, row.id);
                  return (
                    <td key={plan.id} className="px-4 py-3 align-top leading-6 text-ink">
                      <span className={cell.confirmed ? undefined : "text-muted"}>{cell.value}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
