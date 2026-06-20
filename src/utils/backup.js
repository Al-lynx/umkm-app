export const exportBackup =
  () => {
    const data = {
      products:
        JSON.parse(
          localStorage.getItem(
            "products"
          )
        ) || [],

      transactions:
        JSON.parse(
          localStorage.getItem(
            "transactions"
          )
        ) || [],
    };

    const blob =
      new Blob(
        [
          JSON.stringify(
            data,
            null,
            2
          ),
        ],
        {
          type: "application/json",
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
      "backup-umkm.json";

    a.click();

    URL.revokeObjectURL(
      url
    );
  };

export const importBackup =
  (file) => {
    const reader =
      new FileReader();

    reader.onload = (
      event
    ) => {
      const data =
        JSON.parse(
          event.target.result
        );

      localStorage.setItem(
        "products",
        JSON.stringify(
          data.products || []
        )
      );

      localStorage.setItem(
        "transactions",
        JSON.stringify(
          data.transactions ||
            []
        )
      );

      window.location.reload();
    };

    reader.readAsText(file);
  };