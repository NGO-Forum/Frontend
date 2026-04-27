import React, { useEffect, useState } from "react";
import { api } from "../../API/api";
import PeopleForm from "../components/PeopleForm";
import PeopleTable from "../components/PeopleTable";
import { PlusIcon, UsersIcon } from "@heroicons/react/24/outline";

export default function PeopleAdmin() {
  const [category, setCategory] = useState("director");
  const [people, setPeople] = useState([]);
  const [editing, setEditing] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const loadPeople = async () => {
    const res = await api.get(`/people?category=${category}`);
    setPeople(res.data);
  };

  useEffect(() => {
    loadPeople();
  }, [category]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 bg-white p-6 rounded-lg">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <UsersIcon className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-extrabold text-green-700 tracking-tight">
              People Management
            </h1>
          </div>
          <p className="text-gray-500">Manage team members, directors, and advisors.</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Styled Select */}
          <div className="relative">
            <select
              className="block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-xl shadow-sm bg-gray-100 transition-all appearance-none cursor-pointer"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="director">Directors</option>
              <option value="advisor">Advisors</option>
              <option value="sachas">SACHAS</option>
              <option value="pili">PALI</option>
              <option value="riti">RITI</option>
              <option value="macor">MACOR</option>
              <option value="executiveDirector">Executive Director</option>
            </select>
            {/* Custom dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </div>
          </div>

          {/* Add Button */}
          <button
            onClick={() => {
              setEditing(null);
              setOpenForm(true);
            }}
            className="inline-flex items-center px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md shadow-green-200 transition-all active:scale-95 gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add New</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <PeopleTable
        people={people}
        loadPeople={loadPeople}
        setEditing={(p) => {
          setEditing(p);
          setOpenForm(true);
        }}
      />

      {/* Form Modal */}
      {openForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-3xl shadow-lg h-[95%] overflow-auto">
            <PeopleForm
              category={category}
              setCategory={setCategory}
              editing={editing}
              setEditing={setEditing}
              loadPeople={loadPeople}
              onSuccess={() => setOpenForm(false)}
              setOpenForm={setOpenForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}
