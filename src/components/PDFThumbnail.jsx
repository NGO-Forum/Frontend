import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PDFThumbnail({ fileUrl }) {
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let objectUrl = null;

    const renderPdf = async () => {
      try {
        if (!fileUrl) return;

        // Cancel previous render
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        // 🔥 FETCH PDF AS BLOB
        const res = await fetch(fileUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // remove if public
          },
          credentials: "include", // if using cookies
        });

        if (!res.ok) {
          throw new Error(`PDF fetch failed: ${res.status}`);
        }

        const blob = await res.blob();
        objectUrl = URL.createObjectURL(blob);

        const pdf = await pdfjsLib.getDocument(objectUrl).promise;
        if (cancelled) return;

        const page = await pdf.getPage(1);
        if (cancelled) return;

        const viewport = page.getViewport({ scale: 1 });

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderTask = page.render({
          canvasContext: ctx,
          viewport,
        });

        renderTaskRef.current = renderTask;
        await renderTask.promise;

      } catch (err) {
        if (err?.name === "RenderingCancelledException") return;
        console.error("PDF render error:", err);
      }
    };

    renderPdf();

    return () => {
      cancelled = true;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [fileUrl]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[200px] md:h-[300px] lg:h-[350px]"
    />
  );
}
