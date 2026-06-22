import {
  getData,
  saveData,
  STORAGE_KEYS,
} from "./storageService";

export function getTransactions() {
  return getData(
    STORAGE_KEYS.TRANSACTIONS
  );
}

export function saveTransactions(
  transactions
) {
  saveData(
    STORAGE_KEYS.TRANSACTIONS,
    transactions
  );
}

export function addTransaction(
  transaction
) {
  const transactions =
    getTransactions();

  saveTransactions([
    transaction,
    ...transactions,
  ]);
}