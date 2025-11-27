import { useEffect, useState } from "react";
import { api } from "../API/api";
import { Link, useNavigate } from "react-router-dom";

export default function SearchPage() {
  const [data, setData] = useState(null);
  const q = new URLSearchParams(window.location.search).get("q");
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/search?q=${q}`).then((res) => {
      const result = res.data;
      setData(result);

      // Auto redirect to main page
      const target = detectAutoRedirect(result);
      if (target !== "/search") navigate(target);
    });
  }, [q]);

  if (!data) {
    return <p className="p-10 text-center text-lg">Searching...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {Object.entries(data).map(([model, items]) =>
        items.length > 0 ? (
          <Section key={model} model={model} items={items} />
        ) : null
      )}

      {Object.values(data).every((arr) => arr.length === 0) && (
        <p className="text-gray-600 text-lg text-center mt-10">
          No results found.
        </p>
      )}
    </div>
  );
}

function Section({ model, items }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-3 capitalize">
        {model.replace("_", " ")}
      </h2>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link to={detectLink(model)} className="text-blue-600 hover:underline">
              {item.title || item.name || "Untitled"}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function detectLink(model) {
  switch (model) {
    case "projects":
      return "/project";
    case "impacts":
      return "/impacts";
    case "posts":
      return "/latest";
    case "library":
      return "/library";
    case "jobs":
      return "/careers";
    case "volunteers":
      return "/volunteer";
    case "people":
      return "/structure";
    default:
      return "/";
  }
}

function detectAutoRedirect(data) {
  if (data.projects?.length > 0) return "/project";
  if (data.impacts?.length > 0) return "/impacts";
  if (data.posts?.length > 0) return "/latest";
  if (data.library?.length > 0) return "/library";
  if (data.jobs?.length > 0) return "/careers";
  if (data.volunteers?.length > 0) return "/volunteer";
  if (data.people?.length > 0) return "/structure";

  return "/search";
}
