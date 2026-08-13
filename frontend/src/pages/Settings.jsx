import { useState } from "react";

import {
  Landmark,
  Plus,
  RefreshCw,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";

import { importTransaction } from "../services/transactionService";

function Settings() {
  const [showModal, setShowModal] = useState(false);

  const [accounts, setAccounts] = useState([
    {
      id: 1,
      bank: "Demo Bank",
      accountNumber: "•••• 4821",
      type: "Savings Account",
      lastSynced: "Never",
      hasSynced: false,
    },
  ]);

  const [selectedBank, setSelectedBank] = useState("");
  const [accountType, setAccountType] =
    useState("Savings Account");

  const [syncingAccountId, setSyncingAccountId] =
    useState(null);

  const [syncMessage, setSyncMessage] =
    useState("");

  const connectAccount = () => {
    if (selectedBank === "") {
      alert("Please select a bank.");
      return;
    }

    const newAccount = {
      id: Date.now(),
      bank: selectedBank,
      accountNumber: "•••• 7392",
      type: accountType,
      lastSynced: "Never",
      hasSynced: false,
    };

    setAccounts((currentAccounts) => [
      ...currentAccounts,
      newAccount,
    ]);

    setSelectedBank("");
    setAccountType("Savings Account");
    setShowModal(false);
    setSyncMessage("");
  };

  const disconnectAccount = (id) => {
    setAccounts((currentAccounts) =>
      currentAccounts.filter(
        (account) => account.id !== id
      )
    );

    setSyncMessage("");
  };

  const syncAccount = async (id) => {
    if (syncingAccountId === id) {
      return;
    }

    const account = accounts.find(
      (item) => item.id === id
    );

    if (!account) {
      return;
    }

    setSyncingAccountId(id);
    setSyncMessage("");

    try {
      const today = new Date()
        .toISOString()
        .split("T")[0];

      const demoTransactions = [
        {
          externalId: "DEMO_BANK_TXN_001",
          title: "Swiggy",
          amount: 450,
          type: "expense",
          category: "Food",
          date: today,
        },
        {
          externalId: "DEMO_BANK_TXN_002",
          title: "Uber",
          amount: 280,
          type: "expense",
          category: "Travel",
          date: today,
        },
        {
          externalId: "DEMO_BANK_TXN_003",
          title: "Amazon",
          amount: 1299,
          type: "expense",
          category: "Shopping",
          date: today,
        },
      ];

      let importedCount = 0;

      for (const transaction of demoTransactions) {
        const response =
          await importTransaction(transaction);

        if (response.data) {
          importedCount++;
        }
      }

      setAccounts((currentAccounts) =>
        currentAccounts.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              lastSynced: "Just now",
              hasSynced: true,
            };
          }

          return item;
        })
      );

      if (importedCount === 0) {
        setSyncMessage(
          `${account.bank} is already up to date. No new transactions found.`
        );
      } else {
        setSyncMessage(
          `${importedCount} new transaction${
            importedCount === 1 ? "" : "s"
          } imported successfully.`
        );
      }

    } catch (error) {
      console.error(
        "Error syncing transactions:",
        error
      );

      setSyncMessage(
        "Unable to sync transactions. Please try again."
      );

    } finally {
      setSyncingAccountId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      {/* Header */}

      <div className="mb-8">

        <p className="text-sm font-semibold text-teal-600">
          Account Management
        </p>

        <h1 className="text-4xl font-bold text-slate-800 mt-1">
          Settings
        </h1>

        <p className="text-slate-500 mt-2">
          Manage your PennyPilot account and connected
          financial accounts.
        </p>

      </div>

      {/* Connected Accounts */}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Connected Accounts
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Connect accounts to automatically track
              your expenses.
            </p>

          </div>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-teal-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-teal-700 transition"
          >
            <Plus size={20} />
            Connect Account
          </button>

        </div>

        {/* Security Notice */}

        <div className="flex gap-4 bg-teal-50 border border-teal-100 rounded-xl p-4 mb-6">

          <ShieldCheck
            size={25}
            className="text-teal-600 shrink-0"
          />

          <div>

            <h3 className="font-semibold text-slate-800">
              Secure account connection
            </h3>

            <p className="text-sm text-slate-600 mt-1">
              PennyPilot uses secure, consent-based access.
              Never share your banking password with
              PennyPilot.
            </p>

          </div>

        </div>

        {/* Sync Message */}

        {syncMessage && (
          <div className="mb-5 rounded-xl bg-teal-50 border border-teal-100 px-4 py-3 text-sm font-medium text-teal-700">
            {syncMessage}
          </div>
        )}

        {/* Account List */}

        {accounts.length === 0 ? (

          <div className="border border-dashed border-slate-300 rounded-xl p-10 text-center">

            <Landmark
              size={40}
              className="mx-auto text-slate-300"
            />

            <h3 className="font-semibold text-slate-700 mt-4">
              No accounts connected
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Click "Connect Account" to add one.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {accounts.map((account) => (

              <div
                key={account.id}
                className="border border-slate-200 rounded-xl p-5"
              >

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                  {/* Account Information */}

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">

                      <Landmark
                        size={24}
                        className="text-slate-600"
                      />

                    </div>

                    <div>

                      <h3 className="font-semibold text-slate-800">
                        {account.bank}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        {account.type}{" "}
                        {account.accountNumber}
                      </p>

                      <div className="flex items-center gap-2 mt-2">

                        <span className="w-2 h-2 rounded-full bg-green-500" />

                        <span className="text-sm text-green-600 font-medium">
                          Connected
                        </span>

                        <span className="text-sm text-slate-400">
                          • Last synced{" "}
                          {account.lastSynced}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Actions */}

                  <div className="flex gap-3">

                    <button
                      type="button"
                      onClick={() =>
                        syncAccount(account.id)
                      }
                      disabled={
                        syncingAccountId ===
                        account.id
                      }
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >

                      <RefreshCw
                        size={17}
                        className={
                          syncingAccountId ===
                          account.id
                            ? "animate-spin"
                            : ""
                        }
                      />

                      {syncingAccountId ===
                      account.id
                        ? "Syncing..."
                        : "Sync"}

                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        disconnectAccount(
                          account.id
                        )
                      }
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 transition"
                    >

                      <Trash2 size={17} />

                      Disconnect

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* Connect Account Modal */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">

            {/* Modal Header */}

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-bold text-slate-800">
                  Connect Account
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Select your bank account.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowModal(false)
                }
                className="p-2 rounded-lg hover:bg-slate-100 transition"
              >
                <X size={20} />
              </button>

            </div>

            {/* Bank */}

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Bank
            </label>

            <select
              value={selectedBank}
              onChange={(e) =>
                setSelectedBank(e.target.value)
              }
              className="w-full border border-slate-300 rounded-xl p-3 mb-5"
            >

              <option value="">
                Select a bank
              </option>

              <option value="HDFC Bank">
                HDFC Bank
              </option>

              <option value="ICICI Bank">
                ICICI Bank
              </option>

              <option value="State Bank of India">
                State Bank of India
              </option>

              <option value="Axis Bank">
                Axis Bank
              </option>

              <option value="Demo Bank">
                Demo Bank
              </option>

            </select>

            {/* Account Type */}

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Account Type
            </label>

            <select
              value={accountType}
              onChange={(e) =>
                setAccountType(e.target.value)
              }
              className="w-full border border-slate-300 rounded-xl p-3 mb-6"
            >

              <option value="Savings Account">
                Savings Account
              </option>

              <option value="Current Account">
                Current Account
              </option>

            </select>

            {/* Demo Notice */}

            <div className="bg-slate-50 rounded-xl p-4 mb-6">

              <p className="text-sm text-slate-600">
                🔒 Demo mode: no real banking
                credentials are collected.
              </p>

            </div>

            {/* Connect */}

            <button
              type="button"
              onClick={connectAccount}
              className="w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition"
            >
              Connect Account
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Settings;