import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PDFThumbnail({ fileUrl }) {
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null); // store active render

  useEffect(() => {
    let cancelled = false;

    const renderPdf = async () => {
      try {
        // Cancel previous render if still running
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        const pdf = await pdfjsLib.getDocument(fileUrl).promise;
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
        if (err?.name === "RenderingCancelledException") return; // ignore
        console.error("PDF render error:", err);
      }
    };

    renderPdf();

    return () => {
      cancelled = true;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [fileUrl]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full lg:h-[350px] h-[200px] md:h-[300px]"
    />
  );
}
