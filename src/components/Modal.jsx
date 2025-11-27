export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-auto">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 h-full w-full max-w-lg sm:max-w-xl lg:max-w-2xl mt-2 relative overflow-auto">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-red-600 font-bold hover:text-red-800 text-xl"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
