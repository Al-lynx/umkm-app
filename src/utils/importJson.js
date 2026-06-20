export const importJSON =
  (file) => {
    return new Promise(
      (resolve, reject) => {
        const reader =
          new FileReader();

        reader.onload = (
          e
        ) => {
          try {
            resolve(
              JSON.parse(
                e.target.result
              )
            );
          } catch {
            reject();
          }
        };

        reader.readAsText(
          file
        );
      }
    );
  };