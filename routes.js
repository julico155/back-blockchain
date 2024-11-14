const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;
const abi = [
  "function crearSeguro(uint256 _id, uint256 _duracion) external",
  "function esSeguroActivo(uint256 _id) external view returns (bool)",
  "function renovarSeguro(uint256 _id, uint256 _duracion) external",
  "function cancelarSeguro(uint256 _id) external",
  "function consultarHistorialRenovaciones(uint256 _id) external view returns (uint256[] memory)",
  "function tiempoRestante(uint256 _id) external view returns (uint256)"
];
const seguroMedico = new ethers.Contract(contractAddress, abi, wallet);

router.post('/crearSeguro', async (req, res) => {
  const { id, duracion } = req.body;
  try {
    const tx = await seguroMedico.crearSeguro(id, duracion);
    await tx.wait();
    res.send(`Seguro creado para el ID: ${id}`);
  } catch (error) {
    res.status(500).send(`Error al crear el seguro: ${error.message}`);
  }
});

router.get('/esSeguroActivo/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const activo = await seguroMedico.esSeguroActivo(id);
    res.json({ activo });
  } catch (error) {
    res.status(500).send(`Error al verificar el seguro: ${error.message}`);
  }
});

router.post('/renovarSeguro', async (req, res) => {
  const { id, duracion } = req.body;
  try {
    const tx = await seguroMedico.renovarSeguro(id, duracion);
    await tx.wait();
    res.send(`Seguro renovado para el ID: ${id}`);
  } catch (error) {
    res.status(500).send(`Error al renovar el seguro: ${error.message}`);
  }
});

router.post('/cancelarSeguro', async (req, res) => {
  const { id } = req.body;
  try {
    const tx = await seguroMedico.cancelarSeguro(id);
    await tx.wait();
    res.send(`Seguro cancelado para el ID: ${id}`);
  } catch (error) {
    res.status(500).send(`Error al cancelar el seguro: ${error.message}`);
  }
});

router.get('/consultarHistorialRenovaciones/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const historial = await seguroMedico.consultarHistorialRenovaciones(id);
    res.json({ historial: historial.toString() });
  } catch (error) {
    res.status(500).send(`Error al consultar el historial de renovaciones: ${error.message}`);
  }
});

router.get('/tiempoRestante/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const tiempoRestante = await seguroMedico.tiempoRestante(id);
    res.json({ tiempoRestante: tiempoRestante.toString() }); // Convertir BigInt a string
  } catch (error) {
    res.status(500).send(`Error al consultar el tiempo restante: ${error.message}`);
  }
});


module.exports = router;
