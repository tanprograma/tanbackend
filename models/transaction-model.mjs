// const {
//   createDocument,
//   readDocuments,
//   jawabu,
// } = require("../pito-apothecary-library");
// const myLibrary = require("../libraries/pms-library.mjs");
import myLibrary from "../libraries/pms-library.mjs";

import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: function () {
      return new Date();
    },
  },

  commodities: [
    {
      commodity: { type: mongoose.Schema.Types.ObjectId, ref: "Commodities" },
      quantity: Number,
    },
  ],
  host: { type: mongoose.Schema.Types.ObjectId, ref: "Stores" },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: "Stores" },
  client: String,
  processed: Boolean,
});

// static methods
// create a debug message..called jawabu
// transactionSchema.statics.jawabu = myLibrary.jawabu;
// transactionSchema.statics.create = myLibrary.createDocument;
// transactionSchema.statics.readAll = myLibrary.readAllDocuments;
// transactionSchema.statics.readAllOfKind = myLibrary.readAllDocumentsOfKind;
// transactionSchema.statics.readOne = myLibrary.readDocument;
// transactionSchema.statics.deleteAll = myLibrary.deleteAllDocuments;
// transactionSchema.statics.deleteAllOfKind = myLibrary.deleteAllDocumentsOfKind;
// transactionSchema.statics.deleteOne = myLibrary.deleteDocument;
// transactionSchema.statics.updateQuantity = myLibrary.updateQuantity;
// transactionSchema.statics.updateUnit = myLibrary.updateUnit;
// ends here
// transactionSchema.statics.dispense = async function (req, Model) {
//   const quantityUpdated = await this.updateQuantitySubtract(req);
//   const refillTransactionCreated = await this.createDispenseTransaction(
//     req,
//     Model
//   );
//   return result;
// };
// transactionSchema.statics.updateQuantitySubtract = async function (req) {
//   let { dispenseQuantity, genericName } = req;

//   // x;
//   // update medicine quantity and expiry date
//   const queryCondition = { "generic-name": genericName };
//   const query = await this.findOne(queryCondition);
//   // update quantity and expiry
//   query.quantity -= parseInt(dispenseQuantity);
//   await query.save();

//   return true;
// };
// transactionSchema.statics.createDispenseTransaction = async function (req, Model) {
//   let {
//     dispenseQuantity,
//     patient,
//     unit,
//     genericName,
//     scientificName,
//     dispenser,
//     strength,
//   } = req;
//   // const {dispenser} = req.user.name
//   const dispenseCondition = {
//     scientificName,
//     genericName,
//     quantity: dispenseQuantity,
//     unit,
//     patient,
//     dispenser,
//     strength,
//   };
//   try {
//     const dispenseRecord = new Model(dispenseCondition);
//     await dispenseRecord.save();
//     return true;
//   } catch (error) {
//     return false;
//   }

//   // return savedDispenseRecord;
// };

// transactionSchema.statics.refill = async function (req, Model) {
//   try {
//     const quantityUpdated = await this.updateQuantityAdd(req);
//     if (!quantityUpdated)
//       return {
//         status: quantityUpdated,
//         error: "could not update quantity",
//         success: null,
//       };
//     const expiryUpdated = await this.updateExpiryDate(req);
//     if (!expiryUpdated)
//       return {
//         status: expiryUpdated,
//         error: "could not update expiry",
//         success: null,
//       };
//     const refillTransactionCreated = await this.createRefillTransaction(
//       req,
//       Model
//     );
//     if (!refillTransactionCreated)
//       return {
//         status: refillTransactionCreated,
//         error: "could not create refill Transaction",
//         success: null,
//       };
//     return {
//       status: refillTransactionCreated,
//       error: null,
//       success: "refill Transaction successful",
//     };
//   } catch (error) {}
// };
// // does the updatting of refill docs
// transactionSchema.statics.createRefillTransaction = async function (req, Model) {
//   let {
//     refillQuantity,
//     supplier,
//     recorder,
//     unit,
//     genericName,
//     scientificName,
//     expiryDate,
//     strength,
//   } = req;
//   const refillCondition = {
//     scientificName,
//     genericName,
//     quantity: refillQuantity,
//     unit,
//     expiry: expiryDate,
//     supplier,
//     recorder,
//     strength,
//   };
//   // create protype
//   try {
//     const refillRecord = new Model(refillCondition);
//     // save prototype
//     await refillRecord.save();

//     return true;
//   } catch (error) {
//     return false;
//   }
// };
// transactionSchema.statics.updateQuantityAdd = async function (req) {
//   const queryCondition = { "generic-name": new RegExp(genericName, "i") };
//   const query = await this.findOne(queryCondition);

//   return true;
// };

// transactionSchema.statics.updateExpiryDate = async function (req) {
//   let { expiryDate } = req;

//   const queryCondition = { "generic-name": genericName };
//   const query = await this.findOne(queryCondition);
//   query.expiry = query.expiry < expiryDate ? expiryDate : query.expiry;
//   await query.save();

//   return true;
// };

const DispensedModel = mongoose.model("Dispensed", transactionSchema);
const ReceivedModel = mongoose.model("Received", transactionSchema);
const IssuedModel = mongoose.model("Issued", transactionSchema);
const RequestedModel = mongoose.model("Requested", transactionSchema);

export default { DispensedModel, ReceivedModel, IssuedModel, RequestedModel };
