import { Request, Response } from "express";
import axios from "axios";
import { POSTAL_PIN_CODE_API_URL } from "../utils/constants";

export const checkPinCode = async (req: Request, res: Response) => {
  try {
    const { pinCode } = req.query;

    if (!pinCode) {
      res.status(400).json({ success: false, message: "Pin code is required" });
      return;
    }

    const response = await axios.get(`${POSTAL_PIN_CODE_API_URL}${pinCode}`);
    const data = response.data;

    if (data[0].Status === "Success") {
      res.status(200).json({ success: true, message: "Valid pin code" });
    } else {
      res.status(400).json({ success: false, message: "Invalid pin code" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
