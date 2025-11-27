import React, { useState, useEffect } from "react";

export default function ProjectForm({ project, onClose, onSave }) {
    const [form, setForm] = useState({
        name: "",
        summary: "",
        duration_start: "",
        duration_end: "",
        donor: "",
        department: "",
        objectives: [],
        key_activities: [],
        target_areas: "",
        target_groups: "",
        images: [],            // multiple NEW images (File objects)
        oldImages: [],         // existing images from DB
        removeImages: [],
    });

    useEffect(() => {
        if (project) {
            setForm({
                name: project.name,
                summary: project.summary,
                duration_start: project.duration_start ? project.duration_start.substring(0, 10) : "",
                duration_end: project.duration_end ? project.duration_end.substring(0, 10) : "",
                donor: project.donor,
                department: project.department || "",
                objectives: project.objectives || [],
                key_activities: project.key_activities || [],
                target_areas: project.target_areas,
                target_groups: project.target_groups,
                images: [],
                oldImages: project.images || [],
                removeImages: [],
            });
        }
    }, [project]);

    // Handle simple field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Handle MULTIPLE new images
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setForm({ ...form, images: [...form.images, ...files] });
    };

    // Remove an existing image
    const removeOldImage = (img) => {
        setForm({
            ...form,
            oldImages: form.oldImages.filter((i) => i !== img),
            removeImages: [...form.removeImages, img],
        });
    };

    // Remove a newly added image
    const removeNewImage = (index) => {
        setForm({
            ...form,
            images: form.images.filter((_, i) => i !== index),
        });
    };

    const handleArrayField = (field, index, value) => {
        const updated = [...form[field]];
        updated[index] = value;
        setForm({ ...form, [field]: updated });
    };

    const addArrayItem = (field) => {
        setForm({ ...form, [field]: [...form[field], ""] });
    };

    const removeArrayItem = (field, index) => {
        setForm({
            ...form,
            [field]: form[field].filter((_, i) => i !== index),
        });
    };

    // Submit FormData
    const handleSubmit = () => {
        const fd = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            if (key === "images" || key === "oldImages" || key === "removeImages") {
                return; // handle separately
            }

            if (Array.isArray(value)) {
                value.forEach((item, index) => fd.append(`${key}[${index}]`, item));
            } else {
                fd.append(key, value);
            }
        });

        // Append NEW IMAGES
        form.images.forEach((file) => fd.append("images[]", file));

        // Append REMOVE old images
        form.removeImages.forEach((img) => fd.append("removeImages[]", img));

        onSave(fd, project?.id || null);
    };


    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl p-6 animate-fadeIn max-h-[85vh] overflow-y-auto border border-gray-200">

                {/* Header */}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-bold text-green-600">
                        {project ? "Edit Project" : "New Project"}
                    </h2>
                    <button
                        className="text-red-500 hover:text-red-700 text-xl"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["name", "donor"].map((field) => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                                {field.replace("_", " ")}
                            </label>
                            <input
                                type="text"
                                name={field}
                                value={form[field]}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    ))}

                    {/* Date Inputs with Calendar Picker */}
                    {["duration_start", "duration_end"].map((field) => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                                {field.replace("_", " ")}
                            </label>
                            <input
                                type="date"
                                name={field}
                                value={form[field]}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-6 space-y-2 w-1/4">
                    <label className="block text-sm font-medium text-gray-700">Department / Program</label>
                    <select
                        name="department"
                        value={form.department || ""}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    >
                        <option value="">PROGRAM</option>
                        <option value="RITI">RITI</option>
                        <option value="SACHAS">SACHAS</option>
                        <option value="MACOR">MACOR</option>
                        <option value="PALI">PALI</option>
                    </select>
                </div>

                {/* Textareas */}
                <div className="mt-6 space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Summary
                        </label>
                        <textarea
                            name="summary"
                            value={form.summary}
                            onChange={handleChange}
                            rows={4}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Target Areas
                        </label>
                        <textarea
                            name="target_areas"
                            value={form.target_areas}
                            onChange={handleChange}
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Target Groups
                        </label>
                        <textarea
                            name="target_groups"
                            value={form.target_groups}
                            onChange={handleChange}
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Objectives */}
                <div className="mt-6">
                    <label className="block font-medium text-gray-800">Objectives</label>

                    <div className="space-y-2 mt-2">
                        {form.objectives.map((item, i) => (
                            <div key={i} className="flex gap-2">
                                <input
                                    type="text"
                                    className="border border-gray-300 p-2 rounded-lg flex-1 focus:ring-2 focus:ring-blue-500"
                                    value={item}
                                    onChange={(e) =>
                                        handleArrayField("objectives", i, e.target.value)
                                    }
                                />
                                <button
                                    className="bg-red-500 text-white px-3 rounded hover:bg-red-600"
                                    onClick={() => removeArrayItem("objectives", i)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        <button
                            className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            onClick={() => addArrayItem("objectives")}
                        >
                            + Add Objective
                        </button>
                    </div>
                </div>

                {/* Key Activities */}
                <div className="mt-6">
                    <label className="block font-medium text-gray-800">Key Activities</label>

                    <div className="space-y-2 mt-2">
                        {form.key_activities.map((item, i) => (
                            <div key={i} className="flex gap-2">
                                <input
                                    type="text"
                                    className="border border-gray-300 p-2 rounded-lg flex-1 focus:ring-2 focus:ring-blue-500"
                                    value={item}
                                    onChange={(e) =>
                                        handleArrayField("key_activities", i, e.target.value)
                                    }
                                />
                                <button
                                    className="bg-red-500 text-white px-3 rounded hover:bg-red-600"
                                    onClick={() => removeArrayItem("key_activities", i)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        <button
                            className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            onClick={() => addArrayItem("key_activities")}
                        >
                            + Add Activity
                        </button>
                    </div>
                </div>

                {/* IMAGE UPLOAD */}
                <div className="mt-6">
                    <label className="block font-medium text-gray-800 mb-2">
                        Project Images
                    </label>

                    {/* Upload Button */}
                    <label
                        htmlFor="imageInput"
                        className="
                    inline-flex items-center gap-2 px-3 py-1 
                    bg-blue-600 hover:bg-blue-700 text-white 
                    rounded-lg shadow cursor-pointer transition
                    "
                    >
                        + Upload Image
                    </label>

                    <input
                        id="imageInput"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />

                    {/* Existing Images */}
                    {form.oldImages.length > 0 && (
                        <div className="mt-4">
                            <p className="font-medium mb-2 text-gray-700">Existing Images</p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {form.oldImages.map((img, i) => (
                                    <div
                                        key={i}
                                        className="
                            relative group rounded-xl overflow-hidden 
                            border shadow bg-white
                            "
                                    >
                                        <img
                                            src={`http://44.205.95.55/storage/${img}`}
                                            className="w-full h-32 object-cover transition group-hover:brightness-75"
                                        />

                                        {/* Hover delete button */}
                                        <button
                                            onClick={() => removeOldImage(img)}
                                            className="
                                absolute top-2 right-2 
                                bg-red-600 text-white text-xs px-2 py-1 rounded 
                                opacity-0 group-hover:opacity-100 transition
                                shadow
                            "
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* New Images */}
                    {form.images.length > 0 && (
                        <div className="mt-4">
                            <p className="font-medium mb-2 text-gray-700">New Images</p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {form.images.map((image, i) => (
                                    <div
                                        key={i}
                                        className="
                            relative group rounded-xl overflow-hidden 
                            border shadow bg-white
                            "
                                    >
                                        <img
                                            src={URL.createObjectURL(image)}
                                            className="w-full h-32 object-cover transition group-hover:brightness-75"
                                        />

                                        {/* Hover delete button */}
                                        <button
                                            onClick={() => removeNewImage(i)}
                                            className="
                                absolute top-2 right-2 
                                bg-red-600 text-white text-xs px-2 py-1 rounded 
                                opacity-0 group-hover:opacity-100 transition
                                shadow
                            "
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>



                {/* Actions */}
                <div className="flex justify-end gap-3 mt-8">
                    <button
                        className="px-5 py-2 bg-orange-300 text-white rounded-lg hover:bg-orange-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
