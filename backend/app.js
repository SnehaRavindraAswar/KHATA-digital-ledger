const express = require('express');
const cors = require('cors');

const app = express();

const customerRoutes = require('./routes/customer');

/* ===== MIDDLEWARE (ORDER MATTERS) ===== */
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json()); // 🔥 REQUIRED

/* ===== ROUTES ===== */
app.use('/admin', require('./routes/admin'));

app.use('/dashboard', require('./routes/dashboard'));

app.use('/admin/customers', customerRoutes);
app.use('/customer', customerRoutes);


/* ===== TEST ROUTE ===== */
// app.get('/test', (req, res) => {
//   res.send('Backend working');
// });



/* ===== SERVER ===== */
app.listen(8080, () => {
  console.log('Server running on port 8080 🚀');
});
