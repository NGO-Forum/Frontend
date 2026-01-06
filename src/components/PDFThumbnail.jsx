import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PDFThumbnail({ fileUrl }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const render = async () => {
      try {
        const pdf = await pdfjsLib.getDocument({ url: fileUrl }).promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 1.2 });
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: ctx,
          viewport,
        }).promise;
      } catch (e) {
        console.error("PDF thumbnail error", e);
      }
    };

    render();
  }, [fileUrl]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full lg:h-[350px] h-[200px] md:h-[300px]"
    />
  );
}
