import React, { useEffect, useState } from "react";
import { api } from "../../API/api";
import PeopleForm from "../components/PeopleForm";
import PeopleTable from "../components/PeopleTable";

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
    <div className="p-2">
      <h1 className="text-3xl font-bold mb-6 text-green-700">People Management</h1>

      {/* Category selector */}
      <select
        className="border p-2 mb-4 mr-2 md:mr-6"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="director">Directors</option>
        <option value="advisor">Advisors</option>
        <option value="sachas">SACHAS</option>
        <option value="pili">PILI</option>
        <option value="riti">RITI</option>
        <option value="macor">MACOR</option>
        <option value="executiveDirector">Executive Director</option>
      </select>

      {/* Create button */}
      <button
        onClick={() => {
          setEditing(null);
          setOpenForm(true);
        }}
        className="px-4 py-2 bg-green-600 text-white rounded mb-4"
      >
        + Add New
      </button>

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
