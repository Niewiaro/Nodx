import { Order } from "../../../models/order";
import PDFDocument from "pdfkit";
import { join } from "path";

export default defineEventHandler(async (event) => {
  try {
    const orderId = getRouterParam(event, "orderId");

    if (!orderId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Order ID is required",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      throw createError({
        statusCode: 404,
        statusMessage: "Order not found",
      });
    }

    // Utwórz PDF z wsparciem dla polskich znaków
    const pdfDoc = new PDFDocument({
      bufferPages: true,
      autoFirstPage: true,
    });
    const chunks: Buffer[] = [];

    pdfDoc.on("data", (chunk) => chunks.push(chunk));

    const pdfPromise = new Promise<Buffer>((resolve, reject) => {
      pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));
      pdfDoc.on("error", reject);
    });

    // Załaduj czcionkę Roboto obsługującą polskie znaki
    const fontPath = join(
      process.cwd(),
      "server",
      "fonts",
      "Roboto-Regular.ttf"
    );
    pdfDoc.font(fontPath);

    // Wygeneruj treść PDF
    pdfDoc.fontSize(24).text("FAKTURA", { underline: true });
    pdfDoc.text("---------------------------------");

    let totalPrice = 0;
    order.products.forEach((prod: any) => {
      totalPrice += prod.quantity * prod.product.price;
      pdfDoc
        .fontSize(14)
        .text(
          `${prod.product.title}: ${prod.quantity} x ${
            prod.product.price
          } zł = ${(prod.quantity * prod.product.price).toFixed(2)} zł`
        );
    });

    pdfDoc.text("-----");
    pdfDoc.fontSize(20).text(`RAZEM: ${totalPrice.toFixed(2)} zł`);
    pdfDoc.end();

    const pdfBuffer = await pdfPromise;

    // Ustaw nagłówki odpowiedzi
    setHeader(event, "Content-Type", "application/pdf");
    setHeader(
      event,
      "Content-Disposition",
      `inline; filename="invoice-${orderId}.pdf"`
    );

    return pdfBuffer;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "Error generating invoice",
      message: error.message,
    });
  }
});
