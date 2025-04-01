"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { getExpense, updateExpenses } from "@/actions/actions";
import { redirect } from "next/navigation";

type ExpensePropType = {
  id: number;
  description: string;
  amount: number;
  creatorId: string;
  createdAt: Date;
};

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  id: number,
  newDescription: string,
  newAmount: string
) => {
  e.preventDefault();
  await updateExpenses(id, newDescription, newAmount);
  redirect("/app/dashboard");
};

export default function UpdateModal({ id }: { id: number }) {
  const [open, setOpen] = useState(true);
  const [singleExpense, setSingleExpense] = useState<ExpensePropType>();
  const [newDescription, setNewDescription] = useState("");
  const [newAmount, setNewAmount] = useState("");

  useEffect(() => {
    async function getExpenseDetails(id: number) {
      const expense = await getExpense(id);
      console.log(expense);
      setSingleExpense(expense);
    }

    getExpenseDetails(id);
  }, []);

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-800/80 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white px-1 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-semibold text-gray-900"
                  >
                    Update Expenses
                    <p className="text-xs text-red-500 font-light mt-2 bg-red-100 p-2 rounded-lg">
                      <span className="font-bold text-sm">Note</span> : While
                      updating the individual expense, please update both fields
                      together. The feature for updating either of the fields is
                      yet to be shipped.
                    </p>
                  </DialogTitle>

                  <form
                    onSubmit={(e) =>
                      handleSubmit(e, id, newDescription, newAmount)
                    }
                    className="w-full mt-6 rounded-lg space-y-5"
                  >
                    <input
                      type="text"
                      placeholder="Description"
                      name="description"
                      className="w-full px-3 py-2 outline-none border border-gray-500 rounded-lg"
                      defaultValue={singleExpense?.description}
                      onChange={(e) => setNewDescription(e.target.value)}
                    />

                    <input
                      type="number"
                      placeholder="Amount"
                      name="amount"
                      className="w-full px-3 py-2 outline-none border border-gray-500 rounded-lg"
                      step={0.01}
                      defaultValue={singleExpense?.amount}
                      onChange={(e) => setNewAmount(e.target.value)}
                    />

                    <button
                      type="submit"
                      className="mt-3 w-full justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-600 cursor-pointer"
                      onClick={() => setOpen(false)}
                    >
                      Update
                    </button>
                  </form>

                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="mt-3 w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}