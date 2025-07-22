const { Payment, User } = require("../models");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

const createPayment = async (req, res) => {
  try {
    const { amount, transactionId, paymentMethod, transactionLink } = req.body;
    const userId = req.user.id;
    const screenshot = req.file ? `uploads/${req.file.filename}` : null;

    if (!amount || !screenshot || !transactionLink) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const payment = await Payment.create({
      userId,
      amount,
      status: "pending",
      transactionId,
      screenshot,
      paymentMethod,
      transactionLink,
    });

    res.status(201).json({
      message: "Payment created successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error in createPayment",
      error: error.message,
    });
  }
};

const getPayments = async (req, res) => {
  try {
    const user = req.user;
    let payments;

    if (user.role === "admin") {
      // Admins get all payments
      payments = await Payment.findAll({
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name", "email"],
          },
        ],
      });
    } else {
      // Non-admins get only their own payments
      payments = await Payment.findAll({
        where: { userId: user.id },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name", "email"],
          },
        ],
      });
    }

    res.json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({
      message: "Error fetching payments",
      error: error.message || "Internal server error",
    });
  }
};

const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
    });
    res.json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({
      message: "Error fetching payments",
      error: error.message || "Internal server error",
    });
  }
};

const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res
        .status(404)
        .json({ message: "There is no payment held with this ID" });
    }
    await payment.destroy();
    res
      .status(200)
      .json({ message: "Payment deleted successfully from the database" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    payment.status = status;
    await payment.save();

    res.json({ message: "Payment status updated successfully", payment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating payment", error: error.message });
  }
};

module.exports = {
  createPayment,
  getPayments,
  deletePayment,
  updatePayment,
  upload,
  getMyPayments,
};
