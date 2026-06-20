export const exportReportCSV =
  (
    transactions,
    filename =
      "laporan.csv"
  ) => {
    const rows = [
      [
        "Tanggal",
        "Metode",
        "Total",
      ],
    ];

    transactions.forEach(
      (trx) => {
        rows.push([
          trx.date,
          trx.paymentMethod,
          trx.total,
        ]);
      }
    );

    const csv =
      rows
        .map((row) =>
          row.join(",")
        )
        .join("\n");

    const blob = new Blob(
      [csv],
      {
        type: "text/csv",
      }
    );

    const url =
      URL.createObjectURL(
        blob
      );

    const a =
      document.createElement(
        "a"
      );

    a.href = url;
    a.download =
      filename;

    a.click();

    URL.revokeObjectURL(url);
  };