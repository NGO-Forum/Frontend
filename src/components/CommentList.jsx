export default function CommentList({ comment }) {
    if (!comment) return null;

    const images = Array.isArray(comment.images) ? comment.images : [];

    function timeAgo(dateString) {
        const date = new Date(dateString);
        const seconds = Math.floor((new Date() - date) / 1000);

        if (seconds < 60) return "Just now";
        if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;

        return date.toLocaleDateString();
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6 flex flex-col gap-4">

            {/* Header */}
            <div className="flex items-start gap-4">

                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
                    {images.length > 0 ? (
                        <img
                            src={`http://localhost:8000/storage/${images[0]}`}
                            className="w-full h-full object-cover"
                            alt="comment avatar"
                        />
                    ) : (
                        <span className="text-green-700 font-semibold uppercase">
                            {comment.name?.charAt(0)}
                        </span>
                    )}
                </div>


                <div>
                    <h3 className="font-semibold text-gray-800 leading-tight">
                        {comment.name}
                    </h3>
                    <p className="text-xs text-gray-500">{comment.email}</p>
                </div>
            </div>

            {/* Comment text */}
            {comment.description && (
                <p className="text-gray-700 text-sm leading-relaxed border-l-4 border-green-500 pl-4 line-clamp-3">
                    {comment.description}
                </p>
            )}

            {/* Footer */}
            <div className="pt-3 border-t text-xs text-gray-400 flex justify-between">
                <span>NGOF Community</span>
                <span>{timeAgo(comment.created_at)}</span>
            </div>
        </div>
    );
}
