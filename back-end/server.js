const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hola mundo!");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.post("/cardValidation", (req, res) => {
  const { cardNumber, expiryDate, cvv } = req.body;

  // Validar que el número de la tarjeta tiene entre 16 y 19 dígitos
  if (
    cardNumber.replace(/ /g, "").length < 16 ||
    cardNumber.replace(/ /g, "").length > 19
  ) {
    return res.status(400).json({
      message: "El número de la tarjeta debe tener entre 16 y 19 dígitos.",
    });
  }

  // Validar que la fecha de vencimiento es posterior a la fecha actual
  const [month, year] = expiryDate.split("/");
  const expiry = new Date(parseInt(year, 10) + 2000, parseInt(month, 10) - 1);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  if (expiry < now) {
    return res.status(400).json({
      message:
        "La fecha de vencimiento de la tarjeta debe ser posterior a la fecha actual.",
    });
  }

  // Validar que el CVV tiene la longitud correcta
  const isAmex = cardNumber.startsWith("34") || cardNumber.startsWith("37");
  if ((isAmex && cvv.length !== 4) || (!isAmex && cvv.length !== 3)) {
    return res
      .status(400)
      .json({ message: "El CVV de la tarjeta tiene una longitud incorrecta." });
  }

  // Si todas las validaciones pasan, enviar una respuesta de éxito
  res.json({ message: "La tarjeta ha sido validada con éxito." });
});
