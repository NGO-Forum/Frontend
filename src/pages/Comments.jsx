import { useState, useEffect } from "react";
import { api } from "../API/api";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

export default function CommentsPage() {
    const [comments, setComments] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const loadComments = async () => {
        try {
            const res = await api.get("/comments");

            // ✅ support paginated & non-paginated responses
            const list = Array.isArray(res.data)
                ? res.data
                : Array.isArray(res.data?.data)
                    ? res.data.data
                    : [];

            setComments(list);
        } catch (err) {
            console.error("Failed to load comments", err);
            setComments([]);
        }
    };


    useEffect(() => {
        loadComments();
    }, []);

    // Prevent background scroll + ESC close
    useEffect(() => {
        if (showForm) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        const handleEsc = (e) => {
            if (e.key === "Escape") setShowForm(false);
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [showForm]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="relative w-full h-[100px] sm:h-[150px] lg:h-[180px]">
                <img
                    src="/images/ResourceHub/library.jpg"
                    alt="Library Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <h1 className="absolute inset-0 flex justify-center items-center
                       text-white text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
                    Feedback & Comments
                </h1>
            </div>
            <div className="max-w-full mx-auto py-8 px-6">

                <div className="max-w-full mb-6 text-gray-700 text-base sm:text-lg leading-relaxed">
                    <p>
                        We value your feedback. Share your thoughts, suggestions, or experiences
                        to help us improve our resources and services. Your comments are visible
                        to the community and help build a better platform for everyone.
                    </p>
                </div>

                {/* Create Button */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg sm:text-3xl font-bold text-green-700 mb-4">
                        Our Comments
                    </h2>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-1 rounded-lg mb-8"
                    >
                        + Create
                    </button>
                </div>


                {/* Comments Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {comments.map((comment) => (
                        <CommentList key={comment.id} comment={comment} />
                    ))}
                </div>
            </div>

            {/* MODAL */}
            {showForm && (
                <div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                    onClick={() => setShowForm(false)} // close on overlay click
                >
                    <div
                        className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6 relative max-h-[95vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                            aria-label="Close modal"
                        >
                            ✕
                        </button>

                        {/* Form */}
                        <CommentForm
                            onSuccess={() => {
                                loadComments();
                                setShowForm(false);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
